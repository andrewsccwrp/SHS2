MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content",
  navigation: "#navigation"
});

listOfQuestions.forEach(function(q) {
	q.validation = null;
})
Question = Backbone.Model.extend({
	defaults: listOfQuestions[0],
	validate: function(r) {
		return true
	},
	response: function(r) {
		this.set("answer", r);
		listOfQuestions[Number(this.id) - 1].answer = r;
	},
	nextQuestion: function() {
		this.set(listOfQuestions[Number(this.id)])
	},
	previousQuestion: function() {
		this.set(listOfQuestions[Number(this.id) - 2])
	}
});


QuestionView = Backbone.Marionette.ItemView.extend({

	tagName: "div",
	template: "#question-template",
	className: "question",
	events: {
		'click .next' : 'nextQ',
		'click .previous' : 'prevQ'
	},
	initialize: function(){
		this.listenTo(this.model, "change:id", this.render);
		this.listenTo(this.model, "change:validation", this.render);
	},
	save: function () {
		var val = $("#aid").val();
		if(this.model.validate(val)) {
			this.model.set("validation", null);
			this.model.response(val);
			return true;
		} else {
			this.model.set("validation", "Invalid response");
			return false;
		};
	},
	nextQ: function() {
		if(this.save()){
			this.model.nextQuestion();
		};
	},
	prevQ: function() {
		this.model.previousQuestion();
	}
});

Page = Backbone.Model.extend({
	defaults: {
		"page": "login"
	}
})


LoginView = Backbone.Marionette.ItemView.extend({
	template: "#login-template",
	className: "login"
})

Receipt = Backbone.Model.extend({
	defaults: {
		data: listOfQuestions
	}
})

ReceiptView = Backbone.Marionette.ItemView.extend({
	template: "#receipt-template",
	className: "receipt"
})

NavigationView = Backbone.Marionette.ItemView.extend({
	template: "#navigation-template",
	className: "navigation",
	events: {
		'click .receipt' : 'receipt',
		'click .login' : 'login',
		'click .questionnaire' : 'questionnaire'
	},
	receipt: function() {
		MyApp.page.set("page", "receipt");
	},
	login: function() {
		MyApp.page.set("page", "login");
	},
	questionnaire: function() {
		MyApp.page.set("page", "questionnaire");
	}
})

MainController = Marionette.Controller.extend({
	initialize: function(){
		MyApp.page = new Page({});
		var questionnaire =  new QuestionView({model: new Question({})});
		var login = new LoginView({});
		var receipt = new ReceiptView({model: new Receipt({})});
		this.pageViewList = {
			"questionnaire": questionnaire,
			"login": login,
			"receipt": receipt
		}
		this.listenTo(MyApp.page, "change:page", this.routeView);
	},
	routeView: function() {
		MyApp.mainRegion.show(this.pageViewList[MyApp.page.get("page")]);
	}
})

MyApp.addInitializer(function(options){
  navView = new NavigationView({});
  MyApp.navigation.show(navView);
  MyApp.controller = new MainController({});
  MyApp.controller.routeView();
});

$(document).ready(function(){
  MyApp.start({});
  Backbone.history.start();
});