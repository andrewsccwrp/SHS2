var IntroView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-intro-details').html()),
	initialize: function(){
	},
	events:{
		"click #landingSurvey":"showLogin",
		"click #landingSurf":"showMap",
		"click #landingContact":"showContact",
		"click #landingFAQ":"showFAQ"
	},
	showContact: function(){
		headerView = new HeaderView;
		contactView = new ContactView;
	},
	showFAQ: function(){
		headerView = new HeaderView;
		faqView = new FAQView;
	},
	showLogin: function(){
		headerView = new HeaderView;
		loginView = new LoginView;
		footerView = new FooterView;
	},
	showMap: function(){
		headerView = new HeaderView;
		mapView = new MapView;
	},
	render: function(){
		console.log("introview render");
		$(this.el).html("");
		$(this.el).html(this.template());	
		$('#landList').listview( "refresh" );
		$('#content').trigger('create');
	}
});
