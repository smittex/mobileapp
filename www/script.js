var app = {
    events: {
        onDeviceReady: function () {
            // Stub for when DOM is loaded
        },
        onOnline: function () {
            // Stub for when device comes online
        },
        onOffline: function () {
            // Stub for when device goes offline
        }
    },
    dal: {
        open: function () {
            if (!app.dal.db)
                app.dal.db = window.openDatabase(
                    'products.db',
                    '1.0',
                    'products',
                    1000000
                );
        },
        error: function (err) {
            console.log(err.message);
            return null;
        },
        getRows: function (sql, id) {
            console.log('in getRows');
            app.dal.db.transaction(
                function (tx) {
                    tx.executeSql(
                        sql,
                        [],
                        function (tx, results) {
                            console.log('got results');
                            try {
                                app.dal.results = results.rows;
                                $(document.body).trigger(id, results.rows);
                            } catch(err){
                                console.log(err.message);
                            }
                        },
                        app.dal.error
                    );
                },
                app.dal.error
            );
        },
        checkVersion: function() {
            var sql = 'select value from version';

            $(document).one('get:content', function (event) {
                var version = event.data.item(0).value;
                console.log('version: '+version);

                if (version < app.db_version) {
                    var element = document.createElement('script');
                    element.type='text/javascript';
                    element.src='db.js';
                    document.getElementsByTagName('head')[0].appendChild(element);
                }
            });
            console.log('sql:'+sql);
            app.dal.getRows(sql, 'get:content');
        },
        updateDatabase: function() {

        }
    },
    db_version: 0.2,
    history: [],
    templates: [],
    screens: [
        'montage',
        'cat-intro',
        'select-assess',
        'assess-intro',
        'question-container',
        'product-page'
    ],
    assessment: {
        questions: [],
        answers: [],
        getQuestionById: function (id) {
            for (var i = 0; i < app.assessment.questions.length; i++) {
                if (app.assessment.questions[i].question_id == id)
                    return app.assessment.questions[i];
            }
            return null;
        },
        getAnswerById: function (question, id) {
            for (var i = 0; i < question.answers.length; i++) {
                if (question.answers[i].id == id)
                    return question.answers[i];
            }
            return null;
        },
        question_answered: function () {
            // Determine answer and route user to next screen {question, product}
            var question_id = $(this).data('question-id');
            var answer_id = $(this).data('answer-id');

            console.log('question_id:' + question_id);
            console.log('answer_id:' + answer_id);
            try {
                var question = app.assessment.questions.pop();
                if (question != null) {
                    question.answer = app.assessment.getAnswerById(question, answer_id);
                }
            } catch (err) {
                console.log(err.message);
            }

            console.log(question);
            app.assessment.answers.push(question);

            if (question.answer.node_type == 'question') {
                app.rndrCont('question-container', null);
            }
            else if (question.answer.node_type == 'product') {
                console.log('go to product');
                app.rndrCont('product-page', question.answer.node_id);
            }
        },
        getQuestion: function () {
            if (app.assessment.answers.length) {
                if (app.assessment.answers[app.assessment.answers.length - 1].answer.node_type != 'question') {
                    return null;
                }
            }
            if (!app.assessment.assessment) {
                return null;
            }

            var sql = 'select q.question_id, q.question_text, q.description, group_concat(a.answer_id) answer_ids, ' +
                'group_concat(a.answer_text) answer_texts, group_concat(a.node_type) node_types, group_concat(n.node_id) node_ids ' +
                'from questions q ' +
                'inner join answers a on q.question_id=a.question_id ' +
                'inner join answer_nodes n on a.answer_id=n.answer_id ' +
                'where q.assessment = \'' + app.assessment.assessment + '\' ';

            if (app.assessment.answers.length) {
                // Get the question_id of the previous answer
                var question_id = app.assessment.answers[app.assessment.answers.length - 1].answer.node_id;
                sql += 'and q.question_id = ' + question_id + ' ';
            }
            sql += 'group by q.question_id order by q.question_id, a.answer_id limit 0,1';

            $(document).one('get:content', function (event) {
                try {
                    var tmp = event.data.item(0);

                    console.log('results:');
                    console.log(tmp);

                    var question = {
                        question_id: tmp.question_id,
                        title: tmp.title,
                        question: tmp.question_text,
                        description: tmp.description,
                        answers: []
                    };

                    var ans_ids = tmp.answer_ids.split(',');
                    var texts = tmp.answer_texts.split(',');
                    var node_types = tmp.node_types.split(',');
                    var node_ids_tmp = tmp.node_ids;
                    var node_ids = node_ids_tmp ? node_ids_tmp.split(',') : null;

                    console.log('ids:' + ans_ids);
                    console.log('texts:' + texts);
                    console.log('node_types:' + node_types);
                    console.log('node_ids:' + node_ids);

                    for (var j = 0; j < ans_ids.length; j++) {
                        console.log('j:' + j);

                        var ans = {
                            id: ans_ids[j],
                            text: texts[j],
                            node_type: node_types[j],
                            // Make sure node_ids AND node_ids[j] are not null before assignment
                            node_id: node_ids ? node_ids[j] ? node_ids[j] : 0 : 0 // TODO: need to handle node 0?
                        };

                        console.log('answer ' + j);
                        console.log(ans);
                        question.answers.push(ans);
                    }
                    console.log('question:');
                    console.log(question);
                    app.assessment.questions.push(question);

                    $(document.body).trigger('question:ready', question);
                }
                catch (err) {
                    console.log(err.message);
                }
            });

            console.log('sql:' + sql);
            app.dal.getRows(sql, 'get:content');
        }
    },
    initialize: function () {
        if (!app.dal.db)
            app.dal.open();

        this.home();

        document.addEventListener('deviceready', this.events.onDeviceReady, false);
        document.addEventListener('online', this.events.onOnline, false);
        document.addEventListener('offline', this.events.onOffline, false);
    },
    home: function () {
        app.history = [];
        app.questions = [];
        app.answers = [];
        $('.screen').removeClass('current').hide();
        $('.montage').addClass('current').css('left', '0%').show();
        $('nav.main-nav').hide();
        $('a.next,.back').one('click', app.onNav);
    },
    browse: function () {
        $('.screen').removeClass('current').hide();
        $('.browse').addClass('current').show();

        console.log($(this));

        $(this).parent('li').toggleClass('active-nav');

        // Determine if Browse is being switched on or off
        var active = $(this).closest('li').hasClass('active-nav');
        console.log('active:' + active);

        if (active) {
            $(document).one('get:content', function (event) {
                var ctx = {
                    products: []
                };

                for (var i = 0; i < event.data.length; i++) {
                    var product = {
                        id: event.data.item(i).product_id,
                        name: event.data.item(i).name
                    };
                    ctx.products.push(product);
                }

                console.log('ctx:');
                console.log(ctx);

                var tmpl = Handlebars.compile($('#product-list-tmpl').html());
                console.log('tmpl:');
                console.log(tmpl);

                var html = tmpl(ctx);
                console.log('html:');
                console.log(html);

                $('div.product-list').html(html).show();
                $('a.open-product').one('click',app.openProduct);
            });

            var sql = 'select product_id, name from products where category=\''+app.category+'\'';

            console.log('sql:' + sql);
            app.dal.getRows(sql, 'get:content');
        }
        else {
            app.home();
        }


        //var underSlide = $('.browse').siblings('.current');

        //$('.browse .not-montage').hide();

        //$('.browse').toggle();
        //$('.browse .browse-active').toggle();
        //$(underSlide).toggle();
    },
    openProduct: function() {
        var id = $(this).data('id');
        console.log('id:'+id);

        app.rndrCont('product-page', id);
        app.moveScr($('.browse'), $('.screen[data-screen=product-page]'), 'next');
    },
    onNav: function () {
        // Determine Category
        if ($(this).hasClass('det-icon'))
            app.category = 'detection';
        else if ($(this).hasClass('pro-icon'))
            app.category = 'protection';

        // Determine direction of navigation
        var dir, inc;
        if ($(this).hasClass('next')) {
            dir = 'next';
            inc = 1;
        }
        else if ($(this).hasClass('back')) {
            dir = 'back';
            inc = -1;
        }
        else
            return;

        // Determine screen to navigate to
        var curScr = $(this).parents('.screen');
        var curScrNm = curScr.data('screen');

        var nxtScrNm = app.screens[app.screens.indexOf(curScrNm) + inc];
        var nxtScr = $('[data-screen=' + nxtScrNm + ']');

        if (nxtScrNm == 'montage') {
            app.home();
            return;
        }

        // Get contextual information on the navigation
        var obj = $(this).data('subitem');
        if (!obj)
            obj = '';
        else
            obj = obj.toLowerCase().replace(' ', '-');

        // Keep track of the navigation history
        if (dir == 'next') {
            var toPush = curScrNm;
            if (obj != '')
                toPush += ':' + obj;
            app.history.push(toPush);

            // Keep track of the assessment they're using
            if (curScrNm == 'select-assess')
                app.assessment.assessment = obj;
        }
        else
            app.history.pop();

        // Add the correct class
        // TODO: This does not work on the product page because it's not routed through here
        nxtScr.removeClass('protection').removeClass('detection').addClass(app.category);

        // Prepare content and perform transitions
        app.rndrCont(nxtScrNm, obj);
        app.moveScr(curScr, nxtScr, dir);
    },
    rndrCont: function (scr, obj) {
        console.log('in rndrCont;scr:' + scr + ';obj:' + obj);

        switch (scr) {
            case 'question-container':

                $(document).one('question:ready', function (event) {
                    var question = event.data;

                    var tmpl = Handlebars.compile($('#question-tmpl').html());

                    console.log('in question container');
                    console.log(question);
                    var qtn_html = tmpl(question);
                    console.log(qtn_html);

                    if (!question)
                        console.log('Error in getting question');

                    $('[data-screen=question-container]').html(qtn_html);
                    $('a.back').one('click', app.onNav);
                    $('a.answer').one('click', app.assessment.question_answered);
                });
                app.assessment.getQuestion();
                break;

            case 'product-page':
                var sql = 'select name, model, subhead, description, image, link from products where product_id=\'' + obj + '\'';

                $(document).one('get:content', function (event) {
                    console.log('creating product');
                    try {
                        var product = {
                            name: event.data.item(0).name,
                            model: event.data.item(0).model,
                            subhead: event.data.item(0).subhead,
                            description: event.data.item(0).description,
                            image: event.data.item(0).image,
                            link: event.data.item(0).link
                        };
                        console.log('bout to compile template');
                        var tmpl = Handlebars.compile($('#product-page-tmpl').html());
                        // Possible security vulnerability here if someone has write access to DB
                        console.log('bout to render html');

                        var html = tmpl(product);
                        $('[data-screen=product-page]').html(html);
                        $('a.next,.back').one('click', app.onNav);

                        app.moveScr($('[data-screen=question-container]'), $('[data-screen=product-page]'), 'next');
                    } catch (err) {
                        console.log(err.message);
                    }
                });

                console.log('sql:' + sql);
                app.dal.getRows(sql, 'get:content');

                break;
            default:
                var content = {
                    'cat-intro': 'select value from content where screen=\'cat-intro\' and key=\'sound-detection\'',
                    'select-assess': 'select value from content where screen=\'select-assess\'',
                    'assess-intro': 'select value from content where screen=\'assess-intro\' and key=\'' + obj + '\''
                };

                try {
                    $(document).one('get:content', function (event) {
                        // TODO: figure out a way to cache the templates or precompile them
                        var tmpl = Handlebars.compile($('#' + scr + '-tmpl').html());
                        // Possible security vulnerability here if someone has write access to DB
                        var html = tmpl(eval("(" + event.data.item(0).value + ')'));
                        $('[data-screen=' + scr + ']').html(html);
                        $('a.next,.back').one('click', app.onNav);
                    });
                } catch (err) {
                    console.log(err.message);
                }
                console.log('sql:' + content[scr]);
                app.dal.getRows(content[scr], 'get:content');

                break;
        }
    },
    moveScr: function (from, to, direction) {
        var percent = {'next': [-10, 0], 'back': [100, 0]};

        to.show();
        to.addClass('current');
        from.removeClass('current');

        from.animate(
            {left: percent[direction][0] + '%'},
            250,
            'cubic-bezier(0, 0, 0.20, 1)',
            function () {
                from.hide();
            }
        );

        to.animate(
            {left: percent[direction][1] + '%'},
            250,
            'cubic-bezier(0, 0, 0.20, 1)',
            function () {
                to.show();
            }
        );

        $('a.next,.back').one('click', app.onNav);

        if (to.data('screen') != 'montage')
            $('nav.main-nav').show();
        else
            $('nav.main-nav').hide();
    }
};

app.initialize();

$(function () {
    /*	$('a.det-icon, a.pro-icon, a.com-icon').click(function(){
     $('nav.main-nav').show();
     });

     $('a.main-page').click(function(){
     $('nav.main-nav').hide();
     });*/

    //Open Browse functionality
    $('a.open-browse').click(app.browse);

    //Browse next functionality
    $('a.browse-next').click(function () {
        var oldSlide = $(this).parents('.pane');
        var newSlide = $(oldSlide).next('.pane');

        $(newSlide).show();
        $(newSlide).addClass('browse-active');
        $(oldSlide).removeClass('browse-active');
        $(oldSlide).animate({
            left: '-100%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)', function () {
            $(oldSlide).hide();
        });
        $(newSlide).animate({
            left: '0%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)');
    });

    //Browse back functionality
    $('a.back-pane').click(function () {
        var oldSlide = $(this).parents('.pane');
        var newSlide = $(oldSlide).prev('.pane');

        $(newSlide).show();
        $(newSlide).addClass('browse-active');
        $(oldSlide).removeClass('browse-active');
        $(newSlide).animate({
            left: '0%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)');

        $(oldSlide).animate({
            left: '100%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)', function () {
            $(oldSlide).hide();
        });
    });

    //Open product page
    $('a.open-product').click(function () {
        var parentSection = $(this).parents('.screen');
        var productSection = $(parentSection).siblings('.product-page');
        var otherSlides = $(productSection).siblings('.detection');

        $(productSection).show();
        $(productSection).addClass('current');
        $(otherSlides).removeClass('current');
        $(otherSlides).hide();
        $(productSection).css({left: 0});
        $(parentSection).hide();
        $('.pane').hide();
        $('li.active-nav').removeClass('active-nav');
    });

    //Back up to Select Assessment Page

    $('a.open-assessments').click(function () {
        $('.select-assess').css({left: 0});
        //$('.after-assess').css({left:'100%'});
        //$('.after-assess').removeClass('current');
        $('.cat-intro').css({left: '-10%'});
        $('.select-assess').show();
        $('.cat-intro').hide();
        //$('.after-assess').hide();
        $('cat-intro').removeClass('current');
        $('.select-assess').addClass('current');
        $('.browse').hide();
        $('li.active-nav').removeClass('active-nav');
    });
});
