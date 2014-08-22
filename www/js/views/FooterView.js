var FooterView = Backbone.View.extend({
	el: '#footer',
	template:_.template($('#tpl-footer-details').html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		console.log("footer");
		$(this.el).html("");
		$(this.el).html(this.template());	
		$('#footer').trigger('create');
	}
});