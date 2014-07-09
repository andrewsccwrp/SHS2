// version 2.4 bug fixes for module3 question 2 unable to escape alert, skittish footer bar, 
// - q38b last element inaccessible on ios, pipes for splitting other text, incorrect surf enter and exit
// version 2.5 bug fixes for 4.14-4.18 [symptoms] skipping if no and field tablet module rearrangement
// version 2.5.1 added did not surf option to q31, no login with 0, and log submit to sccwrp
	// added order 25feb14
	var isDevice = false;
	var exitEarly = false;
	var deviceID;
	var map;
	var ReportName = [];
	var ReportCast = [];
	var fullHeight= $('html').height();
  	var to_submit = [];
  	var to_submitPop = [];
	var USERID;
	var USERAPPVERSION = "2.5.1"; // window.device.uuid;
	var login_status = 0;
	var prev_modNum = 0;
	var qNum=0;
	var qNumPer=0;
	var totqNum=0;
	var modNum=1;
	var prevQuestArray=[0];
	var doneQCount=1;
	var multiDisable =true;
	var mod1 = {};
	var backDisable = false;
	var noBack = ['q39','q38b','q32','q11','q21','q31','q41','q419','q51'];
	var beachList = 'Select One,Windansea,Birdrock,PB Point,Tourmaline,Pacific Beach,Mission Beach,Ocean Beach,Sunset Cliffs,Imperial Pier N&S,Other';
	var lastDays = sevenDays().toString(); 
	var fieldDevices = ['abae1013824c8333','ebd56c30eef8e2eb','9ec53f2ff0b4a575','b57e96cae7cba8c2','718dfae3b57d403d','a34121f5cc60376d','4960b272250be85f','f85e8f96c2ae66f5','ee4c43311b41d6bf','33c9a697c1271b28'];
	var sevenDaysAgo = sevenDays()[6]; 
		  mod1['0'] = ['q11','Do you speak English?','radio'];
		  mod1['1'] = ['q12','Are you 18 years or older?','radio'];
		  mod1['2'] = ['q13','Do you plan to surf in California in the next 3 months?','radio'];
		  mod1['3'] = ['q14','Do you have internet access with a computer or a smartphone?','radio'];
		  mod1['4'] = ['q15','Please read the following consent form, when finished complete the question below.','radio'];
		  mod1['5'] = ['q16','Can you give me your primary phone number (mobile phone preferred)?  This information remains completely confidential. We collect this information only so we can contact you if needed during the study. We will never share this information with anybody and will destroy this information at the end of the study (Enter 999-999-9999 if declined)','text'];
		  mod1['6'] = ['q17','The study will send you a weekly reminder to fill out a quick, 10-minute survey of your surf activity and health.  Would you prefer that the study contact you primarily by phone through text messages (SMS) or by email?','radio','Phone','Email'];
		  mod1['7'] = ['q17a','Please enter your email address where you would like us to contact you (Enter Null@Null.com if declined)','text'];
		  mod1['8'] = ['q17b','Please confirm your email address (Enter Null@Null.com if declined)','text'];
		  mod1['9'] = ['q18','Do you have a secondary phone number, such as a landline, where we can reach you? (Enter 999-999-9999 if declined)','text'];
		  mod1['10'] = ['q19','What is your Zip Code? (enter 88888 if refused; enter 99999 if unknown)','text'];

		  var mod2 = {};
		  mod2['0'] = ['q21','How many years have you surfed?','text'];
		  mod2['1'] = ['q22','About how often do you surf during the wet season (November -  March)?','text'];
		  mod2['2'] = ['q23','About how often do you surf during the dry season (April -  October)?','text'];
		  mod2['3'] = ['q24','How long is the board you usually ride?','select','Select a Type,Short Board (<7 feet), Fun Board (7-9 feet), Long Board (>9 feet)'];
		  mod2['4'] = ['q25','Do you usually wear earplugs when you surf?','radio'];
		  mod2['5'] = ['q26','What months of the year do you usually surf in California?','multi','Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'];
		  mod2['6'] = ['q27','If it rains, do you ever wait to go in the ocean?','select','Select One,Yes always wait,Yes sometimes wait,No'];
		  mod2['7'] = ['q27a','How long do you typically wait?','text'];
		  mod2['8'] = ['q28','During the winter season (November - March), which beach do you consider your "home" beach (where you surf most often)?','select',beachList];
		  mod2['9'] = ['q29','Do you regularly surf other beaches during the winter?','radio'];
		  mod2['10'] = ['q29a','Which Beaches?','multi','Windansea,Birdrock,PB Point,Tourmaline,Pacific Beach,Mission Beach,Ocean Beach,Sunset Cliffs,Imperial Pier N&S,Other'];
		  mod2['11'] = ['q210','Do you have a different home beach during the summer season (April - October)?','radio'];
		  mod2['12'] = ['q210a','Which Beach?','select',beachList];
		  mod2['13'] = ['q211','Do you regularly go into the ocean for activities other than surfing?','radio'];
		  mod2['14'] = ['q211a','Mark all that apply','multi','Swimming,Body Surfing,Body Boarding,Stand-up Paddle Boarding,Wind Surfing or Kite Boarding,Free Diving or Scuba Diving,Other'];
		  mod2['15'] = ['q212','Do you have any of the following long-term health conditions. (Mark all that apply)','multi','Allergies other than drug allergies, Surfer\'s ear, Chronic sinus problems, Chronic gastrointestinal problems such as Crohn\'s disease or irritable bowel syndrome, Chronic respiratory diseases such as asthma or emphysema, Chronic skin problems such as psoriasis or eczema'];

		  var mod3 = {};
		  mod3['0'] = ['q31','Did you enter the ocean on any days in the past week?','multi',lastDays];
		  mod3['1'] = ['q32','What beach did you go to?','multi',beachList];
		  mod3['2'] = ['q33','What was your main activity while in the ocean?','multi','Select One,Surfing,Swimming,Body Surfing,Body Boarding,Stand-up Paddle Boarding,Wind Surfing or Kite Boarding,Free diving or Scuba Diving,Other'];
		  mod3['3'] = ['q34','Did you immerse your head in the water?','radio'];
		  mod3['4'] = ['q35','Did you swallow any water?','radio'];
		  mod3['5'] = ['q36','Did you wear earplugs?','radio'];
		  mod3['6'] = ['q37','Did you wear a wetsuit?','multi','Select One,Full suit (full legs and arms),Shorty (short sleeves and short legs),Long john (covers torso and legs),Rash guard only,No wetsuit'];
		  mod3['7'] = ['q38a','Approximately when did you enter the ocean?','text'];
		  mod3['8'] = ['q38b','Approximately when did you exit the ocean?','text'];
		  mod3['9'] = ['q39','Were there any days in the past week that you would have gone into the ocean but didnt because of wet weather or bad weather?','multi',lastDays];

		  var mod4 = {};
		  mod4['0'] = ['q41','Did you have a fever in the last 7 days?','radio'];
		  mod4['1'] = ['q41ag','Which days?','multi',lastDays];
		  mod4['2'] = ['q42','Did you have diarrhea (3 or more loose/watery stools in 24 hours) in the last 7 days?','radio'];
		  mod4['3'] = ['q42ag','Which days?','multi',lastDays];
		  mod4['4'] = ['q43','Did you have stomach cramps in the last 7 days?','radio'];
		  mod4['5'] = ['q43ag','Which days?','multi',lastDays];
		  mod4['6'] = ['q44','Did you have vomiting in the last 7 days?','radio'];
		  mod4['7'] = ['q44ag','Which days?','multi',lastDays];
		  mod4['8'] = ['q45','Did you have nausea in the last 7 days?','radio'];
		  mod4['9'] = ['q45ag','Which days?','multi',lastDays];
		  mod4['10'] = ['q46','Did you have sinus pain or sinus infection in the last 7 days?','radio'];
		  mod4['11'] = ['q46ag','Which days?','multi',lastDays];
		  mod4['12'] = ['q47','Did you have earache, ear infection, or running nose in the last 7 days?','radio'];
		  mod4['13'] = ['q47ag','Which days?','multi',lastDays];
		  mod4['14'] = ['q48','Did you have an eye infection in the last 7 days?','radio'];
		  mod4['15'] = ['q48ag','Which days?','multi',lastDays];
		  mod4['16'] = ['q49','Did you have heart burn or acid reflux in the last 7 days?','radio'];
		  mod4['17'] = ['q49ag','Which days?','multi',lastDays];
		  mod4['18'] = ['q410','Did you have a minor injury unrelated to surfing (e.g. twisted ankle, twisted knee, scrape or cut) in the last 7 days?','radio'];
		  mod4['19'] = ['q410ag','Which days?','multi',lastDays];
		  mod4['20'] = ['q411','Did you have an infected cut in the last 7 days?','radio'];
		  mod4['21'] = ['q411ag','Which days?','multi',lastDays];
		  mod4['22'] = ['q412','Did you have a skin rash, itchy skin, or skin infection in the last 7 days?','radio'];
		  mod4['23'] = ['q412ag','Which days?','multi',lastDays];
		  mod4['24'] = ['q413','Did anybody else who lives in your house come down with the same symptoms before or about the same time as you?','radio'];
		  mod4['25'] = ['q414','Since last ' + sevenDaysAgo + ', do you suspect that you or anybody in your home might have had food poisoning?','radio'];
		  mod4['26'] = ['q415','Since last ' + sevenDaysAgo + ', did you miss work, school, or other daily activities because of any of the symptoms above? If so, how many days in the past week? (Record 0 if no days missed)','text'];
		  mod4['27'] = ['q416','Since last ' + sevenDaysAgo + ', did you seek medical care from a clinic or hospital for any of the symptoms above?','radio'];
		  mod4['28'] = ['q417','Since last ' + sevenDaysAgo + ', did you take medication such as painkillers or antibiotics for any of the symptoms above?','radio'];
		  mod4['29'] = ['q418','Since last ' + sevenDaysAgo + ', did you avoid entering the ocean because of your symptoms?','radio'];
		  mod4['30'] = ['q419','Since last ' + sevenDaysAgo + ', did you avoid entering the ocean because of any illness not covered by the symptoms above?','radio'];

		  var mod5 = {};
		  mod5['0'] = ['q51','What is your gender?','select','Select One,Female,Male'];
		  mod5['1'] = ['q52','What year were you born? (Enter 1900 if declined)','text'];
		  mod5['2'] = ['q53','What is the highest level of education that you have completed?','select','Select One,Less than high school,High school,Trade school/community college/other 2-year college,Bachelor degree or other professional degree (MA/MS/ME/MPH/JD/etc...),Doctoral degree (MD/PhD),Refused,Dont know/not sure'];
		  mod5['3'] = ['q54','Are you currently employed?','radio'];
		  mod5['4'] = ['q55','If you think back to your households income in 2012 which category represents the total combined income of all members of your household reported on last years tax return?','select','Select One,< $10k,$10-15k,$15-25k,$25-35k,$35-50k,$50-75k,$75-100k,$100-150k,> $150k,Would prefer no to say/Refused,Dont know/not sure'];

  var m3cnames = ["q31_1","q31_2","q31_3","q31_4","q31_5","q31_6","q31_7","q32_1","q32_2","q32_3","q32_4","q32_5","q32_6","q32_7","q32_88","q33_1","q33_2","q33_3","q33_4","q33_5","q33_6","q33_7","q33_88","q34_1","q34_2","q34_3","q34_4","q34_5","q34_6","q34_7","q35_1","q35_2","q35_3","q35_4","q35_5","q35_6","q35_7","q36_1","q36_2","q36_3","q36_4","q36_5","q36_6","q36_7","q37_1","q37_2","q37_3","q37_4","q37_5","q37_6","q37_7","q38a_1","q38a_2","q38a_3","q38a_4","q38a_5","q38a_6","q38a_7","q38b_1","q38b_2","q38b_3","q38b_4","q38b_5","q38b_6","q38b_7","q39_1","q39_2","q39_3","q39_4","q39_5","q39_6","q39_7"];

  var choices = [];
  var symptoms = [];

  /* device relate stuff */
        var DEVICEDIR;
        var FILENAME;
        var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        if(deviceType == "iPad"){
                DEVICEDIR = ".";
                FILENAME = "shs.db";
		LOGNAME = "log.db";
        } else if (deviceType == "Android"){
                DEVICEDIR = "/Android/data";
                FILENAME = "/Android/data/shs.db";
                LOGNAME = "/Android/data/log.db";
        }
 /* end device stuff */
  function runEnroll(){
	$('#hfirst').css('visibility','visible');
	$('#intro').css('visibility','visible');
	resizePage('start');
  }

  function runSurvey(m,n){

	// set module on page
	$("#module").text("" + n + "");
	/* get all the keys for module being worked on */
        var getKeys = new Array();
        for(key in m){
           getKeys.push(key);
        }

	/* show first question and corresponding number */
	$("#number").text("" + getKeys[0] + "");
	$("#question").html(m[getKeys[0]][1]);
	var q = getKeys[0];

	/* setup and turn on initial form */
	/* (m[getKeys[0]][2]) - get first form type */
	var type = m[getKeys[0]][2];
	
	/* need to find out if there is more to select */
	if(m[getKeys[0]][2]=='list' || m[getKeys[0]][2]=='select' || m[getKeys[0]][2]=='multi'){
		var menu = m[getKeys[0]][3];
	} else {
		var menu = "";
	}	
	setForm(m,type,menu,q);
	
	/* turn on all listeners */
        $("input[type='radio']").change(function(){
		var ra = $('input[name=radio-view]:checked', '#myradio').val();
                var rq = $('#number').text();
                answer(m,n,rq,ra);
		// reset radio 
                $('#radio-view-a').prop('checked', false);
                $('#radio-view-b').prop('checked', false);
;
        });
	$("#text-btn").click(function(){
               	var ta = $('#text-view').val();
               	var tq = $('#number').text();
      		answer(m,n,tq,ta);
	});
	$("#select-view").change(function(){
               	var sq = $('#number').text();
           	var sa = $('#select-view').val();
		// setTimeout added 13dec13 for ios7 issue with onchange and alert freeze web page
               	setTimeout(function(){ answer(m,n,sq,sa); },10);
	});
	$("#list-view li").click(function(){
		var la = $(this).attr('data-name');
               	var lq = $('#number').text();
               	answer(m,n,lq,la);
	});

	$('#backButton').unbind("click").click( function(e){
		if(backDisable){ return; }
		var modArray=[mod1,mod2,mod3,mod4,mod5];
		var m=modArray[modNum-1];
		doneQCount--;
		var q = prevQuestArray[doneQCount];
		var id = m[q][0];
		totqNum= id[id.length-1].match(/^\d+$/) ? totqNum-2:totqNum; 
		qNum= id[id.length-1].match(/^\d+$/) ? qNum-2:qNum; 
		qNumPer= id[id.length-1].match(/^\d+$/) ? qNumPer-2:qNumPer; 
		donePercent(id);
		prevQuestArray.pop();
		//alert("to_submitPop length-2:"+parseInt(to_submitPop[to_submitPop.length-2]));
		// bug - causing issue with q41 when the answer is no
		// popNum is NaN on first question because to_submitPop.length-2 = -1
		var popNum = parseInt(to_submitPop[to_submitPop.length-1]) - parseInt(to_submitPop[to_submitPop.length-2]);
		to_submitPop.pop();
		var type = m[q][2];
		menu = m[q][3] ? m[q][3]:"";
		
		// remove values added by other
		var to_submit_length = to_submit[to_submit.length - 2];
		if((id == "q28" && to_submit_length == "10") || (id == "q29" && to_submit_length == "10") || (id == "q210a" && to_submit_length == "10") ||  (id == "q211a" && to_submit_length == "1")){
				to_submit.pop();			
		}
		// bug fix 9feb14 - for issue q41 above - loop through and remove 7 no's for 7 days
		if((id == "q41" && to_submit[0] == "2")){
                        for(var j=0;j<7;j++){
                        	to_submit.pop();
                        }
		}
		if(!isNaN(popNum)){
			for(var i=0;i<popNum;i++){
				to_submit.pop();
			}
		} else {
			switch(id[1]){
				case '1':
					to_submit.pop();
					break;
				case '2':
					to_submit.pop();
					break;
				case '3':
					for(var k=0;k<7;k++){
						to_submit.pop();
					}
					break;
				case '4':
					to_submit.pop();
					break;
				case '5':
					to_submit.pop();
					break;
				}
		}
		symptoms.pop();
		menu = (menu === undefined) ? "":menu;
		setForm(m,type,menu,q);
		e.stopPropagation();
		e.preventDefault();	
	});
		
        $("#multi").click(function(){
		if(multiDisable){ return; }
		//need to get all values checked and unchecked to_submit
		genAnswer = [];
                var mq = $('#number').text();
		if(m[mq][2] == 'multi'){
			if(m[mq][0] != 'q32' && m[mq][0] != 'q33' && m[mq][0] != 'q37'){
				var elements = m[mq][3];
				var elementsArray = elements.split(',');
				var fillLength = elementsArray.length;
				var ma = $("input:checkbox");
			} else {
				var ma = $('submit');
			}
		} else if(m[mq][2] == 'radio'){
			fillLength = 1;
			var ma = $('input:radio').not("#myradio input:radio");
		} 
		if(m[mq][0] == 'q32' || m[mq][0] == 'q33' || m[mq][0] == 'q37'){
			ma = multiSelect(m,ma,mq,n);
		} else if(m[mq][2] != 'text' && m[mq][0].match("q3") == "q3" && m[mq][0] != "q39" ){
			ma = multiNonTextDay(m,ma,mq,n,fillLength);
			//ma="";
		} else if(m[mq][2] != 'text'){
			ma = multiNonText(m,ma,mq,n,fillLength);
			//ma="";
		} else if(m[mq][0] == 'q22' || m[mq][0] == 'q23' || m[mq][0] == 'q27a'){
			fillLength = 0;
			ma = multiText(m,ma,mq,n);	
			//ma="";
		} else {
			ma = multiTextDay(m,ma,mq,n,fillLength);	
			//ma="";
		}
                answer(m,n,mq,ma);
        });
  } // end runSurvey

  function setForm(m,t,me,q){
	$('html,body').animate({
                 scrollTop: '0px'
        }, 700);
	// turn off visibility on all form elements
	$('#intro').css('visibility','hidden');
	$('#consent').css('display','none');
	$('#consent').css('visibility','visible'); 
        $('#myinput').css('visibility','hidden');
        $('#text-btn').css('visibility','hidden');
        $('#myinput').css('visibility','hidden');
	$('#multi-text').css('visibility','hidden');
        $('#myradio').css('visibility','hidden');
        $('#myselect').css('visibility','hidden');
        $('#multi-view').css('visibility','hidden');
	$('#multi-view').html('');
	$('#multi-radio').css('visibility','hidden');
        $('#multi').addClass('buttonDisable'); multiDisable = true; $('#multiButtonText').addClass('textDisable')
        $('#backButton').removeClass('buttonDisable'); multiDisable=false; $('#backButtonText').removeClass('textDisable')
	$('#hfirst').css('visibility','visible');
	backDisable = false;
        $('#myinput').css('margin-left','25%');
	$('#myselect').css('margin-left','25%');
	$('#myselect').css('width','50%');
	setTimeout(function(){
	$('#radioLabel-a').removeClass("ui-btn-down-b").addClass("ui-btn-up-b");
	$('#radioLabel-b').removeClass("ui-btn-down-b").addClass("ui-btn-up-b");
	},250);

        var isIOS = ((navigator.userAgent.match(/iPad/i)) == "iPad"  || (navigator.userAgent.match(/iPhone/i))  == "iPhone");
	if(isIOS){
		$('#multi-view').css('width',300);
	}
        // make unique es
        var count = 0;
	// add question to page
        $("#number").text("" + q + "");
    	$("#question").html(m[q][1]);
	$('#one').css('height', '100%');

	
	if(t=='list'){
		$('#list-view').html('');
                $('#mylist').css('visibility','visible');
		var menu = me.split(',');
		$.each(menu, function(key, value){
			$("#list-view").append('<li data-name="'+value+'"><a href="#">'+value+'</a></li>');
		});
		$('#list-view').listview('refresh');
		resizePage('list-view')
	}
        if(t=='multi'){
		if(m[q][0] == 'q39'){
			ref_choices = choices;
			choices = [];
		}
    		var mlists = '';
		var mfields = '';
    		var mlabels = '';
		var mlegends = '';
		// remove any existing checkboxes
		var menu = me.split(',');
                $('#multi-view').css('visibility','visible');
                $('#multi').removeClass('buttonDisable'); multiDisable=false; $('#multiButtonText').removeClass('textDisable')
               if(choices.length > 1 || (m[q][0].match("q3") == "q3" && m[q][0]!='q31' && m[q][0]!='q39')){
                  $.each(choices, function(ckey, cvalue){
				var option_show;
                       		$("#multi-view").append('<b>'+cvalue+'</b>')
				if(m[q][0]!='q37'){
                        		$("#multi-view").append('<form id="multi-form"><fieldset data-role="controlgroup"><select class="selectClass" name="cb'+ckey+'" id="cb'+ckey+'"><input type="text" class="topcoat-text-input--large" placeholder="text for other" id="cbother'+ckey+'" value="text for other" style="visibility: visible;"></form>');
				} else {
                        		$("#multi-view").append('<form id="multi-form"><fieldset data-role="controlgroup"><select class="selectClass" name="cb'+ckey+'" id="cb'+ckey+'"></form>');
				}
				countOut = count;
                        $.each(menu, function(key, value){
				     $('#cb'+ckey+'')
					 .append($("<option></option>")
					 .attr("value",key+1)
					 .text(value)); 
                        	count++;
                        }); //close inner each
                                $("#multi-view").append('<br>');
                        count++;
                  }); //close outer each
                  	$("#multi-view").trigger("create");
                } else {

                  $.each(menu, function(key, value){
			// add by paul to fix placeholders for "Other" 12/3/13
			if(value == 'Other'){
				$("#multi-view").append('<form><fieldset data-role="controlgroup"><input type="checkbox" name="cb'+key+'" id="cb'+key+'" value="'+value+'" /><label  for="cb'+key+'"><span class="cbClass">'+value+'</span></label></fieldset><input type="text" class="topcoat-text-input--large" placeholder="text" value="text" id="other"></form>');
			} else {
				$("#multi-view").append('<form><fieldset data-role="controlgroup"><input type="checkbox" name="cb'+key+'" id="cb'+key+'" value="'+value+'" /><label  for="cb'+key+'"><span class="cbClass">'+value+'</span></label></fieldset></form>');
			}
                  });

		  $("#multi-view").append('</ul>');
		  //$("#multi-view").append('<button id="nosurf" class="topcoat-button">No Surf</button>');
		  if(m[q][0] == 'q31'){
		  	$("#multi-view").append('<form id="nosurfform"><fieldset data-role="controlgroup"><input type="checkbox" name="nosurf" id="nosurf" value="66" /><label for="nosurf"><span class="cbClass">Did not Enter</span></label></fieldset></form>');
			$('#nosurfform').css('visibility','visible'); //hide once clicked
			$("#nosurf").on("click",function(e){
				to_submit.push("2","2","2","2","2","2","2","99","99","99","99","99","99","99","text","99","99","99","99","99","99","99","text","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","99","99","99","99","99","99","99","0","0","0","0","0","0","0","0","0","0","0","0","0","0");
			        /* get all the keys for module being worked on */
			        var getKeys = new Array();
			        for(key in m){
			           getKeys.push(key);
		           	}
				var type = m[getKeys[0]][2];
				var menu = m[getKeys[0]][3];
				var q = "9";
				setForm(m,type,menu,q);
				$('#nosurfform').css('visibility','hidden'); //hide once clicked
			});
		  }
        	  $("#multi-view").trigger("create");
		}
		// took awhile to figure this one out - refresh checkbox to get back styling - id's must be unique
			$('[type="checkbox"]').checkboxradio();
		// try new one
		$("#multi-view").trigger("create");
		resizePage('multi-view')
	}
	if(t=='radio'){
               if(choices.length > 1 || m[q][0] == 'q34' || m[q][0] == 'q35' || m[q][0] == 'q36'){
                $('#multi').removeClass('buttonDisable'); multiDisable=false; $('#multiButtonText').removeClass('textDisable')
			$('#multi-radio').html('');
                  $.each(choices, function(ckey, cvalue){
                        $("#multi-radio").append('<p class="multi-radText"><b>'+cvalue+'</b></p>');
			$("#multi-radio").append('<form> <div style="margin: 0 auto; display: table; width: 19em; position:relative;"><fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" data-mini="true"> <input type="radio" class="radioClass" name="radio-choice-' + count + '" id="radio-choice-' + count + '-a" value="1" /><label class="radioClassLabel" for="radio-choice-' + count + '-a" id="radioLabel-a"><span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-a">Yes</span></span></label><input type="radio" class="radioClass" name="radio-choice-' + count + '" id="radio-choice-' + count + '-b" value="2"  /><label class="radioClassLabel" for="radio-choice-' + count + '-b" id="radioLabel-b"><span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-b">No</span></span></label></fieldset></div> </form>');
                        count++;
                  }); //close .each
                  	$("#multi-radio").trigger("create");
                  	$("#multi-radio").css('visibility','visible');
			resizePage('radio-choice-' + (count-1) + '-a');
                } else {
                $('#myradio').css('visibility','visible');
		if(m[q][4]){
			$('label[for=radio-view-a]').html('<span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-a">SMS</span></span>');
			$('label[for=radio-view-b]').html('<span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-b">Email</span></span>');
		} else {
			$('label[for=radio-view-a]').html('<span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-a">Yes</span></span>');
			$('label[for=radio-view-b]').html('<span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-b"> No  </span></span>');
		}
		if(m[q][0] == 'q15'){
			if (isDevice){
				$('#formImages').append('<img width=95% src="SHS_consent/Consent_Large_Page_1.jpg">');
				$('#formImages').append('<img width=95% src="SHS_consent/Consent_Large_Page_2.jpg">');
				$('#formImages').append('<img width=95% src="SHS_consent/Consent_Large_Page_3.jpg">');
				$('#formImages').append('<img width=95% src="SHS_consent/Consent_Large_Page_4.jpg">');
				$('#formImages').append('<img width=95% src="SHS_consent/Consent_Large_Page_5.jpg">');
				$('#printConsent').css('display','none');

			} else {

				$('#formImages').append('<img width=65% src="SHS_consent/Consent_1.jpg">');
				$('#formImages').append('<img width=65% src="SHS_consent/Consent_2.jpg">');
				$('#formImages').append('<img width=65% src="SHS_consent/Consent_3.jpg">');
				$('#formImages').append('<img width=65% src="SHS_consent/Consent_4.jpg">');

			}
			$('#consent').css('display','inline'); 
			$('#consent').css('visibility','visible'); 
			resizePage('radio-view-a');

			$('label[for=radio-view-a]').html('<span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-a"><small>I Agree</small></span></span>');
			$('label[for=radio-view-b]').html('<span class="ui-btn-inner"><span class="ui-btn-text" id="radio-text-b"><small>No</small></span></span>');

		}

		}
		if(m[q][0] == 'q16'){
			$('#intro').css('visibility','visible'); 
			$("#intro").html('You are eligible to participate in the study. Please continue to the next page, which will describe the details of what the study will involve, the benefits of participating, and will ask you for informed consent should you decide to participate. [Go to web page that includes consent form and maybe an FAQ with answers?  Or a phone number for questions?]');
				}
	}
	if(t=='select'){
		$('#select-view').empty();
		var menu = me.split(',')
		//turn off visibility on radio and text
                $('#myselect').css('visibility','visible');
		if(m[q][0] == 'q55'){
			$('#myselect').css('margin-top','10%');
		}
		if(choices.length > 1){
		  $.each(choices, function(ckey, cvalue){	
			$("#multi-view").append('Value: '+cvalue+'');
              		$.each(menu, function(key, value){
                       		$("#select-view").append($("<option></option").attr("value",key).text(value));
               		});		
		  });
		} else {
              		$.each(menu, function(key, value){
                       		$("#select-view").append($("<option></option").attr("value",key).text(value));
               		});		
		}	
		$('#select-view').selectmenu("refresh");
		resizePage('select-view');
	}
	if(t=='text'){
                $('#text-view').val('');
		//$('#text-view').val('');
		if(m[q][0] == 'q16' || m[q][0] == 'q18'){
			$('#text-view').attr('type','tel');
			$('#text-view').attr('placeholder','999-999-9999');
			$('#text-btn .ui-btn-text').text('Validate');
		}
		if(m[q][0] == 'q17a' || m[q][0] == 'q17b'){
			$('#text-view').attr('type','text');
			$('#text-view').attr('placeholder','user@example.com');
			$('#text-btn .ui-btn-text').text('Submit Email');
		}
		if(m[q][0] == 'q19'){
			$('#text-view').attr('type','number');
			$('#text-view').attr('placeholder','99999');
			$('#text-btn .ui-btn-text').text('Validate');
		}
		if(m[q][0] == 'q21' || m[q][0] == 'q22a' || m[q][0] == 'q22b' || m[q][0] == 'q22c' ){
			$('#text-view').attr('type','number');
			$('#text-view').attr('placeholder','0');
			$('#text-btn .ui-btn-text').text('Submit');
		}
		if(m[q][0] == 'q52'){
			$('#text-view').attr('type','number');
			$('#text-view').attr('placeholder','1900');
			$('#text-btn .ui-btn-text').text('Submit');
		}
		if(m[q][0] == 'q415'){
			$('#text-view').attr('type','number');
			$('#text-view').val('0');
			$('#text-btn .ui-btn-text').text('Submit');
		}
                $('#myinput').css('visibility','visible');
                $('#text-btn').css('visibility','visible');
		$('#multi-text').css('visibility','hidden');
		if(m[q][0] == 'q38a' || m[q][0] == 'q38b'){
 		$("#multi-text").html('');
                  $('#text-btn').css('visibility','hidden');
                  $('#myinput').css('visibility','hidden'); 
		  $('#multi-text').css('visibility','visible');
		  count = 0;
		  $.each(choices, function(ckey, cvalue){	
                  $('#multi').removeClass('buttonDisable'); multiDisable=false; $('#multiButtonText').removeClass('textDisable')
      		  $("#multi-text").append('<b>'+cvalue+'</b> <br><form><fieldset class="ui-grid-a"><div id="leftcell" class = "ui-block-a"><input type="number" name="text-view-multi" id="multi-text-' + count + '" placeholder="0" /></div><div class = "ui-block-b" id="rightcell"><div style="margin: 0 auto; display: table; width: 100%"><fieldset data-mini="true" data-role="controlgroup" data-type="horizontal" data-role="fieldcontain"> <input type="radio" name="time-choice-' + count + '" id="time-choice-' + count + '-a" value="0" /><label id="time-choiceLabel-a" name="timeLabel" for="time-choice-' + count + '-a">A.M.</label><input type="radio" name="time-choice-' + count + '" id="time-choice-' + count + '-b" value="12"  /><label id="time-choiceLabel-b" name="timeLabel" for="time-choice-' + count + '-b">P.M.</label></fieldset></div></div></div></fieldset></form>');
                 count++; 
		  });
		  $('#multi-text').trigger('create');
		} 
		if(m[q][0] == 'q22' || m[q][0] == 'q23'){
		  $("#multi-text").html('');
                  $('#text-btn').css('visibility','hidden');
                  $('#myinput').css('visibility','hidden'); 
		  $('#multi-text').css('visibility','visible');
		  count = 0;
                  $('#multi').removeClass('buttonDisable'); multiDisable=false; $('#multiButtonText').removeClass('textDisable')
       		  $("#multi-text").append('<form> <fieldset class="ui-grid-a"><div id="leftcell" class = "ui-block-a"><input type="number" name="text-view-multi" id="multi-text-' + count + '" placeholder="0" /></div><div class = "ui-block-b" id="rightcell"><div style="margin: 0 auto; display: table; width: 70%"><fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" data-mini="true"> <input type="radio" name="time-choice-' + count + '" id="time-choice-' + count + '-a" value="1" /><label id="time-choiceLabel-a" name="timeLabel" for="time-choice-' + count + '-a"><small>Week</small></label><input type="radio" name="time-choice-' + count + '" id="time-choice-' + count + '-b" value="2"  /><label id="time-choiceLabel-a" name="timeLabel" for="time-choice-' + count + '-b"><small>Month</small></label></fieldset></div><b> x per </b></div></div> <br></fieldset></form>');
		  $('#multi-text').trigger('create');
		  }
		  if(m[q][0] == 'q27a'){
		  $("#multi-text").html('');
                  $('#text-btn').css('visibility','hidden');
                  $('#myinput').css('visibility','hidden'); 
		  $('#multi-text').css('visibility','visible');
		  count = 0;
                  $('#multi').removeClass('buttonDisable'); multiDisable=false; $('#multiButtonText').removeClass('textDisable')
       		  $("#multi-text").append('<form> <fieldset class="ui-grid-a"><div id="leftcell" class = "ui-block-a"><input type="number" name="text-view-multi" id="multi-text-' + count + '" placeholder="0" /></div><div class = "ui-block-b" id="rightcell"> <div style="margin: 0 auto; display: table; width: 70%"><fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" data-mini="true"> <input type="radio" name="time-choice-' + count + '" id="time-choice-' + count + '-a" value="2" /><label id="time-choiceLabel-a" for="time-choice-' + count + '-a"><small>Hours</small></label><input type="radio" name="time-choice-' + count + '" id="time-choice-' + count + '-b" value="1"  /><label id="time-choiceLabel-a" for="time-choice-' + count + '-b"><small>Days</small></label></fieldset></div></div></div> <br></fieldset></form>');
		  $('#multi-text').trigger('create');
		  }
		  resizePage('text-btn');
		$(':input').keypress(function (e) {
		  if (e.which == 13) {
		    return false;
		  }
		});

	}
		centerMultiView();
		if(noBack.indexOf(m[q][0]) != -1){
		  $('#backButton').addClass('buttonDisable');  $('#backButtonText').addClass('textDisable')
		  backDisable = true;
		}

  } // end setForm

function errorCheck(m,n,q,a){
var id = (m[q][0]);
    if((id == 'q28' && a == "10") || (id == 'q210a' && a == "10") || (id == 'q32' && a == "11") || (id == 'q33' && a == "9")){
	   // hide title question and form elements of next question
	   $('#myradio').hide();
	   $('#question').hide();
           $("#popupOther").popup("open");
	   return true;
    }
    if((id == 'q29' && a == 3) || (id == 'q212' && a == 2) || (id == 'q213' && a == 2) || (id == 'q214' && a == 2)){
		q++;
    }
    if((id == 'q11' && a == 2) || (id == 'q12' && a == 2) || (id == 'q13' && a == 2) || (id == 'q14' && a == 2) || (id == 'q15' && a == 2) || (id == 'q16' && a == 2)){
	      to_submit.push("2");
              alert("I'm sorry, but we are only enrolling surfer who speak English, are 18 years or older, are California residents, plan to surf in the next 3 months, and have internet accesss");
	      // send module0 to endSurvy to record data and end enrollment process
	      n = "module0";
	      endSurvey(n);
	      return false;
    } 
    if(id == 'q16' || id == 'q18'){
        if(!validPhone(a)){
              alert("Please enter a valid phone number.");
              return false;
        } else {
	      // remove all non digits dashes, parens, etc...
	      a = a.replace(/\D/g,"");
	}
    }
    if(id == 'q19'){
        if(!validZip(a)){
              alert("You must have a 5 digit zip code!");
              return false;
        } else if ((parseInt(a) > 96162 || parseInt(a) < 90001) && parseInt(a) != 99999){
	      alert("That is not a valid California zip code!");
	      return false;
	}

    }
	if(id == 'q17b'){
		if( to_submit[to_submit.length-1].match(a) == a && a){
			q++;
		} else {
			alert("Your email addresses do not match, please try again");
			q = 7;
			to_submit.pop();
		}
		var type = m[q][2];
		if(type=='list' || type=='select' || type=='multi'){
			var menu = m[q][3];
		} else {
			var menu = "";
		}
    		setForm(m,type,menu,q);
			return false;
        }
	if(id == 'q38a'|| id == 'q38b' || id == 'q22' || id == 'q23'){
		upper = (id == 'q22' || id == 'q23') ? 1:choices.length;
		for (var i=0; i<upper; i++){
			numValue = $('#multi-text-' + i + '').val();
			radioValue = $('[name=time-choice-' + i + ']:checked').val();
			if($.isNumeric(numValue) == false){
				alert('That is not a valid number!');
				return false;
			} else if(parseInt(numValue) < 0){
				alert('The number must be positive!');
				return false;
			}
			if(!radioValue){
				radioMessage = (id == 'q22' || id == 'q23') ? "Please select Week or Month":"Please Select Either A.M. or P.M.";
				return false;
			}
		} 

	}
	if(id == 'q21' || id == 'q27a'|| id == 'q415' || id == 'q52'){
		inText1 = $('#text-view').val();
		inText2 = $('#multi-text-0').val();
		inText3 = $('#multi-text-1').val();
		inText4 = $('#multi-text-2').val();
		inText5 = $('#multi-text-3').val();
		inText6 = $('#multi-text-4').val();
		inText7 = $('#multi-text-5').val();
		inText8 = $('#multi-text-6').val();
		if($.isNumeric(inText1) == false && $.isNumeric(inText2) == false && $.isNumeric(inText3) == false && $.isNumeric(inText4) == false && $.isNumeric(inText5) == false && $.isNumeric(inText6) == false && $.isNumeric(inText7) == false && $.isNumeric(inText8) == false ){
			alert('That is not a valid number!');
			return false;
		}
		inNum1 = ($.isNumeric(inText1) ? parseInt(inText1) : 0);
		inNum2 = ($.isNumeric(inText2) ? parseInt(inText2) : 0);
		inNum3 = ($.isNumeric(inText3) ? parseInt(inText3) : 0);
		inNum4 = ($.isNumeric(inText4) ? parseInt(inText4) : 0);
		inNum5 = ($.isNumeric(inText5) ? parseInt(inText5) : 0);
		inNum6 = ($.isNumeric(inText6) ? parseInt(inText6) : 0);
		inNum7 = ($.isNumeric(inText7) ? parseInt(inText7) : 0);
		inNum8 = ($.isNumeric(inText8) ? parseInt(inText8) : 0);
		if(inNum1<0 ||inNum2<0 ||inNum3<0 ||inNum4<0 ||inNum5<0 ||inNum6<0 ||inNum7<0 ||inNum8<0){
			alert('The number must be positive!');
			return false;
		}
		if(id=='q52' && (inNum1>2000 || inNum1<1900)){
			alert('Please enter a valid birth year');
			return false;
		}

	}
	if(id=='q31' && choices.length == 0){
		alert("Please choose the days in which you surfed");	
		return false;
	}

	if(id=='q34'||id=='q35'||id=='q36'){
		var ma = $('input:radio').not("#myradio input:radio");
		var totalSelected = 0;
		ma.each(function(){
			if($(this).prop("checked")){
				totalSelected++;
			}
		});
		if(totalSelected < choices.length){
		alert("Please Select one answer for each day.");
		return false;
		}
	}

	if(id=='q32'||id=='q33'||id=='q37'){
		var count=0;
		// add select.selectClass below to fix module3 second question alert inescape/app restart major bug
		// calling select alone doesnt seem sufficient - added 17Jan14 by Paul Smith
		//var ma = $('select');
		var ma = $('select.selectClass');
		ma.each(function(){
			if($(this).val() == 1){
				count++;
			}
		});
		if(count != 0){
			alert("Please select an answer for each day.");
			return false;
		}
		return true;
	}
	if(id=='q17a'){
		var emailTest = isValidEmailAddress(a);	
		if(!emailTest){
			alert("Please Enter a Valid Email Address");
			return false;
		}
	}	
	if(id=='q39'){
		var skipDays = [];
		var Out=true;
		var ma = $("input:checkbox");
		ma.each(function(){
			var ch = $(this).prop("checked");
			if (ch && ref_choices.indexOf($(this).val()) != -1){
				alert("You already said you surfed on " + $(this).val() + "");
				Out = false;
				return;
			}
		});
		return Out;
	}
  return true;
} // close errorCheck 

  function answer(m,n,q,a){
	  //alert(to_submit);
	  // future 2.5 request save feature
	    	var id = (m[q][0]);
	    	error = errorCheck(m,n,q,a);
	if(!error){
		return;
	} else if  (id == 'q16' || id == 'q18'){
		a = a.replace(/\D/g,"");
	} 
	// removed if 30jan13 by paul breaks back button on module4 symptoms
	//if(id[id.length-1] != 'g'){
		prevQuestArray[doneQCount] = q;
	//}
	doneQCount++;

	donePercent(id);
    	if((id == 'q41' && a == 2) || (id == 'q42' && a == 2) || (id == 'q43' && a == 2) || (id == 'q44' && a == 2) || (id == 'q45' && a == 2) || (id == 'q46' && a == 2) || (id == 'q47' && a == 2) || (id == 'q48' && a == 2) || (id == 'q49' && a == 2)|| (id == 'q410' && a == 2) || (id == 'q411' && a == 2) || (id == 'q412' && a == 2)){
        	// symptoms.push(1) - causing major issue used for skipping 22jan14
		symptoms.push(1);
		to_submit.push("2","2","2","2","2","2","2","2");
		q++;
    	} else if ((id == 'q27' && a == 3)){
    		// delete this entry - to_submit.push("Question:"+id+"-Answer:"+a+"");
		to_submit.push(a,"0","0");
		q++;
    } else if ((id == 'q29' && a == 2)){
	// a = yes or no 10 fields for beaches plus "other" placeholder
	to_submit.push(a,"2","2","2","2","2","2","2","2","2","2","text");
	q++;
    } else if ((id == 'q22') || (id == 'q23') || (id == 'q26') || (id == 'q27a') || (id == 'q29a') || (id == 'q211a') || (id == 'q212') || (id.match("q3") == "q3")){
        // check to make sure answer isnt an array - should be string
        for(k=0; k<a.length; k++){
                to_submit.push(a[k]);
        }	
	//  if Other is checked submit value in text box and clear
	if(id == "q29a" || id == "q211a"){
		var other_value = $('#other').val();
		to_submit.push(other_value);
	}
    } else if ((id == 'q210' && a == 2)){
	to_submit.push(a,"0","text");
	q++;
    } else if ((id == 'q211' && a == 2)){
	to_submit.push(a,"2","2","2","2","2","2","2","text");
	q++;
    } else if ((id == 'q17' && a == 1)){
	to_submit.push(a,"0");
	q++;
	q++;
	// q415 field type adjusted from boolean to integer - code below was adding commas - 24feb14 by Paul Smith
    } else if((id.match("q4") == "q4") && (id !== "q415")){
	for(var k=0; k<a.length; k++){
		to_submit.push(a[k]);
	}
    } else if((id == 'q28' && a !== "10") || (id == 'q210a' && a !== "10")){
        to_submit.push(a,"text");
    } else {
	to_submit.push(a);
    }
  	q++;
	to_submitPop.push(to_submit.length);
    /* we have gone past last question - now we submit data - and return control panel - need cleanup routine */
    /* match current question to length of associative array */
    if(q>=(Object.keys(m).length)){
	endSurvey(n);
	return;
    }
    // altered 29jan14 by paul
    if(id == 'q412' && (symptoms.length == 12)){
	//endSurvey(n); //-- remove by paul 23jan14
	to_submit.push("2","2","2","2","2","2");
	q++;
	q++;
	q++;
	q++;
	q++;
	q++;
	//return;
    }
    /* setup and turn on initial form */
    var type = m[q][2];
    if(type=='list' || type=='select' || type=='multi'){
    	var menu = m[q][3];
    } else {
	var menu = "";
    }
    //alert("setForm: "+q);
    setForm(m,type,menu,q);
  } // close answer

  function endSurvey(n){
	// append the current modules answers to local log file shs.db - store everything
	// if no connection submit to local db
	to_submit.unshift(SESSIONID);
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	if(n == 'module1'){
	var userGrab = window.localStorage.getItem("users");
	if (userGrab == null){
		window.localStorage.setItem("users", "" + to_submit[6] + "," + to_submit[8] + "");
	} else {
		userGrab = userGrab + "," + to_submit[6] + "," + to_submit[8] + "";
		window.localStorage.setItem("users",userGrab);
	}
	}
	// logging mechanism
	//window.localStorage.setItem(SESSIONID + "_" + n, to_submit);
	//alert("Session: " + SESSIONID + " Module: " + n + " Record: " + to_submit + "");
	to_submit.unshift(USERID);
        to_submit.unshift(deviceType);
        to_submit.unshift(USERAPPVERSION);
        // moved up 6feb14 - check for early exit - save feature
        var to_submit_count = to_submit.length;
          if((n == "module1" && to_submit_count != 14) || (n == "module2" && to_submit_count != 58) || (n == "module3" && to_submit_count != 76) || (n == "module4" && to_submit_count != 107) || (n == "module5" && to_submit_count != 9)){
		exitEarly = true;
          }
        var logStorage = window.localStorage.getItem("logKeys");
        if (logStorage != null){
                logStorage = "" + logStorage +"\n Module: " + n + " Record: " + to_submit + "";
	} else {
		logStorage = "Module: " + n + " Record: " + to_submit + "";
	}
	window.localStorage.setItem("logKeys", logStorage);
	to_submit.shift(); // remove userappversion
	to_submit.shift(); // remove devicetype
	to_submit.shift(); // remove userid
	// end logging
	if(n == "module1"){ 
		USERID = to_submit[6];
		//alert("lsubmit module1: settings USERID:"+USERID);
	}
	if(connectionStatus == "offline" && isDevice){
		//alert("Local Submit: "+to_submit);
		lsubmit(to_submit,n);
	} else if (connectionStatus == "online"){
		// if we have a connection to network send modules answers
		if(n == "module1"){
			//alert("Remote Submit User: "+to_submit);
			//alert("ruser - endSurvey");
			ruser(to_submit,n,"empty");
		} else {
			to_submit.unshift(USERID);
			//alert("Remote Submit Survey: "+to_submit);
			//alert("rsubmit - endSurvey");
			rsubmit("online",n,to_submit,"empty");
		}
	} else {
		alert("Something went massively wrong...contact Paul Smith - 714.755.3205");
	}
	// moved code up do to local save issues - 6feb14
	// new code 29jan14 - check for early exit - save feature
	//alert(to_submit);
	//var to_submit_count = to_submit.length;
	//if((n == "module1" && to_submit_count != 14) || (n == "module2" && to_submit_count != 58) || (n == "module3" && to_submit_count != 76) || (n == "module4" && to_submit_count != 107) || (n == "module5" && to_submit_count != 9)){
	//	exitEarly = true;
	//}
	// if module2 != 14
	// set exitEarly to true
	// clear to_submit array
	// submit data to server
	// clear to_submit
	to_submit = [];
	choices = [];
	symptoms = [];
	// reset question header
	$("#question").html("Surfer Health Survey");
	
	/* remove all event listeners */
	$("input[type='radio']").unbind('change');
	$("#multi").unbind('click');
	$('#select-view').unbind('change');
        $("#text-btn").unbind('click');
	
	$('#myinput').css('visibility','hidden');
	$("#text-btn").css('visibility','hidden');
	$('#multi-view').css('visibility','hidden');
	$('#multi-radio').css('visibility','hidden');
	$('#myinput').css('visibility','hidden'); $('#multi-text').css('visibility','hidden');
	$('#multi-view').css('visibility','hidden'); $('#multi-radio').css('visibility','hidden');
	$('#multi').addClass('buttonDisable'); multiDisable = true; $('#multiButtonText').addClass('textDisable')
	$('#myradio').css('visibility','hidden');
	$('#myselect').css('visibility','hidden');
	$('#myform').css('visibility','hidden');
	// new code 29jan14 - for save feature
	if(exitEarly){
		alert("You are leaving the survey early. We will save your current submission.");
		location.reload();
	}
	if(n == "module0"){
		// needs to be submitted and recorded in database
		location.reload();
	}
	if(n == "module1"){
	  if(isDevice){
	  	  mdevice = window.device.uuid;
	  } else {
		  mdevice = "";
	  }
	  if(mdevice != ""){
	  		// device user - field computer
		if(fieldDevices.indexOf(mdevice) != -1){
			runSurvey(mod3,"module3");		
		} else {
	  		// device user - not field computer
			runSurvey(mod2,"module2");		
		}
	  } else {
	  	// web user
		runSurvey(mod2,"module2");		
	  }
	}
	if(n == "module2"){
		runSurvey(mod5,"module5");		
	}
	if(n == "module3"){
		runSurvey(mod4,"module4");		
	}
	if(n == "module4"){  // move location.reload to rsubmit/lsubmit
		alert("Thank you for your submission! Go surf and come back again next week to submit.");
	}
	if(n == "module5"){
		runSurvey(mod3,"module3");		
		//alert("Thank you! You have completed the SHS enrollment survey.  There is an additional quick survey on your recent ocean exposure and illness history, which we will ask you to complete each week.");
		//location.reload();
	}
  }

     function rsubmit(t,n,s,o){
	//alert(s);
	// may need to be added back in 1:27 10jan paul
	to_submit.unshift(deviceType);
	to_submit.unshift(USERAPPVERSION);
	//var imessage; // not sure if used
	var message = "";
	var rresult = "";
	// qa replace with blank gets rid of number and kills all forward progress
        //$('#qa').html("");
	//if(t == "offline"){ // not sure if used
	//	var splitRecord = s.split('|');
	//	n = splitRecord[0];	
	//	s = splitRecord[1].split(',');
	//}
	 //alert("Submit Module: "+n);
	 //alert("Submit Data: "+s);
	 var url = 'http://data.sccwrp.org/shs/upload4.php';
         message = $.ajax({  
         type: 'GET',  
         url: url,  
         contentType: "application/json",  
         dataType: 'jsonp',  
         data: {ss: s,nn: n},  
         crossDomain: true,  
         timeout: 4000,
         error: function(x,t,m){
                //alert("x: "+x) alert("t: "+t) alert("m: "+m);
                if(t==="timeout"){
			//alert("rsubmit - timeout - module: "+ n + " - submit - "+s);
                        //alert("Data Saved Locally - Server Inaccessible: Contact Paul at SCCWRP 714.755.3205");
			// save data locally rsubmit failed because of network error
			lsave(s,n);
                }
         },
         success: function(data) {  
		//alert("rsubmit - success");
                //alert("Module Confirm: "+data.mconfirm);
		var rerror;
                if(data.mconfirm !== 1){
                        //alert("Module failed to load"+data.merror);
	                // user and module1 data not loaded properly
			//                         // best to mail record
			//rerror = "module failed";
			rerror = data.merror;
	                rmail(n,s,rerror);
	        } else {
		        //alert("Module loaded properly");
			//alert("oldKey: "+o);
		        var current_module = s[3] + "_" + n;
		        //alert("Module to kill: "+current_module);
                        if(o != "empty"){
                             //alert("Remove oldKey: "+o);
                             window.localStorage.removeItem("prevKeys", current_module);
			     //window.localStorage.removeItem(SESSIONID + "_" + n, s);
                        }
			//alert("Successfully submitted locally held data.");
		}
		// remove local storage key once submitted successfully
		// check storage
		//var checkStorage = window.localStorage.getItem("prevKeys");
		//alert(checkStorage);
	        //var checkArray = checkStorage.split(',');
		//var checkNum=checkArray.length;
		//alert("checkArray number of items: "+ checkNum);
		//var howMany = 0;
		/*
                for(var i=0; i<checkNum; i++){
                     //alert("Loop number " +  i + "");
		     var tmpKey = checkArray.pop();
		     var readKey = window.localStorage.getItem(tmpKey);
		     //alert(readKey);
		     if(readKey != null){
			     howMany++;
		     }
		}
		*/
		//alert(howMany);
		//if (howMany === '0'){
			//alert("checkStorage is null remove prevKeys");
			//window.localStorage.removeItem("prevKeys");
		//} else {
			//alert("checkStorage Saved" + checkStorage);
		//}
         },  
         complete: function() {  
        	if(n == "module4"){ 
			location.reload();
		}
         }  
       });  
     }

     function lsubmit(s,n){
		var keyStorage = window.localStorage.getItem("prevKeys");
		if (keyStorage != null){
			//alert("The following sessions are saved " + keyStorage);
			keyStorage = "" + keyStorage +","+ SESSIONID + "_" + n + "";
		} else {
			var keyStorage = "" + SESSIONID + "_" + n + "";
		}
		if (n != 'module1'){ to_submit.unshift(USERID) };
		//alert("Saving the values " + to_submit + " to the key " + SESSIONID + "_" + n + " in the phone's storage.");
		window.localStorage.setItem(SESSIONID + "_" + n, to_submit);
		//alert("Test Pull: " + window.localStorage.getItem(SESSIONID + "_" + n) + "");
		window.localStorage.setItem("prevKeys", keyStorage);
		//window.localStorage.setItem("logKeys", keyStorage);
		// sd card local save
                if(n == "module4"){
                        location.reload();
                }
		alert('No network connectivity, the data will be stored locally until the app is run with network connectivity.');
     } // close lsubmit

     // this function is used when the internet is up but the server to submit to is down data.sccwrp.org
     function lsave(s,n){
	     	// remove userapp and userappversion
	     	s.shift();
	     	s.shift();
		var keyStorage = window.localStorage.getItem("prevKeys");
		if (keyStorage != null){
			//alert("The following sessions are saved " + keyStorage);
			keyStorage = "" + keyStorage +","+ SESSIONID + "_" + n + "";
		} else {
			var keyStorage = "" + SESSIONID + "_" + n + "";
		}
		// to_submit is not available
		if (n === 'module1'){ s.shift() };
		//alert("lsave " + s + " to the key " + SESSIONID + "_" + n + " in the phone's storage.");
		window.localStorage.setItem(SESSIONID + "_" + n, s);
		//alert("Test Pull: " + window.localStorage.getItem(SESSIONID + "_" + n) + "");
		window.localStorage.setItem("prevKeys", keyStorage);
		//window.localStorage.setItem("logKeys", keyStorage);
		alert('Network connectivity to server has failed, the data will be stored locally until the app is able to contact server.');
     } // close lsave

     function rlog(s,f){
         var url = 'http://data.sccwrp.org/shs/logging.php';
         message = $.ajax({
         type: 'GET',
         url: url,
         contentType: "application/json",
         dataType: 'jsonp',
	 data: {ss: s,ff: f},
         crossDomain: true,
         timeout: 4000,
         error: function(x,t,m){
	 	if(t==="timeout"){
	                         alert("Log Data not Submitted - Server Inaccessible: Contact Paul at SCCWRP 714.755.3205");
                }
         },
         success: function(res) {
                        //alert("Your data was submitted successfully!");
         },
         complete: function(data) {
                // dont need to do anything
         }
       });
     }

     function rmail(n,s,r){
         var url = 'http://data.sccwrp.org/shs/mail.php';
         message = $.ajax({
         type: 'GET',
         url: url,
         contentType: "application/json",
         dataType: 'jsonp',
         data: {ss: s,nn: n,rr: r},
         crossDomain: true,
         timeout: 4000,
         error: function(x,t,m){
	 	if(t==="timeout"){
	                         //alert("Log Data not Submitted - Server Inaccessible: Contact Paul at SCCWRP 714.755.3205");
                }
         },
         success: function(res) {
                        //$("#status").append("Your data was submitted successfully!<br>");
         },
         complete: function(data) {
                // dont need to do anything
         }
       });
     }

     function lmail(s){
         var url = 'http://data.sccwrp.org/shs/log.php';
         message = $.ajax({
         type: 'GET',
         url: url,
         contentType: "application/json",
         dataType: 'jsonp',
         data: {ss: s},
         crossDomain: true,
         timeout: 4000,
         error: function(x,t,m){
	 	if(t==="timeout"){
	                         alert("Log Data not Submitted - Server Inaccessible: Contact Paul at SCCWRP 714.755.3205");
                }
         },
         success: function() {
		 alert("Your log has been sent to SCCWRP");
         },
         complete: function(data) {
                // dont need to do anything
         }
       });
     }

     function ruser(s,n,o){
	var rresult = "";
	var u = [];
	var u = [s[6],s[9]];
	USERID = u[0];
	//alert("ruser USERID"+ USERID);
	// may need to be add back in 1:26pm 10jan paul
	to_submit.unshift(USERID);
	to_submit.unshift(deviceType);
	to_submit.unshift(USERAPPVERSION);
	/* data needs to be submitted to shs.db-shortterm and log.db-longterm */
	// n-module s-answers
         //alert("Remote User Module: "+n);
         //alert("Remote User Data: "+s);
	 var url = 'http://data.sccwrp.org/shs/user4.php';
         return $.ajax({  
         type: 'GET',  
         url: url,  
         contentType: "application/json",  
         dataType: 'jsonp',  
         data: {ss: s,nn: n},  
         crossDomain: true,
         timeout: 4000,
         error: function(x,t,m){
         	if(t==="timeout"){
			//alert("ruser - timeout - module: "+ n + " - submit - "+s);
			alert("Attempted to save data to server but timed out. Data stored locally");
			lsave(s,n);
			//alert("Data Saved Locally - Server Inaccessible: Contact Paul at SCCWRP 714.755.3205");
	 	}
	 },
         success: function(data) {  
		//alert("ruser - success");
		//alert("User Confirm: "+data.uconfirm);
		//alert("Module1 Confirm: "+data.m1confirm);
		var rerror;
		if(data.uconfirm !== 1 || data.m1confirm !== 1){
			if(data.uerror == "duplicate"){
				rerror = "duplicate enrollment";	
				//alert("User is already enrolled. Please login with your phone or email.");
			} else {
				rerror = m1error;	
			}	
			//alert("User failed: "+ data.uerror);
			//alert("Module1 failed: "+ data.m1error);
			// user and module1 data not loaded properly
			// best to mail record
			rmail(n,s,rerror);
		} else {
			//alert("User and Module1 loaded properly: ");
			if(o != "empty"){
                        	//alert("Remove oldKey: "+o);
				window.localStorage.removeItem(o);
			}
		}
         },  
         complete: function() {   // complete runs after success
		// dont need to do anything
         }  
       });  
     } // close ruser function

 function validPhone(field){
	if(field.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
		return true;
	}
		return false;	
 }
 function validZip(field){
	if(field.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)){
		return true;
	}
	return false;	
 }
 function loadMap(){
	 $("#restartButton").trigger('create');
  //$(document).ready(function(){  
		url = 'http://feeds.feedburner.com/surfline-rss-surf-report-south-san-diego?format=xml';
		$.ajax({
		type: "GET",
		//url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
		dataType: 'jsonp',
		timeout: 4000,
		error: function(x,t,m){
			if(t==="timeout"){
				//alert("received a timeout");
			}
		},
		success: function(xml){
		        values = xml.responseData.feed.entries;
			for(var i=0;i<16;i++){
			report = xml.responseData.feed.entries[i].title.split(':');
			reportTitle = report.shift();
			ReportName.push(reportTitle);
			ReportCast.push(report);
			}
		}
	    	});
	$('#fMap').css('visibility','hidden');
	$('#fMap').css('display','none');
	setTimeout(function(){
	$('li.ui-btn:nth-child(1) > div:nth-child(1)').removeClass('ui-li');
	$('li.ui-btn:nth-child(2) > div:nth-child(1)').removeClass('ui-li');
	$('li.ui-btn:nth-child(3) > div:nth-child(1)').removeClass('ui-li');
	$('li.ui-btn:nth-child(4) > div:nth-child(1)').removeClass('ui-li');
	var quarterHeight = fullHeight/4;
	$('#landingSurvey').css('height', '' + quarterHeight + 'px');
	$('#landingSurf').css('height', '' + quarterHeight + 'px');
	$('#landingContact').css('height', '' + quarterHeight + 'px');
	$('#landingFAQ').css('height', '' + quarterHeight + 'px');
	},5);
	//Keep footer on bottom
	   var footerHeight = 0,
           footerTop = 0,
           $footer = $("#ffirst");

       positionFooter();

       function positionFooter() {
                footerHeight = $footer.height();
		var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
	if (deviceType != "iPhone") { 
		$('#first').css('visibility','visble');
	}
        var drop = (deviceType == "iPhone") ? /*-59*/3:3;
	

                footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)-drop+"px";
       
                   $footer.css({
                        //position: "absolute"
	           	position: "fixed",
	                bottom: 0,
	                left:0,
	                right:0
		    });
                   //}).animate({top: footerTop},-1)
		   // 2.3 bug add -1 to fix jumpy footer animation - 22jan14 paul
                   //}).animate({top: footerTop},0,'linear')
                
               
       }

       $(window)
               .scroll(positionFooter)
               .resize(positionFooter)
	
       $("#mainPage").click(function(){
		$('#map').css('display','none');
		$('#fMap').css('display','none');
		$('#fMap').css('visibility','hidden');
	
		$("#popupLogin").popup("close");
		$('#landing').css('display','inline');
		$('#first').css('display','none');

		
	});
	$("#mainPage2").click(function(){
		$("#popupLogin").popup("close");
		$('#landing').css('display','inline');
		$('#first').css('display','none');
		$('#FAQdiv').css('display','none');
		$('#one').css('height',fullHeight);
		$('html,body').animate({
                 scrollTop: '0px'
        	}, 0);

	});

	$("#mainPage3").click(function(){
		$("#popupLogin").popup("close");
		$('#landing').css('display','inline');
		$('#first').css('display','none');
		$('#Contact').css('display','none');
		$('html,body').animate({
                 scrollTop: '0px'
        	}, 0);

	});


       $("#enroll").click(function(){
		$("#popupLogin").popup("close");
                $('#ctrl').css('visibility','hidden');
		SESSIONID = +new Date;
		runEnroll();
       }); 
       $("#history").click(function(){
		$('#ctrl').slideToggle('slow');
                $('#qa').css('visibility','visible');
                $('#myform').css('visibility','visible');
		runSurvey(mod2,"module2");
       }); 
       $("#exposure").click(function(){
		$('#ctrl').slideToggle('slow');
                $('#qa').css('visibility','visible');
                $('#myform').css('visibility','visible');
		runSurvey(mod3,"module3");
       }); 
       $("#symptoms").click(function(){
		$('#ctrl').slideToggle('slow');
                $('#qa').css('visibility','visible');
                $('#myform').css('visibility','visible');
		runSurvey(mod4,"module4");
       }); 
       $("#demographics").click(function(){
		$('#ctrl').slideToggle('slow');
                $('#qa').css('visibility','visible');
                $('#myform').css('visibility','visible');
		runSurvey(mod5,"module5");
       }); 
       $("#start").click(function(){
                $('#intro').css('visibility','hidden');
		runSurvey(mod1,"module1");
       });
	
        $("#read").on("click",function(e){
               getRead();
        }); 
        $("#delete").on("click",function(e){
               getDelete();
        }); 
        $("#listdir").on("click",function(e){
               getDir();
        }); 
	$(document).on('click', '#restart', function(e) {
		// get current question
		var m = $('#module').text();
		endSurvey(m);
		location.reload();
	        // on page reload change restart button to save on field tablet 7feb14 - not necessary now
	        //if(fieldDevices.indexOf(window.device.uuid) != -1){
	        //	$("#saveRestartButton").text("Save");
	        //}
        }); 
	$('#resetView').on('click',function(e){
		map.panTo(new L.LatLng(32.771904, 242.746682));
	});
	$('#mapButton').on('click',function(e){
		$('#ffirst').css('display','none');
		$('#fMap').css('visibility','visible');
		$('#fMap').css('display','inline');
		$('#fMap').css('left',0);
		$('#fMap').css('bottom',0);
		$("#popupLogin").popup("close");
                $('#ctrl').css('visibility','hidden');
		$('#map').css('display','inline');
		$('#map').css('visibility','visible');
		map = L.map('map').setView([32.69241, 242.74721], 12);
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);
				/*L.circle([51.508, -0.11], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle.");
		L.polygon([
			[51.509, -0.08],
			[51.503, -0.06],
			[51.51, -0.047]
		]).addTo(map).bindPopup("I am a polygon.");*/
		var popup = L.popup();
		/*function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}
		map.on('click', onMapClick);*/
        }); 
	$(document).on('click', '#otherSubmit', function(e) {
		var tmp_other = $("#other").val();
		to_submit.push(tmp_other);
		$("#popupOther").popup("close");
		$('#question').show();
	        $('#myradio').show();
        }); 
	$(document).on('click', '#restartCancel', function(e) {
		$("#popupDialog").popup("close");
        }); 
	$(document).on('click', '#androidCancel', function(e) {
		$("#popupAndroid").popup("close");
		$("#popupLogin").popup({ history: false });
		$("#popupLogin").popup("open");
		$('#popupLogin').popup('reposition', 'positionTo: window');

        }); 
        $("#chkuser").on("click",function(e){
		getUser();
        }); 
        $("#getlogin").on("click",function(e){
		$("#popupLogin").popup("open");
        }); 
	$("#popupLogin").on({
    		popupbeforeposition: function () {
        	$('.ui-popup-screen').off();
    		}
	});
        $("#login").on("click",function(e){
		// reset button
		$(this).removeClass("ui-btn-active");
		SESSIONID = +new Date;
		getLogin();
        });
	$('#login_input').keypress(function (e) {
	  if (e.which == 13) {
	    $('#login').click();
	    return false;
	  }
	});
        $("#home").on("click",function(e){
		$('#ffirst').css('visibility','visible');
		$('#ctrl').css('visibility','visible');
        }); 
	$("#landingSurvey").on("click",function(e){
		$('#ffirst').css('visibility','visible');
		$('#first').css('visibility','visible');
		$('#hfirst').css('visibility','visible');
		$('#ffirst').css('display','inline');
		$('#first').css('display','inline');
		$('#hfirst').css('display','block');
		positionFooter();
		$('#one').css('visibility','visible');
		$('#one').css('display','inline');
		$('#landing').css('display','none');
		$("#popupLogin").popup("open");
        }); 

	$("#landingFAQ").on("click",function(e){
		$('#landing').css('display','none');
		$('#FAQdiv').css('display','inline');
		$('#FAQdiv').css('visibility','visible');
		resizePage('FAQcontent');
	});
	$("#submit_data").on("click",function(e){
		location.reload();
	});
	$("#field_check").on("click",function(e){
		if(fieldDevices.indexOf(window.device.uuid) != -1){
			alert("Yes this device is a field unit: "+ window.device.uuid);
		} else {
			alert("No this device is not recognized as a field unit.");
		}
	});
	$("#sd_write").on("click",function(e){
		alert("write to sd");
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsSuccess, fail);
                function fsSuccess(fs){
                 if (fs.root.fullPath === 'file:///storage/sdcard0'){
                     fs.root.fullPath = 'file:///storage'; // change the path
                 }
                 // create directory reader
                 var directoryReader = fs.root.createReader()
                 // get a list of all entries in the directory
		 directoryReader.readEntries(dirSuccess,fail);
		}
	        function dirSuccess(entries){
		     alert(entries);
		}
		function dirFail(){
		     alert("failed to read");
		}
	});
	$("#delete_log").on("click",function(e){
		//window.localStorage.clear();
		//$('#diagnostic_log').val("Cleared");
		//alert("All data has been cleared from this device or browser.");
		alert("disabled");
	});
	// modified by paul 21feb14 - added log submit to sccwrp
	$("#submit_log").on("click",function(e){
                var logStorage = window.localStorage.getItem("logKeys");
		var userStorage = window.localStorage.getItem("users");
                if (logStorage != null){
			var newFile = +new Date;
			if(isDevice){
				newFile += "-"+window.device.uuid;	
			}
			//$('#diagnostic_log').val("----- User Storage -----\n"+userStorage+"\n----- Module Storage -----\n"+logStorage);
                	//alert("The following log is saved: " + logStorage);
			//var connectionStatus = navigator.onLine ? 'online' : 'offline';
			//if(connectionStatus != "offline") {
				//alert("Submit to SCCWRP: "+ logStorage);
	                        var logArray = logStorage.split('\n');
				//alert(logArray[0]);
	                        var loopLog=logArray.length;
				newFile += "-"+loopLog;
				//alert(loopLog);
				//alert(newFile);
				//var log_submit = "";
	                        for(var i=0; i<loopLog; i++){
					
					rlog(logArray[i],newFile);

	                        }
				//log_submit += "Hello World";
				//alert(log_submit);
				//$('#diagnostic').html(log_submit);
				//$('#diagnostic_log').val(log_submit);
				//$('#diagnostic_log').append($('#diagnostic').text("My TESt"));
                                //lmail(log_submit);
			//} else {
			//	alert("Your are offline cannot submit.");
			//}
			//*/
			$('#diagnostic_log').val("----- User Storage -----\n"+userStorage+"\n----- Module Storage -----\n"+logStorage);
                } else {
			alert("There is no log file.");	
                }
	});
	$("#landingContact").on("click",function(e){
		$('#landing').css('display','none');
		$('#Contact').css('display','inline');
		$('#Contact').css('visibility','visible');
	});

	$("#landingSurf").on("click",function(e){
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		if (connectionStatus != 'online'){
			alert('You must be online to use the map feature, please connect to a network and try again');
			return;
		}
		$('#landing').css('display','none');
		$('#ffirst').css('display','none');
		$('#fMap').css('visibility','visible');
		$('#fMap').css('display','inline');
		$('#fMap').css('left',0);
		$('#fMap').css('bottom',0);
		$("#popupLogin").popup("close");
                $('#ctrl').css('visibility','hidden');
		$('#map').css('display','inline');
		$('#map').css('visibility','visible');
		map = L.map('map').setView([32.771904, 242.74668], 12);
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);
		L.marker([32.828746, 242.719325]).addTo(map)
			.bindPopup("<b>Windansea</b><br />" + ReportCast[ReportName.indexOf('WINDANSEA ')] + "").openPopup();
		L.marker([32.813788, 242.727917]).addTo(map)
			.bindPopup("<b>Birdrock</b><br />" + ReportCast[ReportName.indexOf('BIRDROCK ')] + "").openPopup();
		L.marker([32.794057, 242.743063]).addTo(map)
			.bindPopup("<b>Pacific beach</b><br />" + ReportCast[ReportName.indexOf('PACIFIC BEACH ')] + "").openPopup();
		L.marker([32.771904, 242.746682]).addTo(map)
			.bindPopup("<b>Mission Beach</b><br />" + ReportCast[ReportName.indexOf('MISSION BEACH ')] + "").openPopup();
		L.marker([32.751839, 242.746854]).addTo(map)
			.bindPopup("<b>Ocean Beach</b><br />" + ReportCast[ReportName.indexOf('OCEAN BEACH, SD ')] + "").openPopup();
		L.marker([32.727039, 242.743728]).addTo(map)
			.bindPopup("<b>Sunset Cliffs</b><br />" + ReportCast[ReportName.indexOf('SUNSET CLIFFS ')] + "").openPopup();
		L.marker([32.804964, 242.737635]).addTo(map)
			.bindPopup("<b>Tourmaline</b><br />" + ReportCast[ReportName.indexOf('OLD MAN\'S/TOURMALINE ')] + "").openPopup();


		/*L.circle([51.508, -0.11], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle.");
		L.polygon([
			[51.509, -0.08],
			[51.503, -0.06],
			[51.51, -0.047]
		]).addTo(map).bindPopup("I am a polygon.");*/
		var popup = L.popup();

	});
	//runSurvey(mod3,"module3");

	//$("#popupLogin").popup("close");
	//$("#popupLogin").remove();
	//login_status = 1;
	//runSurvey(mod3,"module3");
	
	//$("#popupLogin").popup("close");
	//runSurvey(mod3,"module3");
		//$('#login').trigger('click');
	//runSurvey(mod3,"module3");
	/*
	setTimeout(function(){
			$('#login_input').val("IOS@USER");
			$('#login').click();
	}, 1);
	*/
  } // }); - end document.ready

  $("#one").on('pageshow', function(){
	$("#popupLogin").popup({ history: false });
  });

  //function loadLocal (){
  document.addEventListener('deviceready', function () {
	// once device is ready lets check for the existence of sccwrp.db 
	// if sccwrp.db exists check for a network connection and submit each line to upload.php
	//working
	//if (isDevice){
		// get device id - used for field tablets
		deviceID = device.uuid;
		USERAPPVERSION += "-" + deviceID;
		if(fieldDevices.indexOf(deviceID) != -1){
			$('#saveRestartButton').parent().find('.ui-btn-text').text('Save');
		}
		//alert("DeviceID: "+ deviceID);
		var rstatus = "";
		var keyStorage = window.localStorage.getItem("prevKeys");
		if (keyStorage != null){
			//alert(keyStorage); shows data stored on local device
			//alert("The following sessions are saved " + keyStorage);
			var keysArray = keyStorage.split(',');
			var connectionStatus = navigator.onLine ? 'online' : 'offline';
			if(connectionStatus != "offline") {
				var oldKey;
				var loopNum=keysArray.length;
				//alert("should loop " + loopNum + " times");
				for(var i=0; i<loopNum; i++){
					//alert("Loop number " +  i + "");
					oldKey = keysArray.pop();
					var read =  window.localStorage.getItem(oldKey);
					to_submit = read.split(',');
					n = oldKey.split('_')[1];
					//alert(n);
					//alert(to_submit);
					if(n == "module1"){
						//alert('doing a ruser save');
						//alert(to_submit);
						ruser(to_submit,n,oldKey);
					} else {
						//alert('doing a rsubmit save');
						rsubmit("online",n,to_submit,oldKey);
					}
				}
			//window.localStorage.removeItem("prevKeys");
			//alert("Unable to submit data");
			to_submit=[];
				//alert("Successfully submitted locally held data.");
			} else {
				//alert("still offline, can't do anything with this");
				alert('There is local data presently held on this device, it will be held until the app is run with an internet connection.');
			}
		} else {
			//alert('Nothing in local storage');
		}
	isDevice = true;
  }, false);

  document.addEventListener("showkeyboard", function() {
    $("#ffirst").css('display','none');
  }, false);

  document.addEventListener("hidekeyboard", function() {
    $("#ffirst").css('display','inline');
  }, false);

 function multiNonTextDay(m,ma,mq,n,fillLength){
		var to_submit=[];
		//var dayArray = ['Today','Yesterday','Day before yesterday','Three days ago','Four days ago','Five days ago','Six days ago'];
		dayArray = sevenDays();
		var elementCount=0;
		var numChecked=0;
		ma.each(function(index,value){
			elementCount++;
			if($(this).prop("checked") == true){
				genAnswer.push("1");
				if(m[mq][0] == 'q31'){
					choices.push($(this).val());
				}
			}
			if($(this).prop("checked") == false){
				genAnswer.push("2");
			}	
			if(m[mq][0] == 'q34' || m[mq][0] == 'q35' || m[mq][0] == 'q36'){
				var evens = [2,4,6,8,10,12,14,16];
				if( evens.indexOf(elementCount) != -1 ){
					genAnswer.pop();
				}
			}
			
                });
		// submit empty ma to answer since we added above
		if(m[mq][0] != 'q31' && m[mq][0] != 'q39'){
			for (var i=0; i<7; i++){
				var pos = choices.indexOf(dayArray[i]);
					if (pos == -1){
						for (var j=0;j<fillLength;j++){
							to_submit.push("2");
						}
					} else {
						for (var j=0;j<fillLength;j++){
							to_submit.push(genAnswer[0]);
							genAnswer.shift();
						}
					}
			}
		} else {
			for(var j=0;j<7;j++){
				to_submit.push(genAnswer[j]);
			}
			
		}
		return to_submit;
		// add all checkboxes to_submit and send last question/answer to answer routine (expecting one)
  }	


function multiNonText(m,ma,mq,n,fillLength){
		var to_submit=[];
		ma.each(function(index,value){
			if($(this).prop("checked") == true){
				to_submit.push("1");
			}
			if($(this).prop("checked") == false){
				to_submit.push("2");
			}	
			
                });
		// add all checkboxes to_submit and send last question/answer to answer routine (expecting one)
return to_submit;
  }


function multiSelect(m,ma,mq,n){
		var to_submit=[];
		// old day count automated now
		var findDays = sevenDays();
		var count=0;
		var otherStore=[];
		for (var i=0; i<7; i++){
			var pos = choices.indexOf(findDays[i]);
				if (pos == -1){
						to_submit.push("99");
				} else {
						var selectVal = $('#cb' + count + '').val();
						// if user selected Other get input text
						// modified by paul for v1.3
						//alert("Question:"+m[mq][0]+"-Answer:" + selectVal + "");
						if((m[mq][0] == 'q32' && selectVal == '11') || (m[mq][0] == 'q33' && selectVal == '9')){
							var otherVal = $('#cbother' + count + '').val();
							otherStore.push(otherVal);
							to_submit.push(selectVal);
						} else if ((m[mq][0] == 'q32' && selectVal !== '11') || (m[mq][0] == 'q33' && selectVal !== '9')){
							otherStore.push("text");
							to_submit.push(selectVal);
						} else {
							to_submit.push(selectVal);
						}
						count++;
				}
		}
		if(otherStore.length !== 0){
			// added otherStoreJoin on 17Jan14 by Paul Smith - 
			// fix problem with local submit of array with commas
			var otherStoreJoin = otherStore.join(" | ");
			to_submit.push(otherStoreJoin.toString());
		}
		return to_submit;
	}
		// add all checkboxes to_submit and send last question/answer to answer routine (expecting one)
// function to handle q38a and q38b
function multiTextDay(m,ma,mq,n,fillLength){
		var to_submit=[];
	// removed by Paul 17Jan14 - major bug points to original working days not today, yesterday, etc..
	// we call sevenDays function now which gives us proper days
	//var dayArray = ['Today','Yesterday','Day before yesterday','Three days ago','Four days ago','Five days ago','Six days ago'];
	dayArray = sevenDays();
	var maText = ['#multi-text-0','#multi-text-1','#multi-text-2','#multi-text-3','#multi-text-4','#multi-text-5','#multi-text-6'];
			var ma = "";
			$('#multi-radio').html("");
			var maRadio = $("input:radio").not("#myradio input:radio");
			textArray=[];
			radioArray=[];
			for ( l in maText){
				textArray.push($(maText[l]).val());
			};
			maRadio.each(function(index,value){
				if($(this).prop("checked") == true ){
					radioArray.push($(this).val());
				}
			});
			for (var i=0; i<7; i++){
				var pos = choices.indexOf(dayArray[i]);
					if (pos == -1){
							to_submit.push("0");
					} else {
							var timeIn = parseInt(textArray[0]);
							var timeBase = parseInt(radioArray[0]);
							// user input 12 and selected pm
							if(timeIn == 12 || (timeIn > 1200 && timeIn < 1259) && timeBase == 12){
								var standTime = timeIn;
							 
							// user input 12 and selected am
							//} else if(timeIn == 12 || (timeIn > 1200 && timeIn < 1259) && timeBase !== 12){
							//	var standTime = timeIn+1200;

							// user input less than two digits 
							// am only number - pm number + 12
							} else if(timeIn < 99){
								var standTime = timeIn+timeBase;
							}
							// user input more than two digits
							// am number left as is
							else if(timeIn > 99 && timeBase !== 12){
								var standTime = timeIn+timeBase;
							}
							// user input more than two digits
							// pm number + 1200
							else if(timeIn > 99 && timeBase == 12){
								var standTime = timeIn+1200;
							}
							to_submit.push(standTime);
							textArray.shift();
							radioArray.shift();
					}
			}
return to_submit;
}

function multiText(m,ma,mq,n){
		var to_submit=[];
			var inputVal = $('#multi-text-0').val();
			var radioVal = $("[name=time-choice-0]:checked").val();
			to_submit.push(inputVal);
			to_submit.push(radioVal);
			return to_submit;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

  function getLogin(){
	var result;
	var login = $('#login_input').val();
	// remove all non digits dashes, parens, etc...
	if( !login ){ 
			alert("Login Failed - A phone or email address is required for login");
			return;
	}
        login = login.match("@") ? login:login.replace(/\D/g,"");
	// no fake login 
	if( login === "9999999999" || login === "0"){
			alert("Please use the telephone or email address you originally enrolled with (999-999-9999 or 0 not valid).");
			return;
	}
	USERID = login;
	$("#popupLogin").popup("close");

	// checkUser goes here to test for local user.db if it exists dont have to login remotely
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	if (connectionStatus == 'online'){
		var log = localLogin(login,'online');
		if(log != 'in'){
			remoteLogin(login);
		}
	} else {
		localLogin(login,'offline');
	}

  }
  function getUser(){
        /* check for the existence of user.db */
        var found;
        var recordLines = new Array();
  }

  function donePercent(id){
	modLengths = [10,13,11,20,6];
	modLabels = ['Eligibility (%):','History (%):','Exposure (%):','Symptoms (%):','Demographics (%):','Demographics (%):'];
	modNum = id[1];		
	totLength = (modNum == 1 || modNum == 2 || modNum == 5) ? 25:29;
	modQuestions = modLengths[modNum-1]-1;
	if(id[id.length-1].match(/^\d+$/) || id=='q38a' || id=='q38b'){
		//qNum = modNum == prev_modNum ? qNum+1:1;
		if(modNum == prev_modNum){
			qNum++;
			qNumPer++;
		} else {
			qNum=0;
			qNumPer=1;
			prevQuestArray=[0];
			doneQCount = 1;
			to_submitPop=[];
		}
		totqNum++;
	}
	var modPercentDone = qNumPer/modQuestions; 
	var totPercentDone = totqNum/totLength;
	if(modPercentDone*100 == 100 && modNum != 2){
		mLabel = modLabels[modNum];
	} else if(modPercentDone*100 == 100){
		mLabel = modLabels[4];
	} else {
		mLabel = modLabels[modNum-1];
	}
	$('#modLabel').html('<p>' + mLabel + '</p>');
	$('#fullLabel').html('<p> Total (%): </p>');
	$('#Modprogress-bar').val(modPercentDone*100 == 100 ? 0:modPercentDone*100);
     	$('#Modprogress-bar').slider('refresh');
	$('#Fullprogress-bar').val(totPercentDone*100) // == 100 ? 0:totPercentDone*100);
     	$('#Fullprogress-bar').slider('refresh');
	prev_modNum = modNum;
}
function resizePage(formName){
	var multiBottom = $('#'+formName).offset().top+$('#'+formName).height();
	var viewBottom = $('#one').height()-$('#ffirst').height();
	var minHeight = "" + (multiBottom + 400) + "px";
	var oneHeight = (multiBottom > viewBottom) ? minHeight:("" + $('body').height() + "px");
	//$('#one').css('height',oneHeight);
	// 2.3 major bug on question q38b exit water page not scrollable - 22jan14 paul
	if(formName == 'text-btn'){
		$('#one').css('height',1024);
	} else {
		$('#one').css('height',oneHeight);
	}
}
function sevenDays(){
	var dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var d=new Date;
	var dNum = d.getDay();
	var lastDays = ['Today','Yesterday'];
	for(i=5;i>0;i--){
	    lastDays.push(dayArray[(dNum+i)%7]);
	}	
	return lastDays;
}
function centerMultiView(){
        var isIOS = ((navigator.userAgent.match(/iPad/i)) == "iPad"  || (navigator.userAgent.match(/iPhone/i))  == "iPhone");
	var subAmount = isIOS ? 150:150;
	var fullWidth = $('html').width();
	var leftAmount = fullWidth/2-subAmount;
	$('#multi-view').css('left','' + leftAmount + 'px');
	var S = 360*11/fullWidth;
	$('.ui-select').css('left','' + S + '%');
}

function remoteLogin(login){
	// adjusted 24feb14
	var login_url = 'http://data.sccwrp.org/shs/login5.php';
         $.ajax({
         type: 'GET',
         url: login_url,
         contentType: "application/json",
         dataType: 'jsonp',
         data: {ll: login},
         crossDomain: true,
	 timeout: 4000,
         error: function(x,t,m){
                if(t==="timeout"){
                          alert("Couldn't connect to login server. You must enroll before you can login locally.");
			  $("#popupLogin").popup("open");
                }
         },
         success: function(res) {
		// 9feb14 - changed login around to account for duplicate enrollments
		//alert("Confirm: "+res.confirm);
		//exit;
		if(!res.error == "undefined"){
			//alert("Something went massively wrong logging in!");
		}
		//if(res.history2 >= 1 || res.history5 >= 1 || res.staging >= 1){
			//historyModules.push({name:'hmodule2',record:'',type:'history'});
			//if(res.history5 >= 1){
			//	alert("Need to complete module5");
				//historyModules.push({name:'hmodule5',record:'',type:'history'});
			//}
			//alert("historyModules: "+historyModules);
			//alert("historyModules length: "+historyModules.length);
			// if user hasnt completed module 2 and 5 - start them at 2 - then follow regular course
			//if(historyModules.length == 2 && historyModules[0] == "hmodule2" && historyModules[1] == "hmodel5"){
			//if(historyModules.length == 2){
				//alert("time to run survey");
				//runSurvey(mod2,"module2");
				// reset orderModules array to empty
				//historyModules = [];
				//return;
			//}
		// 9feb13 changed res.confirm != 1 to res.confirm >= 1 - for duplicate enrollments
		if(res.confirm >= 1){
			// login confirmed
			login_status = 1;
			if(res.history < 1){
				alert(res.history);
				alert("Please complete a complete a couple of questions before continuing on to the weekly survey.  Thank you!");
				runSurvey(mod2,"module2");
				return;
			} else {
				//alert("regular routine called");
				runSurvey(mod3,"module3");
			}
		} else if(res.confirm == 0){
			alert("Login Failed - Please resubmit or enroll");
			$("#popupLogin").popup("open");
		} else {
			//alert("Something wrong logging in!");
		}	
         }, 
         complete: function(data) {
                // dont need to do anything
         } 
       }); 
}
function localLogin(login,link){
	var userGrab = window.localStorage.getItem("users");
	if (userGrab != null){
		var userArray = userGrab.split(",");
		if (userArray.indexOf(login) != -1){
			login_status = 1;
			runSurvey(mod3,"module3");
			return 'in';
		} else if (link == 'offline') {
			alert("Login Failed - Please resubmit or enroll");
			$("#popupLogin").popup("open");
		}
	//} else { added by paul causes other issues - 2.2
	//	alert("Please enroll before attempting to login.");
	//	$("#popupLogin").popup("open");
	}
	return 'out';
  }
  loadMap();
