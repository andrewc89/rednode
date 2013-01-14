
/*
 *
 *
 */

var request = require("request");
var subreddit = require("./subreddit").subreddit;

var reddit = function () {

  var self = this,
      userAgent = "node.js api wrapper - https://github.com/theyshookhands/rednode",
      debug = false,
      cookie = "",
      uh = "";  

  self.getJSON = function (url, data, callback) {
    data["api_type"] = "json";
    request(url, { qs: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  };

  self.post = function (url, data, callback) {
    console.log("in post");
    console.log("cookie: " + self.cookie);
    console.log("uh: " + self.uh);
    data["api_type"] = "json";
    if (self.cookie) {
      request.cookie(self.cookie);
      console.log("cookie assigned");
    }
    if (self.uh) {
      data["uh"] = self.uh;
      console.log("uh assigned");
    }
    console.log("requesting");
    request.post(url, { form: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("no errors");
        callback(body);
      }
    });
  };

};

reddit.prototype = {

  login: function (username, password, callback) {
    var data = {
      "user": username,
      "passwd": password,
      "rem": false
    };

    this.post("http://www.reddit.com/api/login", data, function (body) {
      var response = JSON.parse(body);
      this.uh = response["json"]["data"]["modhash"];
      this.cookie = response.json.data.cookie;
      console.log("rednode --> logged in as: " + username);
      callback();
    });
  },

  setUserAgent: function (userAgent) {
    this.userAgent = userAgent;
  },

  r: function (name, callback) {
    var sr = new subreddit(name);
    if (callback) {
      sr.exec(callback);
    }
    return sr;
  },

  postLink: function (sr, title, url, callback) {
    var data = {
      "kind": "link",
      "sr": sr,
      "title": title,
      "url": url
    };
    console.log("calling post");
    this.post("http://www.reddit.com/api/submit", data, callback);
  }

}

exports.reddit = reddit;

