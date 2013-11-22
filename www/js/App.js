var app = (function ($, Backbone, Marionette, _, Handlebars) {
    'use strict';
    // TODO: Put this into a module
    // Use Handlebars templates instead of undescore's
    Marionette.TemplateCache.prototype.compileTemplate = function (compiledTemplate) {
        return compiledTemplate;
    };
    Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
        return Handlebars.templates[templateId];
    };

    // TODO: Put this into a module
    // Override Marionette's Region behavior to enable iOS-like transitions
    Marionette.AnimatedRegion = Marionette.Region.extend({
        onShow: function(view) {
            // Keep track of the current view; assumes view name is the same as the template name
            app.vars.currentView = view;
        }
    });
    Marionette.AnimatedRegion.prototype.show = function (view) {
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
    Marionette.AnimatedRegion.prototype.open = function (newView, oldView) {
        // If this is the first screen, just display the content and don't animate
        if (oldView === undefined) {
            if (app.debug)
                console.log('Initial');
            this.$el.html(newView.el);
            return;
        }

        if (app.debug)
            console.log('Direction: ' + app.vars.direction);

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

        // Wait until all the images have loaded
        var imgLoad = imagesLoaded(toScreen);
        imgLoad.on('always',function(){
            toScreen.animate(
                {translate3d: app.consts.percent[app.vars.direction][1] + '%, 0, 0',
                opacity: 1},
                400,
                'cubic-bezier(0, 0, 0.20, 1)'
            );
        });
    };

    var app     = new Marionette.Application();
    app.debug   = true;
    app.vars    = {
        direction:  null,
        category:   null,
        assessment: null,
        currentView:null,
        history:    []
    };
    app.consts  = {
        percent:    {'next': [-100, 0], 'back': [100, 0]}
    };

    var MainRegion = Marionette.AnimatedRegion.extend({
        el: '#main'

    });
    app.mainRegion = new MainRegion();
    app.addRegions({
        navRegion:  '#footer',
        headRegion: '#header'
    });

    app.on('error', function (error) {
        if (app.debug)
            console.error(error);
    });
    app.on('initialize:after', function () {
        Backbone.history.start();
        app.DAL.open('products', 2000000);
    });
    app.addInitializer(function () {
        app.controller = new app.Controller({
            mainRegion: app.mainRegion,
            navRegion: app.navRegion,
            headRegion: app.headRegion
        });

        app.controller.home();
    });

    app.views = {
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
                    app.trigger('error:communication');
                    return;
                }

                if (app.vars.category) {
                    app.trigger('click:montage');
                    app.vars.direction = 'next';
                    app.vars.history.push('montage');
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
            onBack: function (e) {
                app.vars.history.pop();
                app.vars.direction = 'back';
                app.controller.home();
            },
            onNext: function (e) {
                app.vars.direction = 'next';
                app.vars.history.push('cat-intro');
                app.controller.selectAssessment();
            }
        }),
        'select-assess':    Marionette.ItemView.extend({
            template: 'select-assess',
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext'
            },
            onBack: function (e) {
                app.vars.history.pop();
                app.vars.direction = 'back';
                app.controller.categoryIntro();
            },
            onNext: function (e) {
                var target = $(e.currentTarget);
                app.vars.assessment = target.data('subitem').toLowerCase().replace(' ', '-');
                app.vars.direction = 'next';
                app.vars.history.push('select-assess');
                app.controller.assessmentIntro();
            }
        }),
        'assess-intro':     Marionette.ItemView.extend({
            template: 'assess-intro',
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext'
            },
            onBack: function (e) {
                app.vars.history.pop();
                app.vars.direction = 'back';
                app.controller.selectAssessment();
            },
            onNext: function (e) {
                app.vars.direction = 'next';
                app.vars.history.push('assess-intro');
                app.controller.question();
            }
        }),
        'question':         Marionette.ItemView.extend({
            template: 'question',
            events: {
                'click a.back': 'onBack',
                'click a.answer': 'onNext'
            },
            onBack: function (e) {
                var prevScreen = app.vars.history.pop();
                app.vars.direction = 'back';
                if (prevScreen === 'question') {
                    app.assessment.goBack();
                    app.controller.question();
                }
                else if (prevScreen === 'assess-intro')
                    app.controller.assessmentIntro();
                else
                    console.error('Don\'t know how to route to: ' + prevScreen);
            },
            onNext: function (e) {
                app.vars.direction = 'next';
                app.vars.history.push('question');
                if (app.debug)
                    console.log('Next button pressed');

                var target = $(e.currentTarget);
                var answerId = target.data('answer-id');

                var question = app.assessment.questionAnswered(answerId);

                if (question.answer.type === 'question') {
                    app.controller.question();
                }
                else if (question.answer.type === 'product') {
                    if (question.answer.nodes.length > 1) {
                        if (app.debug)
                            console.log('product-list');
                        app.controller.productList(question.answer.nodes.join());
                    }
                    else {
                        if (app.debug)
                            console.log('product-page');
                        app.controller.productPage(question.answer.nodes[0]);
                    }
                }
            }
        }),
        'product-list':     Marionette.CompositeView.extend({
            itemView: Marionette.ItemView.extend({
                template: 'product-item',
                events: {
                    'click a': 'onClick'
                },
                onClick: function(e) {
                    var target = $(e.currentTarget);
                    var productId = target.data('id');
                    app.vars.direction = 'next';
                    app.vars.history.push('product-list');
                    app.controller.productPage(productId);
                }
            }),
            itemViewContainer: '.contents-wrap',
            template: 'product-list',
            events: {
                'click a.back': 'onBack'
            },
            onBack: function (e) {
                app.vars.history.pop();
                app.vars.direction = 'back';
                app.assessment.goBack();
                app.controller.question();
            }
        }),
        'product-page':     Marionette.ItemView.extend({
            template: 'product-page',
            events: {
                'click a.back': 'onBack',
                'click a.link': 'onLink'
            },
            onBack: function (e) {
                var prevScreen = app.vars.history.pop();
                app.vars.direction = 'back';

                if (prevScreen === 'product-list') {
                    var products = app.assessment.getLastAnswer().answer.nodes.join();
                    app.controller.productList(products);
                }
                else if (prevScreen === 'question') {
                    app.assessment.goBack();
                    app.controller.question();
                }
                else
                    console.error('Don\'t know how to route to: ' + prevScreen);
            },
            onLink: function (e) {
                app.vars.history.push('product-page');
            }
        }),
        'browse-families': Marionette.ItemView.extend({
            template: 'families',
            events: {
                'click a.back': 'onBack',
                'click a.next': 'onNext'
            },
            onBack: function (e) {
                app.vars.history.pop();
                app.vars.direction = 'back';
                app.controller.home();
            },
            onNext: function (e) {
                app.vars.direction = 'next';
                app.vars.history.push('browse-families');
                app.controller.browseFamilies();
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
                else if ($(e.target).hasClass('open-browse'))
                    console.log('Open Browse');
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
    app.Controller = Marionette.Controller.extend({
        initialize:         function (options) {
            this.mainRegion = options.mainRegion;
            this.headRegion = options.headRegion;
            this.navRegion  = options.navRegion;
        },
        showHeaderFooter:   function (headerText) {
            this.headRegion.show(new app.views.header({model: new Backbone.Model({header: headerText})}));
            this.navRegion.show(new app.views.navigation());
        },
        hideHeaderFooter:   function () {
            this.headRegion.close();
            this.navRegion.close();
        },
        home:               function () {
            var montageView = new app.views['montage']();
            this.mainRegion.show(montageView);
            this.hideHeaderFooter();
        },
        categoryIntro:      function () {
            var that = this;
            var selector = app.vars.category === 'detection' ? 'sound-detection' : 'sound-protection';

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
                that.showHeaderFooter(this.attributes.title);
            });
        },
        question:           function () {
            var that = this;
            app.assessment.getNextQuestion(function () {
                var model = new Backbone.Model(this);
                var view = new app.views['question']({
                    className: app.vars.category,
                    model: model
                });
                that.mainRegion.show(view);
                that.showHeaderFooter();
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
                that.showHeaderFooter(this.attributes.model);
            });
        }
    });

    return app;
}($, Backbone, Marionette, _, Handlebars));

app.module('assessment', function (assessment, app) {
    'use strict';
    // Requires DAL.assessment, app
    var questions = [];
    var answers = [];

    var getAnswerById = function (question, id) {
        if (question.answers) {
            for (var i = 0; i < question.answers.length; i++) {
                if (question.answers[i].id === id) {
                    return question.answers[i];
                }
            }
        }
        return null;
    };

    // TODO: Remove these
    assessment.answers = answers;
    assessment.questions = questions;

    assessment.refresh = function () {
        questions = [];
        answers = [];
    };

    assessment.goBack = function () {
        questions.pop();
        answers.pop();
    };

    assessment.questionAnswered = function (answerId) {
        if (app.debug)
            console.log('answer_id:' + answerId);

        var question = questions.pop();
        question.answer = getAnswerById(question, answerId);

        answers.push(question);

        return question;
    };

    assessment.getLastAnswer = function () {
        return answers[answers.length - 1];
    };

    assessment.getNextQuestion = function (callback) {
        if (!app.vars.assessment)
            return;
        
        var questionId;

        if (!$.isEmptyObject(answers) && answers.length) {
            // If the answer's next node type isn't a question, then there won't be a next question
            if (assessment.getLastAnswer().answer.type !== 'question')
                return;

            questionId = assessment.getLastAnswer().answer.nodes[0];
        }

        app.DAL.assessment.getQuestion(app.vars.assessment, questionId, function() {
            questions.push(this);
            callback.apply(this);
        });
    };
});

app.module('DAL.assessment', function(assessmentDAL, app) {
    'use strict';
    // Requires DAL
    assessmentDAL.getQuestion = function(assessmentType, questionId, callback) {
        var sql = 'select q.question_id, q.question_text, q.description, \'[\'||group_concat(a.answers)||\']\' answers ' +
            'from questions q inner join ' +
            '(select a.question_id, \'{id:\'||a.answer_id||\',text:\'\'\'||a.answer_text||\'\'\',type:\'\'\'||a.node_type||\'\'\',nodes:[\'||group_concat(n.node_id)||\']}\' answers ' +
            'from answers a inner join answer_nodes n on a.answer_id=n.answer_id where a.question_id = question_id ' +
            'group by a.answer_id) a on q.question_id=a.question_id where q.assessment = \'' + assessmentType + '\' ';

        if (typeof questionId !== 'undefined')
            sql += 'and q.question_id = ' + questionId + ' ';

        sql += 'group by q.question_id order by q.question_id limit 0,1';

        app.DAL.getRows(sql, function() {
            var question = $.extend({}, this.item(0));

            // The question's answers are a JSON string that needs to be an object
            question.answers = eval("(" + question.answers + ')');

            callback.apply(question);
        });
    };
});

app.module('ORM', function(ORM, app) {
    'use strict';
    // Requires DAL
    var getValueModel = function (sql, callback) {
        app.DAL.getRows(sql, function(){
            var model = new Backbone.Model(
                eval("(" + this.item(0).value + ')')
            );
            callback.apply(model);
        });
    };

    ORM.getCategoryModel = function(category, callback) {
        var sql = 'select value from content where screen=\'cat-intro\' and key=\'' + category + '\'';
        getValueModel(sql, callback);
    };

    ORM.getAssSelModel = function(category, callback) {
        var sql = 'select value from content where screen=\'select-assess\' and category=\'' + category + '\'';
        getValueModel(sql, callback);
    };

    ORM.getAssIntroModel = function(assessment, callback) {
        var sql = 'select value from content where screen=\'assess-intro\' and key=\'' + assessment + '\'';
        getValueModel(sql, callback);
    };

    ORM.getProdListModel = function(productList, callback) {
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

    ORM.getProductModel = function(productId, callback) {
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

});

app.module('DAL', function (DAL) {
    'use strict';
    var db, results;
    var dbName = 'products', dbSize = 2000000; // Default values

    // TODO: Add initializer and remove dependence on app

    DAL.open = function (name, size) {
        if (!db) {
            dbName = name || dbName;
            dbSize = size || dbSize;
            db = window.openDatabase(dbName, '', dbName, dbSize);
        }
    };

    DAL.getRows = function (sql, callback) {
        if (!db)
            DAL.open();

        db.transaction(
            function (tx) {
                tx.executeSql(
                    sql,
                    [],
                    function (tx, data) {
                        if (app.debug) {
                            console.log('Data:');
                            console.log(data.rows.item(0));
                        }
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
    }

    DAL.updateDatabase = function (callback) {
        // Requires sql.js
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
            default:
                if (app.debug)
                    console.error('No case for db version: ' + app.dal.db.version);
                callback.apply();
                break;
        }
    };
});

$(document).ready(function(){
    'use strict';
    app.start();
});