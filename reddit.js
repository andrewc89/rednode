var request = require("request");

function Reddit () {
	this.userAgent = "node.js api wrapper - https://github.com/theyshookhands/rednode";
	this.cookie = "";
	this.uh = "";
	this.username = "";
	
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

	this.assignCookies = function (body) {
		var response = JSON.parse(body);
    this.uh = response["json"]["data"]["modhash"];
    this.cookie = response.json.data.cookie;
    console.log("rednode --> logged in as: " + this.username);
	};
}

Reddit.prototype = {
	
	login: function (username, password, callback) {
		var data = {
			"user": username,
			"passwd": password,
			"rem": false
		};
		var self = this;
		console.log(self.userAgent);
		this.username = username;
		this.post("http://www.reddit.com/api/login", data, function (body) {
			var response = JSON.parse(body);
			console.log(self.userAgent);
		  self.uh = response["json"]["data"]["modhash"];
		  self.cookie = response.json.data.cookie;
		  console.log("rednode --> logged in as: " + username);
			callback();		
		});
	},

	postLink: function (sr, title, url, callback) {
    var data = {
      "kind": "link",
      "sr": sr,
      "title": title,
      "url": url
    };
    this.post("http://www.reddit.com/api/submit", data, callback);
  }

};

module.exports = Reddit;







