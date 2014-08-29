var AnswerListView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-answer-details').html()),
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
		"click .save":"saveAnswer",
    		"click .decline":"declineAnswer"
	},
	change:function(event){
		//console.log("changing "+ target.id + ' from: ' + target.defaultValue +'"');
		console.log("change");
	},
    	declineAnswer:function(event){
		formtype = this.model.get("type");
		$(this.selectorString[formtype]).val(this.model.get("declinedefault"));
		this.saveAnswer(event);
	},
	selectorString: {
				"radio":"#aid input[type = 'radio']:checked",
				"text":"#aid",
				"select":"#aid",
				"multi":"#aid input[type = 'checkbox']:checked"
			},
	saveAnswer:function(event){
		console.log("saveAnswer");
		var timer = 0;
		var appID;
		var that = this;
		var currentAnswer = $('#aid').val();
		formtype = this.model.get("type");
		var currentAnswer = $(this.selectorString[formtype]); 
		if(formtype == "multi") {
			var temparray = [];
			currentAnswer.map(function () { temparray.push(this.value); });
			currentAnswer = temparray.join();
		} else {
			currentAnswer = currentAnswer.val();
		};
		console.log("currentAnswer: "+ currentAnswer);
		// current question
		// too slow
		var currentQuestion = Number(this.model.get("qcount")); 
		//console.log("currentQuestion: "+ currentQuestion);
		appID = Number(this.model.get("id")); 
		//console.log("appID: "+ appID);
		//var currentQuestion = (Number($('#qid').val()));
		// next question  
		var nextQuestion = (currentQuestion + 1);
		// storing userid email and phone
		if(currentQuestion == 6){
			user.save({ phone: currentAnswer }, {
				wait: true,
				success: function(response){
					console.log(user.toJSON());
				},
				error: function(response){
					console.log(response.status);
				}
			});
		}
                // logic for skipping certain questions
		if(currentQuestion == 7 && currentAnswer == "phone") {
			nextQuestion = nextQuestion + 2;
		}
		if(currentQuestion == 8){
			user.save({ email: currentAnswer }, {
				wait: true,
				success: function(response){
					console.log(user.toJSON());
				},
				error: function(response){
					console.log(response.status);
				}
			});
		}
		var answerDetails = {};
		answerDetails["q"+currentQuestion] = currentAnswer;
		this.model.set("q"+currentQuestion, currentAnswer);
		answerDetails.qcount = nextQuestion;
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
		//if (connectionStatus != 'online'){
			// create unique key for web session 
			//var sessionKey = "key-" + SESSIONID + "-" + timer;
			var sessionKey = "key-" + SESSIONID;
			// are there any other keys on the key chain 
			var keyStorage = window.localStorage.getItem("key-chain");
			if (keyStorage != null && currentQuestion == 1){
				//alert("The following sessions are saved " + keyStorage);
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
			//alert("Test pull on : "+ currentStorage);	
		//} else {
			// we are online 
			//this.model.save({qcount: currentQuestion},{ used when useing set and mulitiple save
			//console.log(this.model.toJSON());
			this.model.save(answerDetails, {
				wait: true,
				success: function(model,response){
					console.log("success");
					//console.log(model.get("id"));
					//appID = Number(this.model.get("id")); 
					// if module1 - then notify user 
					// ****** notify user - working code ********** //
					//var currentEmail = model.get("q8");
					//app.notify(currentEmail);
					// ******************************************** // 
					// last module - go to receipt
					if(timer == 4){
						// return receipt from database
						//app.receipt();
						appRouter.navigate('shs2/receipt/' + appID, {trigger: true});
					} else {
						that.getQuestion(that,nextQuestion);
					}
				},
				error: function(model,response){
	       				console.log("failed");
	       				console.log(response.responseText);
	       				console.log(response.status);
	       				console.log(response.statusText);
       				}
			});
		}, /* end saveAnswer */
	getQuestion: function(t,nq){
		//console.log("getQuestion");
     		//console.log(t.model.get("id"));
	     	var questionList = new QuestionList();
	     	questionList.fetch({
			success: function(response){
				question = questionList.get(nq);
				questionListView = new QuestionListView({model: question});
				questionListView.render();
				t.render(question.attributes); // this render is called starting from the second question.
						      // render is called the first time from the router
			},
			error: function(response){
				console.log("questionList Failed");
			}
		});
	},
	render: function(question_opts){
		//this is to substitute in menu options for the the first question when sent from the router
		if(question_opts == "default") { 
			question_opts = {"type": 'radio',
				"menu": 'Yes,No',
				"decline":"no"};
		};
		question_opts.menu = question_opts.menu.split(","); //menu options in JSON are in one string
		$(this.el).html("");
		this.model.set(question_opts);
		$(this.el).html(this.template(this.model.toJSON()));
		$('#multi-radio').trigger('create');
		$("input[type='checkbox']").checkboxradio();
		return this;
	}
});
