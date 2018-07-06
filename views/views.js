var intro = {
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in this study. In this study, you will rate a list of items. This rating will take at most five minutes.",
    // introduction's slide proceeding button text
    "buttonText": "Go to instructions",
    // render function renders the view	
    render: function() {
        
        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
}

var instructions = {
     // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "On the next page you will find a list of items. Each item will describe something that a person might know.", 
	"text1": "For each item, please rate how embarrassed you think you would be if someone asked you to explain that item and it turned out that you did not have a good understanding or knowledge of that item.",
	"text2": "You will rate the items on a 7-point scale like the one below:",
	"text3": "not at all embarrassed <1	2	3	4	5	6	7> very embarrassed",
	"text4": "“1” on the scale means “I would not be at all embarrassed if it turned out that I did not have a good understanding or knowledge of this item.”",
	"text5": "“7” on the scale means “I would be very embarrassed if it turned out that I did not have a good understanding or knowledge of this item.”",
	
    // instuction's slide proceeding button text
    "buttonText": "Go to the survey",
    render: function() {

        viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
			text1: this.text1,
			text2: this.text2,
			text3: this.text3,
			text4: this.text4,
			text5: this.text5,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

    },
    trials: 1
}


var main = {
	
	trials : 1,
	
    render : function(CT) {
		var questions = _.shuffle(exp.trial_info.main_trials[CT].questions)

		// fill variables in view-template
         var viewTemplate = $('#main-view').html();
         $('#main').html(Mustache.render(viewTemplate, {
			 reminder: exp.trial_info.main_trials[CT].reminder,
			 q1 : questions[0],
			 q2 : questions[1],
			 q3 : questions[2],
			 q4 : questions[3],
			 q5 : questions[4],
			 q6 : questions[5],
			 q7 : questions[6],
			 q8 : questions[7],
			 q9 : questions[8],
			 q10 : questions[9],
			 q11 : questions[10],
			 q12 : questions[11],
			 
         }));
		var q1;
		var q2;
		var q3;
		var q4;
		var q5;
		var q6;
		var q7;
		var q8;
		var q9;
		var q10;
		var q11;
		var q12;
		
		$('input:radio').click(function() {
		q1 = questions[0]
		answer1 = $('input:radio[name=q1]:checked').val();
		q2 = questions[1]
		answer2 = $('input:radio[name=q2]:checked').val();
		q3 = questions[2]
		answer3 = $('input:radio[name=q3]:checked').val();
		q4 = questions[3]
		answer4 = $('input:radio[name=q4]:checked').val();
		q5 = questions[4]
		answer5 = $('input:radio[name=q5]:checked').val();
		q6 = questions[5]
		answer6 = $('input:radio[name=q6]:checked').val();
		q7 = questions[6]
		answer7 = $('input:radio[name=q7]:checked').val();
		q8 = questions[7]
		answer8 = $('input:radio[name=q8]:checked').val();
		q9 = questions[8]
		answer9 = $('input:radio[name=q9]:checked').val();
		q10 = questions[9]
		answer10 = $('input:radio[name=q10]:checked').val();
		q11 = questions[10]
		answer11 = $('input:radio[name=q11]:checked').val();
		q12 = questions[11]
		answer12 = $('input:radio[name=q12]:checked').val();
		
				
		// provide plus minus arrows next to each answer to indicate deviation from average
	});
		
		// update the progress bar
        var filled = CT * (180 / exp.views_seq[exp.currentViewCounter].trials);
        $('#filled').css('width', filled);

        // event listener for buttons; when an input is selected, the response
		// and additional information are stored in exp.trial_info
		$('#next').on('click', function(e) {
            trial_data = {
                trial_type: "main",
                q1: q1,
				answer1: answer1,
				q2: q2,
				answer2: answer2,
				q3: q3,
				answer3: answer3,
				q4: q4,
				answer4: answer4,
				q5: q5,
				answer5: answer5,
				q6: q6,
				answer6: answer6,
				q7: q7,
				answer7: answer7,
				q8: q8,
				answer8: answer8,
				q9: q9,
				answer9: answer9,
				q10: q10,
				answer10: answer10,
				q11: q11,
				answer11: answer11,
				q12: q12,
				answer12: answer12,			
                       
            };
			
			exp.trial_data.push(trial_data);
            exp.findNextView();
        });
		
		
    }
};

var postTest = {
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
}