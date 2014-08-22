var User = Backbone.Model.extend({
	initialize: function(){
            alert("Welcome to User Login");
        },
	url:"http://data.sccwrp.org/shs2/index.php/user",
	defaults:{
	  "id":null,
	  "phone":"",
	  "email":""+SESSIONID+"@sccwrp.org"
	}
});