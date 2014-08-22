var Answer = Backbone.Model.extend({
	initialize: function(){
		this.on("invalid",function(model,error){
			alert(error.phone);
			alert(error.length);
		});
	},
	defaults: {
		'q1': 'null',
		'q6': 'null'	
	},
	validate: function (attrs){
		/* error checking/validation code placement - example for question6 */
		var errors = this.errors = {};
		if(!attrs.q6){ errors.phone = 'phone is required'; }
		if(attrs.q6.length < 2){ errors.length = 'phone has minimum'; }
		if(!_.isEmpty(errors)) return errors;
	}
});
