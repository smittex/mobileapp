(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['assess-intro'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header>\r\n	<div class=\"nav-back\">\r\n		<a class=\"back\"><img src=\"img/back_arrow.png\"/></a>\r\n	</div>\r\n	<h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n</header>\r\n<article class=\"contents-wrap\">\r\n	<h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\r\n	<div class=\"full-width\">\r\n		<img src=\"img/";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n	</div>\r\n	<a class=\"next select-button\">\r\n		";
  if (stack1 = helpers.button_text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.button_text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n		<img class=\"right-arrow\" src=\"img/right_arrow.png\"/>\r\n	</a>\r\n	<div class=\"copy-wrap\">\r\n		<p>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\r\n	</div>\r\n</article>";
  return buffer;
  });
templates['cat-intro'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header>\r\n	<div class=\"nav-back\">\r\n		<a class=\"back\"><img src=\"img/back_arrow.png\"/></a>\r\n	</div>\r\n	<h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n</header>\r\n<article class=\"contents-wrap\">\r\n	<h2>";
  if (stack1 = helpers.header) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.header; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\r\n	<div class=\"full-width\">\r\n		<img src=\"img/";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n	</div>\r\n	<a class=\"next select-button\">\r\n		";
  if (stack1 = helpers.button_text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.button_text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n		<img class=\"right-arrow\" src=\"img/right_arrow.png\"/>\r\n	</a>\r\n	<div class=\"copy-wrap\">\r\n		";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n	<a href=\"#\" onclick=\"window.open('http://link.brightcove.com/services/player/bcpid2127401086001?bckey=AQ~~,AAABHqwijIE~,eE4mETXuXRVkuTP-Kx4o5VhzD5sp-6qo&bclid=1894450151001&bctid=1849635222001', '_system');\"\r\n	    class=\"select-button green\">\r\n		Customer Testimonials\r\n		<img class=\"right-arrow\" src=\"img/right_arrow.png\"/>\r\n	</a>\r\n</article>";
  return buffer;
  });
templates['product-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n			<li><a class=\"open-product select-button multiple transparent list med\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n				<div class=\"product-name-browse\">\r\n				    ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n                </div>\r\n				<div class=\"color det\">\r\n					<img src=\"img/right_arrow_black.png\"/>\r\n				</div>\r\n			</a></li>\r\n		";
  return buffer;
  }

  buffer += "<div class=\"browse-back\">\r\n	<a class=\"back-pane\">\r\n		<img class=\"browse-back-arrow\" src=\"img/back_arrow.png\"/>\r\n	</a>\r\n</div>\r\n<article class=\"contents-wrap\">\r\n	<ul>\r\n		";
  stack1 = helpers.each.call(depth0, depth0.products, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</ul>\r\n</article>";
  return buffer;
  });
templates['product-page'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header>\r\n	<div class=\"nav-back\">\r\n		<a class=\"back\"><img src=\"img/back_arrow.png\"/></a>\r\n	</div>\r\n	<h1>";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n</header>\r\n<article class=\"contents-wrap\">\r\n	<div class=\"full-width\">\r\n		<img src=\"img/";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n	</div>\r\n	<h2 class=\"product-name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\r\n	<h3 class=\"sub-head\">";
  if (stack1 = helpers.subhead) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subhead; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\r\n	<div class=\"copy-wrap product-desc\">\r\n		";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n	<a href=\"#\" onclick=\"window.open('";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "', '_system');\" class=\"select-button green\">\r\n		More Information\r\n		<img class=\"right-arrow\" src=\"img/right_arrow.png\"/>\r\n	</a>\r\n</article>";
  return buffer;
  });
templates['question'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n				<li><a class=\"answer next\" data-question-id=\""
    + escapeExpression(((stack1 = depth1.question_id),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-answer-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"\r\n					   data-node-type=\"";
  if (stack2 = helpers.node_type) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.node_type; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-node-id=\"";
  if (stack2 = helpers.node_id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.node_id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">";
  if (stack2 = helpers.text) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.text; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</a></li>\r\n			";
  return buffer;
  }

  buffer += "<header>\r\n	<div class=\"nav-back\">\r\n		<a class=\"back\"><img src=\"img/back_arrow.png\"/></a>\r\n	</div>\r\n	<h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\r\n</header>\r\n<article class=\"contents-wrap\">\r\n	<h2 class=\"question\">";
  if (stack1 = helpers.question) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.question; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h2>\r\n	<div class=\"copy-wrap\">\r\n		<p>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\r\n	</div>\r\n	<div class=\"question-choices\">\r\n		<ul>\r\n			";
  stack1 = helpers.each.call(depth0, depth0.answers, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</ul>\r\n	</div>\r\n</article>";
  return buffer;
  });
templates['select-assess'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<a class=\"next select-button multiple image\" data-subitem=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n			<img class=\"select-thumb\" src=\"img/";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n			    <div class=\"test-name\">\r\n			        ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n			    </div>\r\n			<img class=\"right-arrow\" src=\"img/right_arrow.png\"/>\r\n		</a>\r\n	";
  return buffer;
  }

  buffer += "<header>\r\n	<div class=\"nav-back\">\r\n		<a class=\"back\"><img src=\"img/back_arrow.png\"/></a>\r\n	</div>\r\n	<h1>";
  if (stack1 = helpers.assessment) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.assessment; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n</header>\r\n<article class=\"contents-wrap\">\r\n	<h2>";
  if (stack1 = helpers.button_text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.button_text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\r\n	";
  stack1 = helpers.each.call(depth0, depth0.assessments, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</article>";
  return buffer;
  });
})();