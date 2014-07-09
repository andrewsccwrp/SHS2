//model
var Question = Backbone.Model.extend({
	urlRoot: '/shs2/index.php/module1',
	//url:"/shs2/index.php/module1",
	defaults:{
	  "id":null,
	  "answer":"test",
	}
});
//collection of models
var QuestionList = Backbone.Collection.extend({
	model: Question,
	url: 'questions.json',
});
//collection view
//this.collection.deferred = this.collection.fetch();
//this.collection.deferred.done(this.addAll, this);
var QuestionListView = Backbone.View.extend({
	initialize: function(){
		console.log("ncview");
		console.log(this.collection.url);
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.addOne, this);
	},
	addOne: function(q){
		console.log("ncview addAll");
		// q = current model in collection
		//console.log(q);
		var questionListItemView = new QuestionListItemView({model: q});	
		questionListItemView.render();
	},
	render: function(){
		this.collection.forEach(this.addOne, this);
		/*
		_.each(this.collection.models, function(q){
			$(this.el).append(new QuestionListItemView({model:q}).render().el);
			//console.log(q.get("id"));
		}, this);
		*/
	}
});
// specific item of collection view
var QuestionListItemView = Backbone.View.extend({
	el: '#content',
	template: _.template('<h3>QuestionListItemView</h3><ul><li><a href="question/<%= id %>" data-id="<%= id %>" class="ask"><%= id %></a> - <%= title %></li></ul>'),
        events: {
          'click .ask': 'askQuestion'
        },
        askQuestion: function(e){
	  //alert("askQuestion");
          e.preventDefault();
          var id = $(e.currentTarget).data("id");
          appRouter.navigate('shs2/question/' + id, {trigger: true});
        },
	render: function(eventName){
	  //current model to json
	  //console.log(this.model.toJSON());
	  $(this.el).append(this.template(this.model.toJSON()));
	  return this;
	}
});
// model view
var QuestionView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-question-details').html()),
	initialize: function(){
		// must unbind event before each question or will end up with wrong model
		$(this.el).unbind("click");
	},
	events:{
		"change input":"change",
		"click .save":"saveAnswer",
	},
	change:function(event){
		var target = event.target;
		//console.log("changing "+ target.id + ' from: ' + target.defaultValue +'"');
	},
	saveAnswer:function(event){
		alert($('#qid').val());
		// current answer
		var aid = $('#aid').val();
		// current question
		var cid = (Number($('#qid').val()));
		// next question  
		var qid = (cid + 1);
		// save answer to model
		//this.model.set({answer: aid, status: "complete"});
		console.log(this.model);
		// go to next question
		//if(cid == "11"){
			// save module to database or save locally if not available
			alert("Time to save data to database");
			this.model.save({id: cid, answer: aid}, { 
		  		success: function(model,response){
					console.log("success");
					this.close;
		  		},
		  		error: function(model,response){
					console.log("failed");
					console.log(response.responseText);
					console.log(response.status);
					console.log(response.statusText);
		  		}
			});
		//}
          	appRouter.navigate('shs2/question/' + qid, {trigger: true});
	},
	render: function(eventName){
			console.log("render QuestionView");
			$(this.el).html(this.template(this.model.toJSON()));	
			return this;
	}
});
var appRouter = new (Backbone.Router.extend({
  routes: {
	"shs2/answers/:id": "show",
	"shs2/question/:id": "ask",
	"": "start"
  },
  initialize: function(){
	// working code 
	console.log("initialize");
	// ***** MAJOR - this is where we place sessionid into database and retrieve id record for session
	this.answer = new Question();
	this.answerDetails = {
		id: null,
		num: 'q1',
		answer: 'test q1',
		title: 'Do you speak English'
	};
	this.answer.set(this.answerDetails);
	this.answer.save(this.answerDetails, {
		success: function(answer,response){
			console.log("success");
			//console.log(answer.toJSON());
			console.log(answer);
			this.questionView = new QuestionView({model: answer});
			this.questionView.render();
		},
  		error: function(answer,response){
			console.log("failed");
			console.log(response.responseText);
			console.log(response.status);
			console.log(response.statusText);
  		}
	});
	//this.answerList = new AnswerList();
	//this.answerListView = new AnswerListView({collection: this.answerList});
	//this.questionList = new QuestionList();
	//this.questionListView = new QuestionListView({collection: this.questionList});
	//this.questionListView.render();
	//this.questionList.fetch();
  },
  close: function(){
	alert("close");
	this.questionList = new QuestionList();
  },
  start: function(){
	//alert("start");
	console.log("start");
	//this.questionList = new QuestionList();
	//this.questionListView = new QuestionListView({collection: this.questionList});
	//this.questionListView.render();
	/*
	this.questionList.fetch({
		success: function(){
			//appRouter.navigate('shs2/question/1', {trigger: true});
		},
		error: function(){
			console.log("unable to fetch collection");
		}
	});
	*/
  },
  ask: function(id){
	alert(id);
	this.question = this.questionList.get(id);
	this.questionView = new QuestionView({model: this.question});
	this.questionView.render();
	//$('#content').html(this.questionView.render().el);
  },
  show: function(id){
	alert("show: "+id);
  }
}));
$(document).ready(function(){
  //var appRouter = new AppRouter();
  Backbone.history.start({pushState: true});
  appRouter.start();
});
