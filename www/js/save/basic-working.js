//model
var Answer = Backbone.Model.extend();
var Question = Backbone.Model.extend();
//collection of models
var AnswerList = Backbone.Collection.extend({
	model: Answer,
	url: '/shs2/surveys',
	// use to check returned data
	//parse: function(data){
	//  console.log("parse");
	//  console.log(data);
	//}
});
var QuestionList = Backbone.Collection.extend({
	model: Question,
	url: '/shs2/questions.json',
});
//collection view
var AnswerListView = Backbone.View.extend({
	initialize: function(){
		console.log("initialize cview");
		console.log(this.collection);
		this.collection.deferred = this.collection.fetch();
		this.collection.deferred.done(this.addAll, this);
	},
	addAll: function(f){
		console.log("addAll");
		f.forEach( function(q){
			var answerView = new AnswerView({model: q});
			answerView.render();
		});
	},
	render: function(){
		//self = this;
	}
});
var QuestionListView = Backbone.View.extend({
	initialize: function(){
		console.log("ncview");
		//console.log(this.collection);
		console.log(this.collection.url);
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.render, this);
		/*
		this.collection.fetch({
			success: function(data){
				//console.log(this.collection.toJSON());
				//console.log("ncviewdata");
				console.log(data.toJSON());
				data.forEach(this.askAll, this);
			}
		}, this);
		*/
	},
	addOne: function(q){
		console.log("ncview addAll");
		console.log(q);
		var questionView = new QuestionView({model: q});	
		questionView.render();
		//this.$el.append(questionView.el);
		/*
		f.forEach( function(q){
			var questionView = new QuestionView({model: q});
			questionView.render();
		});
		*/
	},
	render: function(){
		//alert("test");
		this.collection.forEach(this.addOne, this);
		//self = this;
	}
});
// specific item of collection view
var AnswerListItemView = Backbone.View.extend({
	el: '#content',
	//template: _.template('<ul><li><%= id %> -  <%= query7 %></li></ul>'),
	template: _.template('<ul><li><%= id %> - <%= sessionid %></li></ul>'),
	render: function(eventName){
	  alert(this.model);
	  $(this.el).append(this.template(this.model));
	  return this;
	}
});
var QuestionListItemView = Backbone.View.extend({
	el: '#content',
	template: _.template('<ul><li><%= id %> - <%= sessionid %></li></ul>'),
	render: function(eventName){
	  alert(this.model);
	  $(this.el).append(this.template(this.model));
	  return this;
	}
});
// model view
var AnswerView = Backbone.View.extend({
	el: '#content',
	template: _.template('<ul><li><a href="shs2/question/<%= id %>" data-id="<%= id %>" class="ask"><%= id %></a> - <%= query1 %> - <%= query7 %></li></ul>'),
	events: {
	  'click .ask': 'askQuestion'
	},
	askQuestion: function(e){
	  e.preventDefault();
	  var id = $(e.currentTarget).data("id");
	  app.navigate('shs2/question/' + id, {trigger: true});
	},
	render: function(eventName){
			//console.log(this.model);
			$(this.el).append(this.template(this.model));	
			return this;
	}
});
var QuestionView = Backbone.View.extend({
	el: '#content',
	template: _.template('<ul><li><a href="shs2/question/<%= id %>" data-id="<%= id %>" class="ask"><%= id %></a> - <%= query %></li></ul>'),
	events: {
	  'click .ask': 'askQuestion'
	},
	askQuestion: function(e){
	  e.preventDefault();
	  var id = $(e.currentTarget).data("id");
	  app.navigate('shs2/question/' + id, {trigger: true});
	},
	render: function(eventName){
			console.log("render QuestionView");
			//console.log(this.model);
			$(this.el).append(this.template(this.model.toJSON()));	
			return this;
	}
});
var app = new (Backbone.Router.extend({
  routes: {
	"shs2/answers/:id": "ask",
	"shs2/question/:id": "show",
	"": "start"
  },
  initialize: function(){
	// working code 
	console.log("initialize");
	this.answerList = new AnswerList();
	this.answerListView = new AnswerListView({collection: this.answerList});
	this.questionList = new QuestionList();
	this.questionListView = new QuestionListView({collection: this.questionList});
	this.questionListView.render();
	this.questionList.fetch();
  },
  start: function(){
	console.log("start");
  },
  ask:function(id){
  },
  show:function(id){
	alert("show: "+id);
	this.question = new Question();
	this.questionView = new QuestionView({model: this.question});
	this.questionView.render();
  }
}));
$(function(){
  app.start();
  Backbone.history.start({pushState: true});
});
