var FAQView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-faq-details').html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		console.log("faq");
		$(this.el).html("");
		$(this.el).html(this.template());	
		$('#content').trigger('create');
	}
});