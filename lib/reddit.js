
var request = require("request");
var Subreddit = require("./subreddit");

function Reddit () {
  this.userAgent = "node.js api wrapper - https://github.com/theyshookhands/rednode";
  this.cookie = "";
  this.uh = "";

  this.getJson = function (url, data, callback) {
    data["api_type"] = "json";
    request(url, { qs: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  };

  this.post = function (url, data, callback) {
    data["api_type"] = "json";
    if (this.cookie) {
      request.cookie(this.cookie);
    }
    if (this.uh) {
      data["uh"] = this.uh;
    }
    request.post(url, { form: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  };
}

Reddit.prototype = {

  domain: "http://www.reddit.com",

  login: function (username, password, callback) {
    var data = {
      "user": username,
      "passwd": password,
      "rem": false
    };
    var self = this;
    this.post(this.domain + "/api/login", data, function (body) {
      var response = JSON.parse(body);
      self.uh = response["json"]["data"]["modhash"];
      self.cookie = response.json.data.cookie;
      console.log("rednode --> logged in as: " + username);
      callback();
    });
  },

  setUserAgent: function (userAgent) {
    this.userAgent = userAgent;
  },

  postLink: function (sr, title, url, callback) {
    var data = {
      "kind": "link",
      "sr": sr,
      "title": title,
      "url": url
    };
    this.post(this.domain + "/api/submit", data, callback);
  },

  postSelf: function (sr, title, text, callback) {
    var data = {
      "kind": "self",
      "sr": sr,
      "title": title,
      "text": text
    };
    this.post(this.domain + "/api/submit", data, callback);
  },

  comment: function (thing, text, callback) {
    var data = {
      "thing_id": thing,
      "text": text
    };
    this.post(this.domain + "/api/comment", data, callback);
  },

  r: function (subredditName, callback) {
    var subreddit = new Subreddit(subredditName);
    if (callback) {
      subreddit.exec(callback);
    }
    return subreddit;
  }

};

module.exports = Reddit;
