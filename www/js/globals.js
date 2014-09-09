//global
var isDevice = false;
var loginStatus = false;
var networkStatus;
var SESSIONID = +new Date;
var USERID;
var user;
(function(){
	$.getJSON("questions.json").done(function(qjson){
		var idlist = [];
		for(i in qjson) {
			idlist.push(Number(qjson[i].id));
		};
		 MAXQUESTION = Math.max.apply(null, idlist);
	});
}());
