var QuestionListView = Backbone.View.extend({
	el: '#header',
	template:_.template($('#tpl-question-details').html()),
	render: function(){
		console.log("QuestionListView");
		$(this.el).html("");
		$(this.el).html(this.template(this.model.toJSON()));	
	}
});
