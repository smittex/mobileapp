var app = {
	events: {
		onDeviceReady: function() {

        },
		onOnline: function() {
			// Stub for when device comes online
		},
		onOffline: function() {
			// Stub for when device goes offline
		}
	},
	dal: {
		open: function() {
			app.dal.db = window.openDatabase(
				'products.db',
				'1.0',
				'products',
				1000000
			);
		},
		error: function(err) {
			console.log(err.message);
			return null;
		},
		getRows: function(sql, id){
			app.dal.db.transaction(
				function(tx){
					tx.executeSql(
						sql,
						[],
						function(tx, results) {
							app.dal.results = results.rows;
							$(document.body).trigger(id, results.rows);
						},
						app.dal.error
					);
				},
				app.dal.error
			);
		}
	},
	screens: [
		'montage',
		'category-intro',
		'select-assess',
		'assessment-intro',
		'question-container',
		'product-page'
	],
	initialize: function() {
		this.renderTemplates();
        $('.montage').siblings('.screen').hide();
        app.dal.open();
        $('a.next').one('click',app.onNext);
        $('a.back').one('click',app.onBack);

        document.addEventListener('deviceready', this.events.onDeviceReady, false);
        document.addEventListener('online', this.events.onOnline, false);
        document.addEventListener('offline', this.events.onOffline, false);
	},
	onNext: function() {
        // TODO: Generalize onNext & onBack into one function
        var curScr = $(this).parents('.screen');
		var curScrNm = curScr.data('screen');

		var nxtScrNm = app.screens[app.screens.indexOf(curScrNm) + 1];
		var nxtScr = $('[data-screen=' + nxtScrNm +']');

		app.rndrCont(nxtScrNm);
		app.moveScr(curScr, nxtScr, 'next');

		// TODO: Push current screen on history stack
	},
    onBack: function() {
        // TODO: Generalize onNext & onBack into one function
        var curScr = $(this).parents('.screen');
        var curScrNm = curScr.data('screen');

        var nxtScrNm = app.screens[app.screens.indexOf(curScrNm) - 1];
        var nxtScr = $('[data-screen=' + nxtScrNm +']');

        app.rndrCont(nxtScrNm);
        app.moveScr(curScr, nxtScr, 'back');

        // TODO: Pop current screen off history stack
    },
	rndrCont: function(scr) {
		switch (scr) {
            case 'category-intro':
				var sql = 'select value from content where screen=\'category-intro\' and key=\'sound-detection\'';

                // TODO: Generalize the DB access & template rendering
				$(document).one('get:content', function (event) {
                    // TODO: Check if template has been compiled first
					var tmpl = Handlebars.compile($('#intro-tmpl').html());

                    // TODO: Possible security vulnerability here if someone has write access to DB
					var cat_intro_html = tmpl(eval("(" + event.data.item(0).value + ')'));
					$('[data-screen=category-intro]').html(cat_intro_html);
                    $('a.next').one('click',app.onNext);
                    $('a.back').one('click',app.onBack);
                });

				app.dal.getRows(sql, 'get:content');
				break;
			case 'select-assess':
				var sql = 'select value from content where screen=\'select-assess\'';

				$(document).one('get:content', function (event) {
					var tmpl = Handlebars.compile($('#assessment-template').html());
					var cat_ass_html = tmpl(eval("(" + event.data.item(0).value + ')'));
					$('[data-screen=select-assess]').html(cat_ass_html);
                    $('a.next').one('click',app.onNext);
                    $('a.back').one('click',app.onBack);
                });

				app.dal.getRows(sql, 'get:content');
				break;

            case 'assessment-intro':
                var sql = 'select value from content where screen=\'assess-intro\' and key=\'task-based\'';

                $(document).one('get:content', function (event) {
                    var tmpl = Handlebars.compile($('#assessment-intro-tmpl').html());
                    var ass_intro_html = tmpl(eval("(" + event.data.item(0).value + ')'));
                    $('[data-screen=assessment-intro]').html(ass_intro_html);
                    $('a.next').one('click',app.onNext);
                    $('a.back').one('click',app.onBack);
                });

                app.dal.getRows(sql, 'get:content');

                break;

			default:
				break;
		}
	},
	moveScr: function(from, to, direction) {
        var percent = {'next':[-10,0],'back':[100,0]};

		to.show();
/*		to.addClass('current');

		from.removeClass('current');*/
		from.animate(
			{left:percent[direction][0]+'%'},
			250,
			'cubic-bezier(0, 0, 0.20, 1)',
			function() {
				from.hide();
			}
		);

		to.animate(
			{left:percent[direction][1]+'%'},
			250,
			'cubic-bezier(0, 0, 0.20, 1)',
			function() {
				to.show();
			}
		);
	},
	compileTemplate: function(templateId) {
		// Stub for compiling templates
		// Should we precompile the templates so we don't have to do it at runtime?
		return Handlebars.compile($('#' + templateId).html());
	},
	renderTemplate: function() {
		// Stub for rendering data in a template
	},
	renderTemplates: function() {
		// Temporary function to init basic content



		if (!qtn_tmpl) {
			var qtn_ctx = {title:'Task Based',
				question:'Do you need data logging capability for later analysis?',
				description:'Choose yes if you want to retrieve, download, share and save instrument data with 3M™ Detection Management Software DMS.',
				answer_1_text:'Yes',answer_2_text:'No'};
			var qtn_tmpl = Handlebars.compile($('#question-tmpl').html());
			var qtn_html = qtn_tmpl(qtn_ctx);

			$('[data-screen=question-container]').html(qtn_html);
		}

		if (!prod_tmpl) {
			var prod_ctx = {model:'SD-200',name:'3M™ Sound Detector SD-200',
				subhead:'A value driven sound detection solution.',
				description:'<h3>User friendly</h3><p>Simple four-button navigation to perform all functions and ' +
					'comes ready to take measurements; no configuration necessary.</p><h3>Smart</h3>' +
					'<p>Integrating feature computes the average sound pressure level (LEQ/LAVG), for easier interpretation.</p>' +
					'<h3>Industry compliant</h3><p>Consistent performance with accurate readings and meets ' +
					'applicable ANSI and IEC Class 2 standards.</p>'};
			var prod_tmpl = Handlebars.compile($('#product_template').html());
			var prod_html = prod_tmpl(prod_ctx);

			$('[data-screen=product-page]').html(prod_html);
		}
	}
};

app.dal.open();
app.initialize();

$(function(){


	$('a.det-icon, a.pro-icon, a.com-icon').click(function(){
		$('nav.main-nav').show();
	});

	$('a.main-page').click(function(){
		$('nav.main-nav').hide();
	});

//Open Browse functionality
$('a.open-browse').click(function(){
		var buttonBackground = $(this).parent('li');
		var underSlide = $('.browse').siblings('.current');

		$('.browse .not-montage').hide();
		$(buttonBackground).toggleClass('active-nav');
		$('.browse').toggle();
		$('.browse .browse-active').toggle();
		$(underSlide).toggle();
});

//Browse next functionality
$('a.browse-next').click(function(){
			var oldSlide = $(this).parents('.pane');
			var newSlide = $(oldSlide).next('.pane');

			$(newSlide).show();
			$(newSlide).addClass('browse-active');
			$(oldSlide).removeClass('browse-active');
			$(oldSlide).animate({
				left:'-100%'
			}, 250, 'cubic-bezier(0, 0, 0.20, 1)', function() {
				$(oldSlide).hide();
				});
			$(newSlide).animate({
				left:'0%'
			}, 250, 'cubic-bezier(0, 0, 0.20, 1)');
});

//Browse back functionality
$('a.back-pane').click(function(){
				var oldSlide = $(this).parents('.pane');
				var newSlide = $(oldSlide).prev('.pane');

				$(newSlide).show();
				$(newSlide).addClass('browse-active');
				$(oldSlide).removeClass('browse-active');
				$(newSlide).animate({
					left:'0%'
				}, 250, 'cubic-bezier(0, 0, 0.20, 1)');

				$(oldSlide).animate({
				left:'100%'
				}, 250, 'cubic-bezier(0, 0, 0.20, 1)',function() {
					$(oldSlide).hide();
				});
			});

//Open product page
$('a.open-product').click(function(){
			var parentSection = $(this).parents('.screen');
			var productSection = $(parentSection).siblings('.product-page');
			var otherSlides = $(productSection).siblings('.detection');

			$(productSection).show();
			$(productSection).addClass('current');
			$(otherSlides).removeClass('current');
			$(otherSlides).hide();
			$(productSection).css({left:0});
			$(parentSection).hide();
			$('.pane').hide();
			$('li.active-nav').removeClass('active-nav');
		});

//Back up to Select Assessment Page

$('a.open-assessments').click(function(){
			$('.select-assess').css({left:0});
			$('.after-assess').css({left:'100%'});
			$('.after-assess').removeClass('current');
			$('.category-intro').css({left:'-10%'});
			$('.select-assess').show();
			$('.category-intro').hide();
			$('.after-assess').hide();
			$('category-intro').removeClass('current');
			$('.select-assess').addClass('current');
			$('.browse').hide();
			$('li.active-nav').removeClass('active-nav');
	});

$('a.home').click(function(){
			var openSib = $('.opening').siblings('.detection');

			$('.opening').css({left:0});
			$('.opening').show();
			$(openSib).css({left:'100%'});
			$(openSib).removeClass('current');
			$(openSib).hide();
			$('.browse').hide();
			$('li.active-nav').removeClass('active-nav');
			$('.main-nav').hide();
	});
});
