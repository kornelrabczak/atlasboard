module.exports = function (config, dependencies, job_callback) {
	var async = require('async');
	var logger = dependencies.logger;
	var moment = dependencies.moment;
	var _ = dependencies.underscore;

	function getBuildInfos (build, callback) {
	
        var options = {
            url: config.serverUrl + '/job/' + build + '/lastBuild/api/json',
            rejectUnauthorized: false,
            headers: {
                "Content-Type": "application/json"
            }
        };
        
        dependencies.easyRequest.JSON(options, function (error, rawBuildData) {
            var buildTime = moment(rawBuildData.timestamp);
            if (config.lang) {
                buildTime = buildTime.lang(config.lang)
            }

            var result = rawBuildData.result; 
            if (!result) {
                result = "inprogress"
            }

            var author = "";
            var msg = "";
            if (rawBuildData.changeSet.items.length > 0) {
                author = rawBuildData.changeSet.items[0].author;
                msg = rawBuildData.changeSet.items[0].msg;
            }

            var buildData = {
                fullName: rawBuildData.fullDisplayName,
                timeAgo: buildTime.fromNow(),
                result: result.toLowerCase(),
                author: author,
                msg: msg
            };

            callback(error, buildData);
        });
    };
	
	async.map(config.jobs, getBuildInfos, function (err, lastBuildsInfos) {
	    var data = {
	       	builds: lastBuildsInfos
	    };

		return job_callback(err, data);
	});
	
};
