var app = (function ($, Backbone, Marionette, _, Handlebars) {
    'use strict';
    // TODO: Put this into a module
    // Use Handlebars templates instead of undescore's
    Marionette.TemplateCache.prototype.compileTemplate  = function (compiledTemplate) {
        return compiledTemplate;
    };
    Marionette.TemplateCache.prototype.loadTemplate     = function (templateId) {
        return Handlebars.templates[templateId];
    };

    // TODO: Put this into a module
    // Override Marionette's Region behavior to enable iOS-like transitions
    Marionette.AnimatedRegion                   = Marionette.Region.extend({
        onShow: function(view) {
            // Keep track of the current view; assumes view name is the same as the template name
            app.vars.currentView = view;
        }
    });
    Marionette.AnimatedRegion.prototype.show    = function (view) {
        this.ensureEl();

        var isViewClosed = view.isClosed || _.isUndefined(view.$el),
            isDifferentView = view !== this.currentView;

        view.render();

        if (isDifferentView || isViewClosed) {
            this.open(view, this.currentView);
        }

        this.currentView = view;

        Marionette.triggerMethod.call(this, 'show', view);
        Marionette.triggerMethod.call(view, 'show');
    };
    Marionette.AnimatedRegion.prototype.open    = function (newView, oldView) {
        // If this is the first screen, just display the content and don't animate
        if (oldView === undefined) {
            this.$el.html(newView.el);
            return;
        }

        // Keep track of the history
        if (app.vars.direction === 'next')
            app.vars.history.push(oldView.template);

        var toScreen = newView.$el, fromScreen = oldView.$el;

        this.$el.append(newView.el);

        // Set the position to the starting point then animate
        var startPos = app.vars.direction === 'next' ? 'back' : 'next';
        toScreen.css('-webkit-transform', 'translate3d(' + app.consts.percent[startPos][0] + '%, 0, 0)');
        fromScreen.css('-webkit-transform', 'translate3d(' + app.consts.percent[startPos][1] + '%, 0, 0)');

        fromScreen.animate(
            {translate3d: app.consts.percent[app.vars.direction][0] + '%, 0, 0'},
            800,
            'cubic-bezier(0, 0, 0.20, 1)',
            $.proxy(function () {
                this.close();
            }, oldView)
        );

        toScreen.css({opacity: 0, 'z-index': app.vars.history.length});
        scrollTo(0, 0);

        toScreen.animate(
            {translate3d: app.consts.percent[app.vars.direction][1] + '%, 0, 0',
                opacity: 1},
            250,
            'cubic-bezier(0, 0, 0.20, 1)'
        );
    };

    var app     = new Marionette.Application();
    app.debug   = false;
    app.vars    = {
        direction:          null,
        category:           null,
        assessment:         null,
        assessmentTitle:    null,
        family:             null,
        productId:          null,
        currentView:        null,
        history:            []
    };
    app.consts  = {
        percent:    {'next': [-100, 0], 'back': [100, 0]},
        replRE:     '\\W+', // RegEx
        replCh:     '-'
    };
    app.scrub   = function(input) {
        var re = new RegExp(app.consts.replRE, 'g');
        return input.toLowerCase().replace(re, app.consts.replCh);
    };

    var MainRegion = Marionette.AnimatedRegion.extend({
        el: '#main'

    });
    app.mainRegion = new MainRegion();
    app.addRegions({
        navRegion:  '#footer',
        headRegion: '#header'
    });

    app.on('error',             function (error) {
        if (app.debug)
            console.error(error);
    });
    app.on('initialize:after',  function () {
        Backbone.history.start();
    });
    app.addInitializer(         function () {
        app.DAL.updateDatabase(function () {
            app.controller = new app.Controller({
                mainRegion: app.mainRegion,
                navRegion:  app.navRegion,
                headRegion: app.headRegion
            });
        });
    });

    app.views       = {
        'montage':          Marionette.ItemView.extend({
            template: 'montage',
            events: {
                'click a': 'onNext'
            },
            onNext: function (e) {
                var target = $(e.currentTarget);

                if (target.hasClass('det-icon')) {
                    app.vars.category = 'detection';
                }
                else if (target.hasClass('pro-icon')) {
                    app.vars.category = 'protection';
                }
                else if (target.hasClass('com-icon')) {
                    app.vars.category = 'communication';
                }
                else if (target.hasClass('val-icon')) {
                    // Not implemented yet
                    return;
                    //app.vars.category = 'validation';
                }

                if (app.vars.category) {
                    app.trigger('click:montage');
                    app.vars.direction = 'next';
                    app.controller.categoryIntro();
                }
                else {
                    app.trigger('error:montage');
                }
            }
        }),
        'cat-intro':        Marionette.ItemView.extend({
            template: 'cat-intro',
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext',
                'click a.link': 'onLink'
            },
            onBack: function () {
                app.controller.goBack();
            },
            onNext: function () {
                app.vars.direction = 'next';
                app.controller.selectAssessment();
            },
            onLink: function(e) {
                var url = $(e.target).data('url');
                window.open(url, '_system', 'location=yes');
            }
        }),
        'select-assess':    Marionette.ItemView.extend({
            template: 'select-assess',
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext'
            },
            onBack: function (e) {
                app.controller.goBack();
            },
            onNext: function (e) {
                app.vars.assessmentTitle = $(e.currentTarget).data('subitem');
                app.vars.assessment = app.scrub(app.vars.assessmentTitle);
                app.vars.direction = 'next';
                app.controller.assessmentIntro();
            }
        }),
        'assess-intro':     Marionette.ItemView.extend({
            template: 'assess-intro',
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext'
            },
            onBack: function () {
                app.controller.goBack();
            },
            onNext: function () {
                app.vars.direction = 'next';
                app.controller.question();
            }
        }),
        'question':         Marionette.ItemView.extend({
            template: 'question',
            events: {
                'click a.back': 'onBack',
                'click a.answer': 'onNext'
            },
            onBack: function () {
                app.controller.goBack();
            },
            onNext: function (e) {
                app.vars.direction = 'next';

                var target = $(e.target);
                var answerId = target.data('answer-id');

                var question = app.assessment.questionAnswered(answerId);

                if (question.answer.type === 'question') {
                    app.controller.question();
                }
                else if (question.answer.type === 'product') {
                    if (question.answer.nodes.length > 1) {
                        app.controller.productList(question.answer.nodes.join());
                    }
                    else {
                        app.vars.productId = question.answer.nodes[0];
                        app.controller.productPage(app.vars.productId);
                    }
                }
            }
        }),
        'model-sel':        Marionette.Layout.extend({
            template: 'model-sel',
            regions: {
                mfrRegion: '#mfrRegion',
                mdlRegion: '#mdlRegion'
            },
            ui: {
                mfr: 'select#manufacturer'
            },
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext',
                'change select#manufacturer': 'onMfrChange'
            },
            onBack: function (e) {
                app.controller.goBack();
            },
            onMfrChange: function () {
                var radios = _.where(this.model.attributes.radios, {
                    mfr: this.ui.mfr[0].selectedOptions[0].value
                });

                if (!_.isEmpty(radios)) {
                    var models = new app.views['models']({
                        collection: new Backbone.Collection(radios)
                    });
                    this.mdlRegion.show(models);
                }
                else {
                    this.mdlRegion.close();
                }
            },
            onNext: function (e) {
                var radio = _.where(this.model.attributes.radios, {
                    mfr: this.ui.mfr[0].selectedOptions[0].value,
                    model: this.mdlRegion.currentView.ui.mdl[0].selectedOptions[0].value
                })[0];

                if (_.isEmpty(radio)) {
                    if (app.vars.debug)
                        console.error('Could not determine input');
                    return;
                }

                app.vars.direction = 'next';

                var question = app.assessment.questionAnswered(radio.answerId);

                if (question.answer.type === 'question') {
                    app.controller.question();
                }
                else if (question.answer.type === 'product') {
                    if (question.answer.nodes.length > 1) {
                        app.controller.productList(question.answer.nodes.join());
                    }
                    else {
                        app.vars.productId = question.answer.nodes[0];
                        app.controller.productPage(app.vars.productId);
                    }
                }
            }
        }),
        'models':           Marionette.ItemView.extend({
            template: 'models',
            ui: {
                mdl: 'select#model'
            }
        }),
        'product-list':     Marionette.CompositeView.extend({
            itemView: Marionette.ItemView.extend({
                template: 'product-item',
                events: {
                    'click a': 'onClick'
                },
                onClick: function(e) {
                    app.vars.productId = $(e.currentTarget).data('id');
                    app.vars.direction = 'next';
                    app.controller.productPage(app.vars.productId);
                }
            }),
            itemViewContainer: '.contents-wrap',
            template: 'product-list',
            events: {
                'click a.back': 'onBack'
            },
            onBack: function () {
                app.assessment.goBack();
                app.controller.goBack();
            }
        }),
        'product-page':     Marionette.ItemView.extend({
            template: 'product-page',
            events: {
                'click a.back': 'onBack',
                'click a.link': 'onLink'
            },
            onBack: function () {
                app.controller.goBack();
            },
            onLink: function (e) {
                var url = $(e.target).data('url');
                window.open(url, '_system', 'location=yes');
            }
        }),
        'browse-families':  Marionette.ItemView.extend({
            template: 'browse-families',
            className: 'general',
            events: {
                'click a.back': 'onBack',
                'click a.family': 'onNext'
            },
            onBack: function () {
                app.controller.goBack();
            },
            onNext: function (e) {
                app.vars.family = $(e.target).data('family');
                app.vars.direction = 'next';
                app.controller.browseProducts(app.vars.family);
            }
        }),
        'browse-products':  Marionette.ItemView.extend({
            template: 'browse-products',
            className: 'general',
            events: {
                'click a.back': 'onBack',
                'click a.browse-next': 'onNext'
            },
            onBack: function () {
                app.controller.goBack();
            },
            onNext: function (e) {
                //app.vars.productId
                var productId = $(e.target).closest('a').data('product');
                app.vars.direction = 'next';
                app.controller.productPage(productId);//app.vars.productId);
            }
        }),
        'navigation':       Marionette.ItemView.extend({
            template:   'navigation',
            id:         'main-nav',
            tagName:    'nav',
            events:     {
                'click a': 'onClick'
            },
            onClick: function(e) {
                if ($(e.target).hasClass('home')) {
                    app.vars.direction = 'back';
                    app.controller.home();
                }
                else if ($(e.target).hasClass('open-browse')) {
                    app.vars.direction = 'next';
                    app.controller.browseFamilies();
                }
            }
        }),
        'header':           Marionette.ItemView.extend({
            template:   'header',
            className:  'header',
            events:     {
                'click a': 'onClick'
            },
            onClick: function() {
                app.vars.currentView.onBack();
            }
        })
    };
    app.Controller  = Marionette.Controller.extend({
        initialize:         function (options) {
            this.mainRegion = options.mainRegion;
            this.headRegion = options.headRegion;
            this.navRegion  = options.navRegion;
        },
        goBack:             function () {
            app.vars.direction = 'back';
            var prevScreen = app.vars.history.pop();
            app.controller.route(prevScreen);
        },
        route:              function (viewName) {
            if (viewName === 'montage') {
                app.controller.home();
            }
            else if (viewName === 'cat-intro') {
                app.controller.categoryIntro();
            }
            else if (viewName === 'select-assess') {
                app.controller.selectAssessment();
            }
            else if (viewName === 'assess-intro') {
                app.controller.assessmentIntro();
            }
            else if (viewName === 'question' || viewName === 'model-sel') {
                // Transfer last answer to questions if the user wants to go to the previous question
                if (app.mainRegion.currentView.template === 'question' ||
                    app.mainRegion.currentView.template === 'model-sel')
                    app.assessment.goBack();
                else
                    app.assessment.questions().pop() || app.assessment.answers().pop();
                app.controller.question();
            }
            else if (viewName === 'product-list') {
                var products = app.assessment.getLastAnswer().answer.nodes.join();
                app.controller.productList(products);
            }
            else if (viewName === 'browse-families') {
                app.controller.browseFamilies();
            }
            else if (viewName === 'browse-products') {
                app.controller.browseProducts(app.vars.family);
            }
            else if (viewName === 'product-page') {
                app.controller.productPage(app.vars.productId);
            }
            else
                console.error('Don\'t know how to route to: ' + viewName);
        },
        showHeaderFooter:   function (headerText) {
            this.headRegion.show(new app.views.header({model: new Backbone.Model({header: headerText})}));
            this.navRegion.show(new app.views.navigation());

            var ver;

            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            }

            if (ver[0] >= 7) {
                var header = $('.header');
                Array.prototype.forEach.call(header, function(el) {
                    el.style.paddingTop="20px";
                });
                var main = $('#main>div');
                Array.prototype.forEach.call(main, function(el) {
                    el.style.paddingTop="20px";
                });
            }
        },
        hideHeaderFooter:   function () {
            this.headRegion.close();
            this.navRegion.close();
        },
        splash:             function() {
            var splashView = new app.views['splash']();
            this.mainRegion.show(splashView);
            this.hideHeaderFooter();
        },
        home:               function () {
            var montageView = new app.views['montage']();
            this.mainRegion.show(montageView);
            this.hideHeaderFooter();
        },
        categoryIntro:      function () {
            var that = this;
            var selector;

            if (app.vars.category === 'detection')
                selector = 'sound-detection';
            else if (app.vars.category === 'protection')
                selector = 'sound-protection';
            else if (app.vars.category === 'communication')
                selector = 'communication';
            else
                return;

            app.ORM.getCategoryModel(selector, function() {
                var view = new app.views['cat-intro']({
                    className: app.vars.category,
                    model: this
                });
                that.mainRegion.show(view);
                that.showHeaderFooter(this.attributes.title);
            });
        },
        selectAssessment:   function () {
            var that = this;

            app.ORM.getAssSelModel(app.vars.category, function () {
                var view = new app.views['select-assess']({
                    className: app.vars.category,
                    model: this
                });
                that.mainRegion.show(view);
                that.showHeaderFooter(this.attributes.assessment);
            });
        },
        assessmentIntro:    function () {
            app.assessment.refresh();

            var that = this;

            app.ORM.getAssIntroModel(app.vars.assessment, function () {
                var view = new app.views['assess-intro']({
                    className: app.vars.category,
                    model: this
                });
                that.mainRegion.show(view);
                that.showHeaderFooter(app.vars.assessmentTitle);
            });
        },
        question:           function () {
            var that = this;
            app.assessment.getNextQuestion(function () {
                var model = new Backbone.Model(this);
                var view;

                if (this.type === 'button')
                    view = new app.views['question']({
                        className: app.vars.category,
                        model: model
                    });
                else if (this.type === 'drop-down')
                    view = new app.views['model-sel']({
                        className: app.vars.category,
                        model: model
                    });

                that.mainRegion.show(view);
                that.showHeaderFooter(app.vars.assessmentTitle);
            });
        },
        productList:        function (products) {
            var that = this;

            app.ORM.getProdListModel(products, function () {
                var view = new app.views['product-list']({
                    className: app.vars.category,
                    collection: this
                });
                that.mainRegion.show(view);
                that.showHeaderFooter('Matching Products');
            });
        },
        productPage:        function (productId) {
            var that = this;

            app.ORM.getProductModel(productId, function () {
                var view = new app.views['product-page']({
                    className: app.vars.category,
                    model: this
                });
                that.mainRegion.show(view);
                var title = _.last(app.vars.history) !== 'browse-products' ? app.vars.assessmentTitle : '';
                that.showHeaderFooter(title);
            });
        },
        browseFamilies:     function () {
            var that = this;

            app.ORM.getBrowseFamilyModels(function() {
                var view = new app.views['browse-families']({
                    model: this
                });
                that.mainRegion.show(view);
                that.showHeaderFooter('Browse');
            });
        },
        browseProducts:     function (family) {
            var that = this;

            app.ORM.getBrowseProductModels(family, function() {
                var view = new app.views['browse-products']({
                    model: this
                });
                that.mainRegion.show(view);
                that.showHeaderFooter('Matching Products');
            });
        }
    });

    return app;
}($, Backbone, Marionette, _, Handlebars));

app.module('assessment',        function (assessment, app) {
    'use strict';
    // Requires DAL.assessment, app
    var questions       = [];
    var answers         = [];
    var getAnswerById   = function (question, id) {
        if (question.answers) {
            for (var i = 0; i < question.answers.length; i++) {
                if (question.answers[i].id === id) {
                    return question.answers[i];
                }
            }
        }
        return null;
    };

    assessment.questions        = function() {
        return questions;
    };
    assessment.answers          = function() {
        return answers;
    };
    assessment.refresh          = function () {
        questions = [];
        answers = [];
    };
    assessment.goBack           = function () {
        if (!_.isEmpty(questions))
            questions.pop();
        //else
            answers.pop();
    };
    assessment.questionAnswered = function (answerId) {
        var question = questions.pop();
        question.answer = getAnswerById(question, answerId);

        answers.push(question);

        return question;
    };
    assessment.getLastAnswer    = function () {
        return answers[answers.length - 1];
    };
    assessment.getNextQuestion  = function (callback) {
        if (!app.vars.assessment)
            return;

        var questionId;

        if (!$.isEmptyObject(answers) && answers.length) {
            // If the answer's next node type isn't a question, then there won't be a next question
            if (assessment.getLastAnswer().answer.type !== 'question')
                return;

            questionId = assessment.getLastAnswer().answer.nodes[0];
        }

        // Get question, determine its type, and get its question responses
        app.DAL.assessment.getQuestion(app.vars.assessment, questionId, function() {
            var question = this;

            if (question.type === 'button') {
                app.DAL.assessment.getAnswers(question.question_id, function() {
                    question.answers = eval("(" + this.answers + ')');
                    questions.push(question);
                    callback.apply(question);
                });
            }
            else if (question.type === 'drop-down') {
                app.DAL.assessment.getRadios(question.question_id, function() {
                    question.answers = this.answers;
                    question.radios = this.radios;
                    question.meta = {
                        mfrs: _.map(_.uniq(_.pluck(this.radios, 'mfr')), function(name) {return {mfr:name};})
                    };
                    questions.push(question);
                    callback.apply(question);
                });
            }
        });
    };
});
app.module('DAL.assessment',    function (assessmentDAL, app) {
    'use strict';
    // Requires DAL
    assessmentDAL.getQuestion   = function(assessmentType, questionId, callback) {
        var sql = 'select question_id, question_text, description, type from questions where assessment = \'' + assessmentType + '\' ';

        if (typeof questionId !== 'undefined')
            sql += 'and question_id = ' + questionId + ' ';

        sql += 'order by question_id limit 0,1';

        app.DAL.getRows(sql, function() {
            callback.apply($.extend({}, this.item(0)));
        });
    };
    assessmentDAL.getAnswers    = function(questionId, callback) {
        var sql = 'select \'[\'||group_concat(answers)||\']\' answers from ' +
            '(select \'{id:\'||a.answer_id||\',text:\'\'\'||a.answer_text||\'\'\',type:\'\'\'||a.node_type||\'\'\',nodes:[\'||group_concat(n.node_id)||\']}\' answers ' +
            'from answers a inner join answer_nodes n on a.answer_id = n.answer_id where a.question_id = ' + questionId + ' group by a.answer_id )';

        app.DAL.getRows(sql, function() {
            callback.apply(this.item(0));
        });
    };
    assessmentDAL.getRadios     = function(questionId, callback) {
        this.getAnswers(questionId, function() {
            var re0 = /text:'\{objects:\[/gi;
            var re1 = /]}]}'/gi;
            var answers = eval("(" + this.answers.replace(re0, 'radios:').replace(re1, ']}') + ')');
            var radios = [];

            for (var i in answers) {
                for (var j in answers[i].radios.models) {
                    radios.push({mfr: answers[i].radios.mfr,
                        model: answers[i].radios.models[j],
                        type: answers[i].type,
                        nodes: answers[i].nodes,
                        answerId: answers[i].id
                    });
                }
            }

            callback.apply({answers: answers, radios: radios});
        });
    };
});
app.module('ORM',               function (ORM, app) {
    'use strict';
    // Requires DAL
    var getValueModel           = function (sql, callback) {
        app.DAL.getRows(sql, function(){
            var model = new Backbone.Model(
                eval("(" + this.item(0).value + ')')
            );
            callback.apply(model);
        });
    };
    ORM.getCategoryModel        = function (category, callback) {
        var sql = 'select value from content where screen=\'cat-intro\' and key=\'' + category + '\'';
        getValueModel(sql, callback);
    };
    ORM.getAssSelModel          = function (category, callback) {
        var sql = 'select value from content where screen=\'select-assess\' and category=\'' + category + '\'';
        getValueModel(sql, callback);
    };
    ORM.getAssIntroModel        = function (assessment, callback) {
        var sql = 'select value from content where screen=\'assess-intro\' and key=\'' + assessment + '\'';
        getValueModel(sql, callback);
    };
    ORM.getProdListModel        = function (productList, callback) {
        var sql = 'select product_id, name, image from products where product_id in (' + productList + ')';
        app.DAL.getRows(sql, function(){
            var products = new Backbone.Collection();

            for (var i = 0; i < this.length; i++) {
                var product = {
                    id: this.item(i).product_id,
                    name: this.item(i).name,
                    image: this.item(i).image
                };
                products.add(product);
            }

            callback.apply(products);
        });
    };
    ORM.getProductModel         = function (productId, callback) {
        var sql = 'select name, model, subhead, description, image, link from products where product_id=\'' + productId + '\'';

        app.DAL.getRows(sql, function(){
            var product = {
                name: this.item(0).name,
                model: this.item(0).model,
                subhead: this.item(0).subhead,
                description: this.item(0).description,
                image: this.item(0).image,
                link: this.item(0).link
            };

            callback.apply(new Backbone.Model(product));
        });
    };
    ORM.getBrowseFamilyModels   = function (callback) {
        var sql = 'select  category, group_concat(distinct family) as families from products as c group by c.category;';
        app.DAL.getRows(sql, function () {
            var categories = [];

            for (var i = 0; i < this.length; i++) {
                if (this.item(i).families === null)
                    continue;

                var families = this.item(i).families.split(',');
                var newFamilies = [];

                for (var j in families) {
                    newFamilies.push({name: families[j]});
                }

                var category = {
                    name: this.item(i).category,
                    families: newFamilies
                };

                categories.push(category);
            }

            callback.apply(new Backbone.Model({categories: categories}));
        });
    };
    ORM.getBrowseProductModels  = function (family, callback) {
        var sql = 'select product_id, name, image from products where family=\'' + family + '\'';

        app.DAL.getRows(sql, function () {
            var products = [];

            for (var i = 0; i < this.length; i++) {
                var product = {
                    id: this.item(i).product_id,
                    name: this.item(i).name,
                    image: this.item(i).image
                };
                products.push(product);
            }

            callback.apply(new Backbone.Model({products: products}));
        });
    };
});
app.module('DAL',               function (DAL) {
    'use strict';
    // TODO: Add initializer

    var db,
        dbName = 'products',
        dbSize = 2000000,
        latestDbVersion = '1';

    DAL.open            = function (name, size) {
        if (!db) {
            dbName = name || dbName;
            dbSize = size || dbSize;
            db = window.openDatabase(dbName, '', dbName, dbSize);
        }
    };
    DAL.getRows         = function (sql, callback) {
        if (!db)
            DAL.open();

        db.transaction(
            function (tx) {
                tx.executeSql(
                    sql,
                    [],
                    function (tx, data) {
                        callback.apply(data.rows);
                    },
                    function(err) {
                        //TODO: raise error
                        if (app.debug)
                            console.error('error: ' + err.message);
                    }
                );
            },
            function(err) {
                // TODO: raise error
                if (app.debug)
                    console.error('tx error: ' + err.message);
            }
        );
    };
    DAL.updateDatabase  = function (callback) {
        // Requires sql.js
        if (!db)
            DAL.open();

        switch (db.version) {
            case '':
                db.changeVersion('', '1');
                if (!sql.v1) {
                    // TODO: Throw error
                    console.error('Cannot find sql script');
                    return;
                }

                var sqlUpdate = sql.v1;
                var lines = sqlUpdate.split('|');

                db.transaction(
                    function (tx) {
                        for (var idx in lines) {
                            tx.executeSql(lines[idx]);
                        }
                        callback.apply();
                    },
                    function (err) {
                        // TODO: raise error
                        if (app.debug)
                            console.error(err.message);
                    }
                );

                break;
            case latestDbVersion:
                callback.apply();
                break;
            default:
                if (app.debug)
                    console.error('No case for db version: ' + db.version);
                callback.apply();
                break;
        }
    };
});

$(document).ready(function(){
    'use strict';
    app.start();

    var splash = $('#splash');

    splash[0].addEventListener('webkitAnimationEnd', function () {
        splash.remove();
        app.controller.home();
    }, false);
});