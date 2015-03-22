widget = {
	//runs when we receive data from the job
	onData: function (el, data) {
		var html = '<h2>BUILDS</h2>';
		
		$.each(data.builds, function (index, build) {
			html += '<div class="build build-' + build.result + '">' 
				+ '<div>' +build.fullName + ' <span class="build-time">' + build.timeAgo + '</span></div>'
				+ ' <div class="build-info">Updated by ' + build.author.fullName + ' - (' + build.msg + ')</div>'
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