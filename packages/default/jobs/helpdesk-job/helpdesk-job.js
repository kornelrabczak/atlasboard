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
        if (!error && response.statusCode == 200) {
            var csv = body;
            var parsed = cvsParser.parse(csv);
            console.log(parsed.data);
        }

        var task = {
            type = "".toLowerCase(),
            author = ""
        }

        job_callback(error, { title: "jakis tytul", text: "dupa dupa" });
    });
};
