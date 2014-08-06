MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content"
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

MyApp.addInitializer(function(options){
  var questionView = new QuestionView ({
    model: options.questionnaire
  });
  MyApp.mainRegion.show(questionView);
});

$(document).ready(function(){
  var questions = new Question({});
  MyApp.start({questionnaire: questions});

});