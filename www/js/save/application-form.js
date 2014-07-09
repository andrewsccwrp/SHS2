//model
var User = Backbone.Model.extend({
	url:"/shs2/index.php/user",
	defaults:{
	  "id":null,
	  "phone":"999-999-9999",
	  "email":"john@doe.com"
	}
});
var Question = Backbone.Model.extend({
	url:"/shs2/index.php/question",
	defaults:{
	  "id":null,
	  "text":"What is your favorite color?",
	  "answer":"",
	  "status":"incomplete"
	}
});
var UserView = Backbone.View.extend({
	template:_.template($('#tpl-user-details').html()),
	initialize:function(){
		this.model.bind("change", this.render, this);
	},
	render:function(eventName){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	events:{
		"change input":"change",
		"click .save":"saveUser",
	},
	change:function(event){
		var target = event.target;
		console.log("changing "+ target.id + ' from: ' + target.defaultValue +'"');
	},
	saveUser:function(){
		console.log("saveUser");
		//alert($('#phone').val());
		this.model.set({
			id:null,
			phone:$('#phone').val(),
			email:$('#email').val()
		});
		console.log(this.model.get("email"));
		console.log(this.model.url);
		this.model.save(null, { 
		  success: function(model,response){
			console.log("success");
			this.close;
		  },
		  error: function(model,response){
			console.log("failed");
			console.log(response.responseText);
			console.log(response.status);
			console.log(response.statusText);
		  }
		});
		return false;	
	},
	close:function(){
		$(this.el).unbind();
		$(this.el).empty();
	},
});
var QuestionView = Backbone.View.extend({
	template:_.template($('#tpl-question').html()),
	initialize:function(){
		this.model.bind("change", this.render, this);
	},
	render:function(eventName){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	events:{
		"change input":"change",
		"click .saveq":"saveQuestion",
	},
	change:function(event){
		var target = event.target;
		console.log("changing "+ target.id + ' from: ' + target.defaultValue +'"');
	},
	saveQuestion:function(){
		console.log("saveQuestion");
		this.model.set({
			id:null,
			answer:$('#answer').val(),
		});
		console.log(this.model.get("answer"));
		console.log(this.model.url);
		this.model.save(null, { 
		  success: function(model,response){
			console.log("success");
			this.close;
		  },
		  error: function(model,response){
			console.log("failed");
			console.log(response.responseText);
			console.log(response.status);
			console.log(response.statusText);
		  }
		});
		return false;	
	},
	close:function(){
		$(this.el).unbind();
		$(this.el).empty();
	},
});
var appRouter = new (Backbone.Router.extend({
  routes: {
	"": "start"
  },
  initialize: function(){
	// working code 
	console.log("initialize");
  },
  start: function(){
	//alert("start");
	console.log("start");
	this.user = new User();
	this.userView = new UserView({model: this.user});
	$('#content').html(this.userView.render().el);
  }
}));
$(document).ready(function(){
  //var appRouter = new AppRouter();
  Backbone.history.start({pushState: true});
  appRouter.start();
});
