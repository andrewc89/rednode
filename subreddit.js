
var request = require("request");

function subreddit (name) {
  this.name = name;
}

var filters = ["hot", "new", "controversial", "top"];

filters.forEach(function (filter) {
  subreddit.prototype[filter] = function (cb) {
    if (this.filter) throw "Only one filter can be applied to a subreddit";
    this.filter = filter;
    if (cb) {
      this.exec(cb);
    }
    return this;
  };
});

subreddit.prototype.exec = function (cb) {
  var url = "http://www.reddit.com/r/" + this.name + "/" + this.filter + ".json";
  request.get(url, cb);
}

exports.subreddit = subreddit;
