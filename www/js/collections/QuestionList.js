var QuestionList = Backbone.Collection.extend({
	model: Question,
	url: 'questions.json'
});
