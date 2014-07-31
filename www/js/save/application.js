//global
var SESSIONID = +new Date;
var connectionStatus = navigator.onLine ? 'online' : 'offline';
//model
var Answer = Backbone.Model.extend({
	//url: '/shs2/index.php/surveys',
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
		var errors = this.errors = {};
		if(!attrs.q6){ errors.phone = 'phone is required'; }
		if(attrs.q6.length < 2){ errors.length = 'phone has minimum'; }
		if(!_.isEmpty(errors)) return errors;
	}
});
var Question = Backbone.Model.extend();
var Receipt = Backbone.Model.extend();
//collection of models
var QuestionList = Backbone.Collection.extend({
	model: Question,
	url: 'questions.json'
});
var AnswerList = Backbone.Collection.extend({
	model: Answer,
	url: '/shs2/index.php/surveys'
});
var ReceiptList = Backbone.Collection.extend({
	model: Receipt,
	url: '/shs2/index.php/question/:id'
});
var QuestionListView = Backbone.View.extend({
	el: '#header',
	template:_.template($('#tpl-test-details').html()),
	render: function(){
		//console.log("QuestionListView");
		$(this.el).html("");
		$(this.el).html(this.template(this.model.toJSON()));	
	}
});
var ReceiptView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-receipt-details').html()),
	initialize: function(){
	},
	events:{
		"click .finish":"finish"
	},
	finish: function(){
       		appRouter.navigate('/', {trigger: true});
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
var AnswerListView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-question-details').html()),
	initialize: function(){
		// must unbind event before each question or will end up with wrong model
		$(this.el).unbind("click");
		//this.model.on("change", this.change, this);
		this.model.on('change', function(model){
			console.log('change', model.toJSON());
		});
	},
	events:{
		//"change":"change",
		"click .save":"saveAnswer"
	},
	change:function(event){
		//console.log("changing "+ target.id + ' from: ' + target.defaultValue +'"');
		console.log("change");
	},
	saveAnswer:function(event){
		var timer = 0;
		var appID;
		var that = this;
		//console.log("changing "+ target.id + ' from: ' + target.defaultValue +'"');
		// current answer
		//console.log(this.model.get("qcount"));
		var currentAnswer = $('#aid').val();
		//console.log("currentAnswer: "+ currentAnswer);
		// current question
		// too slow
		//var currentQuestion = Number(this.model.get("qcount")); 
		//console.log("currentQuestion: "+ currentQuestion);
		appID = Number(this.model.get("id")); 
		//console.log("appID: "+ appID);
		var currentQuestion = (Number($('#qid').val()));
		// next question  
		var nextQuestion = (currentQuestion + 1);
		switch(currentQuestion){
		  case 1:
			//answerDetails = { q1: currentAnswer, qcount: nextQuestion};
			answerDetails = { q1: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 2:
			answerDetails = { q2: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 3:
			answerDetails = { q3: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 4:
			answerDetails = { q4: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 5:
			answerDetails = { q5: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 6:
			var currentPhone = currentAnswer.replace(/-/g, '');
			answerDetails = { q6: currentPhone, qcount: nextQuestion};
		  	break;	
		  case 7:
			if(currentAnswer == "phone"){
				//var currentPhone = this.model.get("q6"); 
				//var mmsEmail = app.lookup(currentPhone);
				//alert(mmsEmail);
				// if phone - skip email go to 10
				answerDetails = { q7: currentAnswer, qcount: (nextQuestion + 2)};
			} else if (currentAnswer == "email"){
				answerDetails = { q7: currentAnswer, qcount: nextQuestion};
			} else {
				alert("something went wrong - neither email or phone");
			}
		  	break;	
		  case 8:
			answerDetails = { q8: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 9:
			answerDetails = { q9: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 10:
			answerDetails = { q10: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 11:
			answerDetails = { q11: currentAnswer, qcount: nextQuestion};
			// timer = 1; end of module1 set to save
		  	break;	
		  case 12:
			answerDetails = { q12: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 13:
			answerDetails = { q13: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 14:
			answerDetails = { q14: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 15:
			answerDetails = { q15: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 16:
			answerDetails = { q16: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 17:
			answerDetails = { q17: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 18:
			answerDetails = { q18: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 19:
			answerDetails = { q19: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 20:
			answerDetails = { q20: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 21:
			answerDetails = { q21: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 22:
			answerDetails = { q22: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 23:
			answerDetails = { q23: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 24:
			answerDetails = { q24: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 25:
			answerDetails = { q25: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 26:
			answerDetails = { q26: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 27:
			answerDetails = { q27: currentAnswer, qcount: nextQuestion};
			//timer = 2;
		  	break;	
		  case 28:
			answerDetails = { q28: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 29:
			answerDetails = { q29: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 30:
			answerDetails = { q30: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 31:
			answerDetails = { q31: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 32:
			answerDetails = { q32: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 33:
			answerDetails = { q33: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 34:
			answerDetails = { q34: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 35:
			answerDetails = { q35: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 36:
			answerDetails = { q36: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 37:
			answerDetails = { q37: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 38:
			answerDetails = { q38: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 39:
			answerDetails = { q39: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 40:
			answerDetails = { q40: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 41:
			answerDetails = { q41: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 42:
			answerDetails = { q42: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 43:
			answerDetails = { q43: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 44:
			answerDetails = { q44: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 45:
			answerDetails = { q45: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 46:
			answerDetails = { q46: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 47:
			answerDetails = { q47: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 48:
			answerDetails = { q48: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 49:
			answerDetails = { q49: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 50:
			answerDetails = { q50: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 51:
			answerDetails = { q51: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 52:
			answerDetails = { q52: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 53:
			answerDetails = { q53: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 54:
			answerDetails = { q54: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 55:
			answerDetails = { q55: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 56:
			answerDetails = { q56: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 57:
			answerDetails = { q57: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 58:
			answerDetails = { q58: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 59:
			answerDetails = { q59: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 60:
			answerDetails = { q60: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 61:
			answerDetails = { q61: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 62:
			answerDetails = { q62: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 63:
			answerDetails = { q63: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 64:
			answerDetails = { q64: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 65:
			answerDetails = { q65: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 66:
			answerDetails = { q66: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 67:
			answerDetails = { q67: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 68:
			answerDetails = { q68: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 69:
			answerDetails = { q69: currentAnswer, qcount: nextQuestion};
		  	break;	
		  case 70:
			answerDetails = { q70: currentAnswer, qcount: nextQuestion};
			timer = 4;
		  	break;	
		}	
		// either set or save here
		//this.model.save({q1: "test"}, { 
		//this.model.set(answerDetails, {validate:true});
		//if(timer != 0){ use this code if you want break up modules and then save
			//window.localStorage.clear();
			console.log(this.model.toJSON());
			// dump saved answers to json string 
			var parsedJSON = JSON.stringify(this.model.toJSON());
			// need a new column called status in db
			//  are we online or offline 
			// we are offline
		  if (connectionStatus != 'online'){
			// create unique key for web session 
	    		var sessionKey = "key-" + SESSIONID + "-" + timer;
			// are there any other keys on the key chain 
	    		var keyStorage = window.localStorage.getItem("key-chain");
	    		if (keyStorage != null){
				alert("The following sessions are saved " + keyStorage);
				// yes other keys add new key to key chain 
				keyStorage = ""+ keyStorage +","+ sessionKey +"";
	    		} else {
				// no first key on key chain 
				var keyStorage = ""+ sessionKey +"";
	    		}	
			// save key chain to local database 
			window.localStorage.setItem("key-chain", keyStorage);
			// save new key to local database 
			window.localStorage.setItem(""+ sessionKey +"", parsedJSON);
    			var currentStorage = window.localStorage.getItem("key-chain");
    			alert("Test pull on : "+ currentStorage);	
		  } else {
			// we are online 
			//this.model.save({qcount: currentQuestion},{ used when useing set and mulitiple save
			//console.log(this.model.toJSON());
			this.model.save(answerDetails, {
			  wait: true,
	  		  success: function(model,response){
				console.log("success");
				//console.log(response);
				//console.log(model.toJSON());
				//console.log(model.get("id"));
				//appID = Number(this.model.get("id")); 
				// if module1 - then notify user 
				// ****** notify user - working code ********** //
				//var currentEmail = model.get("q8");
				//app.notify(currentEmail);
				// ******************************************** // 
				// return receipt from database
				//app.receipt();
				that.getQuestion(that,nextQuestion);
	  		  },
	  		  error: function(model,response){
				console.log("failed");
				console.log(response.responseText);
				console.log(response.status);
				console.log(response.statusText);
	  		  }
			});
		  } // close else
		//} // timer if - remove to enable module save
		// last module - go to receipt
		if(timer == 4){
				// return receipt from database
				//app.receipt();
       				appRouter.navigate('shs2/receipt/' + appID, {trigger: true});
		}
		//this.getQuestion(nextQuestion);
		// call lookup after database save
		//app.lookup();
		// set/save telephone/email fields to database
		// when finished with all questions check users record in database and present to viewer
		// then send user an email notification welcoming them to the study
		//app.receipt();
		//app.notify();
       		//appRouter.navigate('shs2/question/' + appID + '/' + nextQuestion, {trigger: true});
		/* set timer back to 0 */
		//timer = 0;
	},
	getQuestion: function(t,nq){
		//console.log("getQuestion");
		//console.log(t.model.get("id"));
		var questionList = new QuestionList();
		questionList.fetch({
		  success: function(response){
			question = questionList.get(nq);
			var type = question.attributes.type;
			questionListView = new QuestionListView({model: question});
			questionListView.render();
			//check.render(question.attributes.type);
			t.render(type);
		  },
		  error: function(response){
			console.log("questionList Failed");
		  }
		});
	},
	render: function(form_type){
			//console.log("AnswerListView render");
			//console.log(this.model.toJSON());
			//console.log(this.model.get('qcount'));
			$(this.el).html("");
			//console.log(this.model.get('id'));
			this.model.set({"type":form_type});
			//console.log(this.model.toJSON());
			$(this.el).html(this.template(this.model.toJSON()));	
			return this;
	}
});
	
var appRouter = new (Backbone.Router.extend({
  routes: {
	"shs2/question/:appid/:nq": "ask",
	"shs2/receipt/:appid": "receipt",
	"": "start"
  },
  /*
  ask: function(appid,nq){
	//console.log("AppID:" + appid);
	//console.log("Next Answer:" + nq);
	var answerList = new AnswerList();
	answerList.fetch({
		success: function(response){
			var answer = answerList.get(appid);
			answerListView = new AnswerListView({model: answer});
			answerListView.render();
		},
		error: function(response){
			console.log("error");
		}
	});
  },
  */
  receipt: function(appid){
	console.log("Receipt ID:" + appid);
	//console.log("Next Answer:" + nq);
	var receiptList = new AnswerList();
	receiptList.fetch({
		success: function(response){
			var record = receiptList.get(appid);
			receiptView = new ReceiptView({model: record});
			console.log("receiptView: "+record);
			//receiptView.render();
		},
		error: function(response){
			console.log("error");
				console.log(response.responseText);
				console.log(response.status);
				console.log(response.statusText);
		}
	});
  },
  start: function(){
	console.log("start");
	// create initial record in database - set timestamp
	var answerList = new AnswerList();
	answerList.create({qcount: 1, timestamp: SESSIONID}, {
	  wait: true,
	  success: function(model,response){
		console.log("start - success");
		//console.log(response);
		answer = answerList.get(response.id);
		answerListView = new AnswerListView({model: answer});
		answerListView.render("radio");
		//this.close;
	  },
 		error: function(model,response){
		console.log("failed");
		console.log(response.responseText);
		console.log(response.status);
		console.log(response.statusText);
	  }
	});
	/*
	var questionList = new QuestionList();
	questionList.fetch({
		success: function(response){
			question = questionList.get('1');
			questionListView = new QuestionListView({model: question});
			questionListView.render();

		},
		error: function(response){

		}
	});
	*/
  }
}));
var app = {
  lookup: function(p){
	var url = 'http://data.sccwrp.org/shs2/lookup.php';
	//var p = "15625727718";
	message = $.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {pp: p},
		crossDomain: true,
		timeout: 4000,
		error: function(x,t,m){ 
			 if(t==="timeout"){ alert("Data not Submitted"); }
		}, 
		success: function(data) {
			//alert("status:"+data.status[0]);
			//alert("number:"+data.number[0]);
			//lookup_number = data.number[0];
			//return lookup_number;
			lookup_success(data);
		},
		complete: function(data) {
			//alert("complete:"+data.key);
	        }
    	});
  },
  notify: function(e){
	alert("app.notify");
	alert(e)
	var url = 'http://data.sccwrp.org/shs2/email.php';
	//var p = "15625727718";
	message = $.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {ee: e},
		crossDomain: true,
		timeout: 4000,
		error: function(x,t,m){ 
			 if(t==="timeout"){ alert("Data not Submitted"); }
		}, 
		success: function(data) {
			alert(data);
			//alert("status:"+data.status[0]);
			//alert("number:"+data.number[0]);
			//lookup_number = data.number[0];
		},
		complete: function(data) {
			//alert("complete:"+data.key);
	        }
    	});

  },
  receipt: function(){
	alert("app.receipt");
  }
};
$(document).ready(function(){
  Backbone.history.start({pushState: true});
  appRouter.start();
});
