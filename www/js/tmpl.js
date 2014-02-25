!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["assess-intro"]=a(function(a,n,t,s,e){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var i,l="",c="function",o=this.escapeExpression;return l+='<div class="contents-wrap">\n	<h2>',(i=t.title)?i=i.call(n,{hash:{},data:e}):(i=n&&n.title,i=typeof i===c?i.call(n,{hash:{},data:e}):i),(i||0===i)&&(l+=i),l+='</h2>\n	<div class="full-width">\n		<img src="img/',(i=t.image)?i=i.call(n,{hash:{},data:e}):(i=n&&n.image,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'"/>\n	</div>\n	<a class="next select-button">\n		',(i=t.button_text)?i=i.call(n,{hash:{},data:e}):(i=n&&n.button_text,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'\n		<img class="right-arrow" src="img/right_arrow.png"/>\n	</a>\n	<div class="copy-wrap">\n		<p>',(i=t.description)?i=i.call(n,{hash:{},data:e}):(i=n&&n.description,i=typeof i===c?i.call(n,{hash:{},data:e}):i),(i||0===i)&&(l+=i),l+="</p>\n	</div>\n</div>"}),n["browse-families"]=a(function(a,n,t,s,e){function i(a,n){var s,e="";return e+="\n            <h1>",(s=t.name)?s=s.call(a,{hash:{},data:n}):(s=a&&a.name,s=typeof s===r?s.call(a,{hash:{},data:n}):s),e+=h(s)+"</h1>\n            ",s=t.each.call(a,a&&a.families,{hash:{},inverse:d.noop,fn:d.program(2,l,n),data:n}),(s||0===s)&&(e+=s),e+="\n            <br />\n        "}function l(a,n){var s,e="";return e+='\n               <a class="family list product-button" data-family="',(s=t.name)?s=s.call(a,{hash:{},data:n}):(s=a&&a.name,s=typeof s===r?s.call(a,{hash:{},data:n}):s),e+=h(s)+'">',(s=t.name)?s=s.call(a,{hash:{},data:n}):(s=a&&a.name,s=typeof s===r?s.call(a,{hash:{},data:n}):s),e+=h(s)+'\n                	<div class="color match">\n                	    <img src="img/right_arrow_black.png"/>\n                	</div>\n                </a>\n                '}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var c,o="",r="function",h=this.escapeExpression,d=this;return o+='<div class="pane product-list">\n    <div class="contents-wrap">\n        ',c=t.each.call(n,n&&n.categories,{hash:{},inverse:d.noop,fn:d.program(1,i,e),data:e}),(c||0===c)&&(o+=c),o+="\n    </div>\n</div>\n"}),n["browse-products"]=a(function(a,n,t,s,e){function i(a,n){var s,e="";return e+='\n                <li>\n                	<a class="browse-next select-button multiple transparent list med" data-product="',(s=t.id)?s=s.call(a,{hash:{},data:n}):(s=a&&a.id,s=typeof s===o?s.call(a,{hash:{},data:n}):s),e+=r(s)+'">\n                    	<img class="select-thumb prod-thumb" src="img/',(s=t.image)?s=s.call(a,{hash:{},data:n}):(s=a&&a.image,s=typeof s===o?s.call(a,{hash:{},data:n}):s),e+=r(s)+'" />\n                   		 <div class="product-name-browse">\n                        	',(s=t.name)?s=s.call(a,{hash:{},data:n}):(s=a&&a.name,s=typeof s===o?s.call(a,{hash:{},data:n}):s),e+=r(s)+'\n                    	</div>\n                   		 <div class="color match">\n                        	<img src="img/right_arrow_black.png"/>\n                   		 </div>\n                	</a>\n                </li>\n            '}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var l,c="",o="function",r=this.escapeExpression,h=this;return c+='<div class="pane product-list">\n    <div class="contents-wrap">\n        <ul>\n            ',l=t.each.call(n,n&&n.products,{hash:{},inverse:h.noop,fn:h.program(1,i,e),data:e}),(l||0===l)&&(c+=l),c+="\n        </ul>\n    </div>\n</div>\n"}),n["cat-intro"]=a(function(a,n,t,s,e){function i(a){var n,t="";return t+='\n        <a href="#" data-url="'+r((n=a&&a.link,n=null==n||n===!1?n:n.url,typeof n===o?n.apply(a):n))+'"\n           class="select-button green link">\n            '+r((n=a&&a.link,n=null==n||n===!1?n:n.text,typeof n===o?n.apply(a):n))+'\n            <img class="right-arrow" src="img/right_arrow.png"/>\n        </a>\n    '}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var l,c="",o="function",r=this.escapeExpression,h=this;return c+='<div class="contents-wrap">\n	<h2>',(l=t.header)?l=l.call(n,{hash:{},data:e}):(l=n&&n.header,l=typeof l===o?l.call(n,{hash:{},data:e}):l),c+=r(l)+'</h2>\n	<div class="full-width">\n		<img src="img/',(l=t.image)?l=l.call(n,{hash:{},data:e}):(l=n&&n.image,l=typeof l===o?l.call(n,{hash:{},data:e}):l),c+=r(l)+'"/>\n	</div>\n	<a class="next select-button">\n		',(l=t.button_text)?l=l.call(n,{hash:{},data:e}):(l=n&&n.button_text,l=typeof l===o?l.call(n,{hash:{},data:e}):l),c+=r(l)+'\n		<img class="right-arrow" src="img/right_arrow.png"/>\n	</a>\n	<div class="copy-wrap">\n		',(l=t.description)?l=l.call(n,{hash:{},data:e}):(l=n&&n.description,l=typeof l===o?l.call(n,{hash:{},data:e}):l),(l||0===l)&&(c+=l),c+="\n	</div>\n    ",l=t["if"].call(n,n&&n.link,{hash:{},inverse:h.noop,fn:h.program(1,i,e),data:e}),(l||0===l)&&(c+=l),c+="\n</div>"}),n.header=a(function(a,n,t,s,e){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var i,l="",c="function";return l+='<div class="nav-back">\n    <a class="back"><img src="img/back_arrow.png" /></a>\n</div>\n<h1>',(i=t.header)?i=i.call(n,{hash:{},data:e}):(i=n&&n.header,i=typeof i===c?i.call(n,{hash:{},data:e}):i),(i||0===i)&&(l+=i),l+="</h1>"}),n["model-sel"]=a(function(a,n,t,s,e){function i(a,n){var s,e="";return e+='\n                    <option value="',(s=t.mfr)?s=s.call(a,{hash:{},data:n}):(s=a&&a.mfr,s=typeof s===r?s.call(a,{hash:{},data:n}):s),e+=h(s)+'">',(s=t.mfr)?s=s.call(a,{hash:{},data:n}):(s=a&&a.mfr,s=typeof s===r?s.call(a,{hash:{},data:n}):s),e+=h(s)+"</option>\n                "}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var l,c,o="",r="function",h=this.escapeExpression,d=this;return o+='<article class="contents-wrap">\n    <h2 class="question">To what kind of radio will you be connecting your headset?</h2>\n    <div class="copy-wrap-select-box">\n        <div id="mfrRegion">\n            <select class="question-select-box" id="manufacturer">\n                <option>Select Radio Brand</option>\n                ',c=t.each.call(n,(l=n&&n.meta,null==l||l===!1?l:l.mfrs),{hash:{},inverse:d.noop,fn:d.program(1,i,e),data:e}),(c||0===c)&&(o+=c),o+='\n            </select>\n        </div>\n        <div id="mdlRegion">\n        </div>\n    </div>\n    <a class="next select-button">\n        Submit\n    </a>\n</article>'}),n.models=a(function(a,n,t,s,e){function i(a,n){var s,e="";return e+="\n        <option>",(s=t.model)?s=s.call(a,{hash:{},data:n}):(s=a&&a.model,s=typeof s===o?s.call(a,{hash:{},data:n}):s),e+=r(s)+"</option>\n    "}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var l,c="",o="function",r=this.escapeExpression,h=this;return c+='<select class="question-select-box" id="model">\n    <option>Select Radio Model</option>\n    ',l=t.each.call(n,n&&n.items,{hash:{},inverse:h.noop,fn:h.program(1,i,e),data:e}),(l||0===l)&&(c+=l),c+="\n</select>"}),n.montage=a(function(a,n,t,s,e){return this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{},'<div class="screen montage">\n    <img class="montage-top" src="img/top_montage.jpg"/>\n    <nav class="cat-nav">\n        <ul>\n            <li>\n                <a class="next select-button det-icon">\n \n                    Detection\n                    <img class="right-arrow" src="img/right_arrow.png" />\n                </a>\n            </li>\n            <li>\n                <a class="next select-button pro-icon">\n                    Protection\n                    <img class="right-arrow" src="img/right_arrow.png" />\n                </a>\n            </li>\n            <li>\n                <a class="next select-button com-icon">\n                       Communication\n                    <img class="right-arrow" src="img/right_arrow.png" />\n                </a>\n            </li>\n            <li>\n                <a class="next select-button val-icon">\n\n                    Validation\n                    <img class="right-arrow" src="img/right_arrow.png" />\n                </a>\n            </li>\n        </ul>\n        <img class="home-icon" src="img/detection.png" />\n        <img class="home-icon" id="overlap" src="img/protection.png" />\n        <img class="home-icon" id="last-icon" src="img/validation.png" />\n    </nav>\n    <img class="bottom-montage" src="img/bottom_montage.jpg"/>\n</div>'}),n.navigation=a(function(a,n,t,s,e){return this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{},'<ul>\n    <li><a id="navBtn_home" class="home">Home</a></li>\n    <li><a id="navBtn_browse" class="open-browse">Browse</a></li>\n</ul>\n'}),n["product-item"]=a(function(a,n,t,s,e){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var i,l="",c="function",o=this.escapeExpression;return l+='<a class="open-product product-button multiple list med match-list" data-id="',(i=t.id)?i=i.call(n,{hash:{},data:e}):(i=n&&n.id,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'">\n    <img class="select-thumb prod-thumb" src="img/',(i=t.image)?i=i.call(n,{hash:{},data:e}):(i=n&&n.image,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'" />\n    <div class="product-name-match">\n        ',(i=t.name)?i=i.call(n,{hash:{},data:e}):(i=n&&n.name,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'\n    </div>\n    <div class="color match">\n        <img src="img/right_arrow_black.png" />\n    </div>\n</a>'}),n["product-list"]=a(function(a,n,t,s,e){return this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{},'<div class="contents-wrap">\n</div>'}),n["product-page"]=a(function(a,n,t,s,e){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var i,l="",c="function",o=this.escapeExpression;return l+='<div class="contents-wrap">\n	<div class="full-width">\n		<img src="img/',(i=t.image)?i=i.call(n,{hash:{},data:e}):(i=n&&n.image,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'"/>\n	</div>\n	<h2 class="product-name">',(i=t.name)?i=i.call(n,{hash:{},data:e}):(i=n&&n.name,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'</h2>\n	<h3 class="sub-head">',(i=t.subhead)?i=i.call(n,{hash:{},data:e}):(i=n&&n.subhead,i=typeof i===c?i.call(n,{hash:{},data:e}):i),(i||0===i)&&(l+=i),l+='</h3>\n	<div class="copy-wrap product-desc">\n		',(i=t.description)?i=i.call(n,{hash:{},data:e}):(i=n&&n.description,i=typeof i===c?i.call(n,{hash:{},data:e}):i),(i||0===i)&&(l+=i),l+='\n	</div>\n	<a href="#" data-url="',(i=t.link)?i=i.call(n,{hash:{},data:e}):(i=n&&n.link,i=typeof i===c?i.call(n,{hash:{},data:e}):i),l+=o(i)+'" class="select-button green link">\n		More Information\n		<img class="right-arrow" src="img/right_arrow.png"/>\n	</a>\n</div>'}),n.question=a(function(a,n,t,s,e){function i(a,n,s){var e,i,l="";return l+='\n				<li><a class="answer" data-question-id="'+r((e=s&&s.question_id,typeof e===o?e.apply(a):e))+'" data-answer-id="',(i=t.id)?i=i.call(a,{hash:{},data:n}):(i=a&&a.id,i=typeof i===o?i.call(a,{hash:{},data:n}):i),l+=r(i)+'">',(i=t.text)?i=i.call(a,{hash:{},data:n}):(i=a&&a.text,i=typeof i===o?i.call(a,{hash:{},data:n}):i),l+=r(i)+"</a></li>\n			"}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var l,c="",o="function",r=this.escapeExpression,h=this;return c+='<div class="contents-wrap">\n	<h2 class="question">',(l=t.question_text)?l=l.call(n,{hash:{},data:e}):(l=n&&n.question_text,l=typeof l===o?l.call(n,{hash:{},data:e}):l),(l||0===l)&&(c+=l),c+='</h2>\n	<div class="copy-wrap">\n		<p>',(l=t.description)?l=l.call(n,{hash:{},data:e}):(l=n&&n.description,l=typeof l===o?l.call(n,{hash:{},data:e}):l),(l||0===l)&&(c+=l),c+='</p>\n	</div>\n	<div class="question-choices">\n		<ul>\n			',l=t.each.call(n,n&&n.answers,{hash:{},inverse:h.noop,fn:h.programWithDepth(1,i,e,n),data:e}),(l||0===l)&&(c+=l),c+="\n		</ul>\n	</div>\n</div>"}),n["select-assess"]=a(function(a,n,t,s,e){function i(a,n){var s,e="";return e+='\n		<a class="next select-button multiple image" data-subitem="',(s=t.title)?s=s.call(a,{hash:{},data:n}):(s=a&&a.title,s=typeof s===o?s.call(a,{hash:{},data:n}):s),(s||0===s)&&(e+=s),e+='">\n			<img class="select-thumb" src="img/',(s=t.image)?s=s.call(a,{hash:{},data:n}):(s=a&&a.image,s=typeof s===o?s.call(a,{hash:{},data:n}):s),e+=r(s)+'"/>\n			    <div class="test-name">\n			        ',(s=t.title)?s=s.call(a,{hash:{},data:n}):(s=a&&a.title,s=typeof s===o?s.call(a,{hash:{},data:n}):s),(s||0===s)&&(e+=s),e+='\n			    </div>\n			<img class="right-arrow" src="img/right_arrow.png"/>\n		</a>\n	'}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{};var l,c="",o="function",r=this.escapeExpression,h=this;return c+='<div class="contents-wrap">\n	<h2>',(l=t.button_text)?l=l.call(n,{hash:{},data:e}):(l=n&&n.button_text,l=typeof l===o?l.call(n,{hash:{},data:e}):l),c+=r(l)+"</h2>\n	",l=t.each.call(n,n&&n.assessments,{hash:{},inverse:h.noop,fn:h.program(1,i,e),data:e}),(l||0===l)&&(c+=l),c+="\n</div>"}),n.splash=a(function(a,n,t,s,e){return this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),e=e||{},'<div id="splash">\n    <img src="img/3M_logo.jpg" />\n    <div class="slogans">\n        <h4 class="bolder">3M™ Hearing Solutions</h4>\n        <h4>The power to protect your world.<sup>SM</sup></h4>\n    </div>\n</div>'})}();
