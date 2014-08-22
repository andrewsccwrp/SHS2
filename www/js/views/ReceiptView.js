var ReceiptView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-receipt-details').html()),
	initialize: function(){
	},
	events:{
		"click .finish":"finish"
	},
	finish: function(){
       		appRouter.navigate('http://data.sccwrp.org/shs2/index.html', {trigger: true});
	},
	render: function(t){
			console.log("ReceiptView render");
			console.log(this.model.toJSON());
			//console.log(this.model.get('qcount'));
			$(this.el).html("");
			//console.log(this.model.get('id'));
			$(this.el).html(this.template(this.model.toJSON()));	
			return this;
	}
});
