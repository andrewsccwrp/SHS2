var LoginView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-login-details').html()),
	initialize: function(){
		this.render();
	},
	events:{
		"click #loginBtn":"loginUser",
		"click #enrollBtn":"enrollUser"
	},
	loginUser: function(e){
		e.preventDefault();
		var loginID = $('#loginInput').val();
        	var url = 'http://data.sccwrp.org/shs2/index.php/user/' + loginID;
		message = $.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'json',
		crossDomain: true,
		timeout: 4000,
		error: function(x,t,m){ 
			 if(t==="timeout"){ alert("Server Inaccessible contact Paul Smith"); }
		}, 
		success: function(data) {
			if(data.event == false){
				alert("Failed to login...Try again");
				loginView.render();
			//console.log(data.event.id);
			//console.log(typeof(data.event.id));
			} else {
				USERID = Number(data.event.id);
				appRouter.weekly();
			}
		},
		complete: function(data) {
			//alert("complete:"+data.key);
	        }
		});
	},
	enrollUser: function(e){
		e.preventDefault();
		appRouter.signup();
	},
	render: function(){
		console.log("LoginView render");
		$(this.el).html("");
		$(this.el).html(this.template());	
	}
});
