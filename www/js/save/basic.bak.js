var Question = Backbone.Model.extend({
	/*
	defaults : {
	  _id : "",
	  query1 : "",
	  query2 : "",
	  query3 : "",
	  query4 : "",
	  query5 : "",
	  query6 : "",
	  query7 : "",
	  sessionid : ""
	}
	*/
});
var SurveyQuestions = Backbone.Collection.extend({
	model: Question,
	url: '/backbone/surveys'
	
});
//var surveyQuestions = new SurveyQuestions();
//surveyQuestions.fetch();

var QuestionView = Backbone.View.extend({
	el: "#content",
	template: _.template('<h3><%= events.id %></h3>'),	
	initialize: function(){
		//console.log(surveyQuestions);
		//this.collection = new SurveyQuestions();
		//console.log(this.collection);
		//var attributes = surveyQuestions.toJSON();
		//console.log(attributes);
		//this.$el.html(this.template(attributes));
		_.bindAll(this, 'render');
		this.collection = new SurveyQuestions();
		var that = this;
		this.collection.fetch({
		  success: function () {
			that.render();
		  }
		});
	},
	render: function(){
		console.log(this.collection.toJSON());
		$(this.el).html(this.template({ events: this.collection.toJSON() }));
	}
});
var app = new QuestionView({});

//var questionView = new QuestionView({collection: surveyQuestions});

//var surveyQuestions = new SurveyQuestions( {id: "1"});
//var surveyQuestionsView = new SurveyQuestionsView({model:SurveyQuestions});
//var surveyQuestionsView = new SurveyQuestionsView();
