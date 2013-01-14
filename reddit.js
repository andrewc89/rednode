
/*
 *
 *
 */

var request = require("request");
var subreddit = require("./subreddit").subreddit;

var reddit = (function () {

  var self = this,
      userAgent = "node.js api wrapper - https://github.com/theyshookhands/rednode",
      debug = false;

  function reddit () {
    this.cookie = "";
    this.uh = "";

    function getJSON (url, data, callback) {
      data["api_type"] = "json";
      request(url, { qs: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        }
      });
    };

    function post (url, data, callback) {
      data["api_type"] = "json";
      if (self.cookie) {
        request.cookie(self.cookie);
        console.log("cookie assigned");
      }
      if (self.uh) {
        data["uh"] = self.uh;
        console.log("uh assigned");
      }
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        }
      });
    };
  }

  reddit.prototype.login = function (username, password, callback) {
    var data = {
      "user": username,
      "passwd": password,
      "rem": false
    };

    this.post("http://www.reddit.com/api/login", data, function (body) {
      var response = JSON.parse(body);
      reddit.uh = response["json"]["data"]["modhash"];
      reddit.cookie = response.json.data.cookie;
      console.log("rednode --> logged in as: " + username);
      callback();
    });
  };

  reddit.prototype.setUserAgent = function (userAgent) {
    this.userAgent = userAgent;
  };

  reddit.prototype.r = function (name, callback) {
    var sr = new subreddit(name);
    if (callback) {
      sr.exec(callback);
    }
    return sr;
  };

  reddit.prototype.postLink = function (sr, title, url, callback) {
    var data = {
      "kind": "link",
      "sr": sr,
      "title": title,
      "url": url
    };
    this.post("http://www.reddit.com/api/submit", data, callback);
  };

  return reddit;

})();

exports.reddit = reddit;

