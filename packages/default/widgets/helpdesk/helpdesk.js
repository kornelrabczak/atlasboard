widget = {
	//runs when we receive data from the job
	onData: function (el, data) {
		var html = '<h2>HELPDESK</h2>';
		
		$.each(data.tasks, function (index, task) {
			var styleCss = "error";
			if (task.type == "awaria") {
				styleCss = "failure";
			}

			html += '<div class="helpdesk helpdesk-' + styleCss + '">' 
				+ '<div>' + task.title + '</div>'
				+ ' <div class="helpdesk-info">by ' + task.author + ' - (' + task.project + ')</div>'
			 + '</div>';
		});

		$('.content', el).html(html);
	},
	onError: function (el, data) {
		var $error = $('<div class="container"><img src="images/warning.png"></div>');
		$error.append($('<div class="error_message content"></span>').text(data.error));
		$('.error', el).empty().append($error);
	}
};