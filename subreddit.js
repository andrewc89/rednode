var request = require("request");

function Subreddit (subreddit) {
  this.subreddit = subreddit;
}

var filters = [ "hot", "new", "controversial", "top" ];

filters.forEach(function (filter) {
  Subreddit.prototype[filter] = function (callback) {
    if (this.filter) {
      throw "Only one filter can be applied to the subreddit";
    }
    this.filter = filter;
    if (callback) {
      this.exec(callback);
    }
    return this;
  };
});

Subreddit.prototype.exec = function (callback) {
  if (!this.filter) {
    this.filter = filters[0];
  }
  var url = "http://reddit.com/r/" + this.subreddit + "/" + this.filter + ".json";
  request.get(url, function (error ,response, body) {
    callback(body);
  });
}

module.exports = Subreddit;
