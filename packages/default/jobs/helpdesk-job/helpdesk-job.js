/**
 * Job: helpdesk-job
 *
 */

module.exports = function(config, dependencies, job_callback) {
    var cvsParser = require('babyparse');
    var options = {
        url: config.cvsResource
    };

    dependencies.request(options, function (error, response, body) {
        var tasks = [];
        if (!error && response.statusCode == 200) {
            var csv = body;
            var parsed = cvsParser.parse(csv);

            if (parsed.data != null && parsed.data.length > 0) {
                for (var i = parsed.data.length - 1; i >= 0; i--) {
                    if (parsed.data[i].length < 4) {
                        continue;
                    }

                    tasks[i] = {
                        title: parsed.data[i][1],
                        type: parsed.data[i][2].toLowerCase(),
                        author: parsed.data[i][3],
                        project: parsed.data[i][4]
                    }
                };
            }
        }

        job_callback(error, { title: "jakis tytul", tasks: tasks });
    });
};
