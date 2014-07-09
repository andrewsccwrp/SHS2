var Question = Backbone.Model.extend({})
var SurveyCollection = Backbone.Collection.extend({
	model: Question 
});
  // model collection instance
var surveyCollection = new SurveyCollection([
	{
		query: 'Do you speak English?',
      		num: 'q11',
      		type: 'radio',
      		menu: 'Yes,No',
                other: 'N',
		otype: '',
  		answer: '',
      		status: 'incomplete',
      		id: 1
	},
	{
		query: 'Are you 18 years or older?',
      		num: 'q12',
      		type: 'radio',
      		menu: 'Yes,No',
                other: 'N',
		otype: '',
  		answer: '',
      		status: 'incomplete',
      		id: 2
	},
	{
		query: 'Do you plan to surf in California in the next 3 months?',
      		num: 'q13',
      		type: 'radio',
      		menu: 'Yes,No',
                other: 'N',
		otype: '',
  		answer: '',
      		status: 'incomplete',
      		id: 3
	},
	{
		query: 'How many years have you surfed?',
      		num: 'q21',
      		type: 'number',
      		menu: 'Yes,No',
                other: 'N',
		otype: '',
  		answer: '',
      		status: 'incomplete',
      		id: 4
	},
	{
		query: 'How long is the board you usually ride?',
      		num: 'q24',
      		type: 'select',
		menu: 'Short Board (<7 feet), Fun Board (7-9 feet), Long Board (>9 feet)',
                other: 'N',
		otype: '',
  		answer: '',
      		status: 'incomplete',
      		id: 5
	},
	{
		query: 'What months do you usually surf in California?',
      		num: 'q26',
      		type: 'multi',
		menu: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
                other: 'N',
		otype: '',
  		answer: '',
      		status: 'incomplete',
      		id: 6
	},
	{
		query: 'What months do you usually surf in California?',
      		num: 'q30',
      		type: 'multi',
		menu: 'Windansea,Birdrock,PB Point,Tourmaline,Pacific Beach,Mission Beach,Ocean Beach,Sunset Cliffs,Imperial Pier N&S,Other',
		other: 'Y',
		otype: 'text',
  		answer: '',
      		status: 'incomplete',
      		id: 7
	}
  ]);

var QuestionView = Backbone.View.extend({
	el: '#content',
	render: function(){
			var html = '<li>'+ this.model.get('query')+'</li><a href="/query='+ this.model.get('id') + '">Click Here</a>';
			$(this.el).append(html);
	}
});
//var personView = new PersonView({ model: person1 });

var SurveyCollectionView = Backbone.View.extend({
	render: function(){
		this.addAll();
	},
	addOne: function(question){
		var questionView = new QuestionView({ model: question });
		$(this.el).append(questionView.render());
	},
	addAll: function(){
		this.collection.forEach(this.addOne, this);
	}
});

var QuestionRouter = Backbone.Router.extend({});
var questionRouter = new Backbone.Router({
	routes:{ "query/:id":"show" },
        show:function(uid){
		var question = new Question({id: id});
		var questionView = new questionView({model:question});
		questionView.render();

	}
});
questionRouter.navigate("query/1");
questionRouter = new QuestionRouter
surveyCollectionView = new SurveyCollectionView({ collection: surveyCollection});
surveyCollectionView.render();
console.log(surveyCollectionView.el);
//personView.render();
//console.log(personView.el);
