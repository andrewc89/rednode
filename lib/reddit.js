
/*
 *
 *
 */

var request = require("request");

var reddit = function () {

  var self = this,
      userAgent = "node.js api wrapper by /u/GrammarNazism",
      debug = false,
      uh = "",
      cookie = "";

  self.getJSON = function (url, callback) {
    data["api_type"] = "json";
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  };

  self.post = function (url, data, callback) {
    data["api_type"] = "json";
    request.post(url, { form: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  };

};


reddit.prototype = {

  login: function (username, password) {
    var data = {
      "user": username,
      "passwd": password,
      "rem": false
    };

    this.post("http://www.reddit.com/api/login", data, function (body) {
      var response = JSON.parse(body);
      this.uh = response["json"]["data"]["modhash"];
      this.cookie = response.json.data.cookie;
    });
  }

}

exports.reddit = reddit;

