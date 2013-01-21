

var Reddit = require("./reddit");
var reddit = new Reddit();

reddit.login("testjswrapper", "testjswrapper", function () {
  reddit.r("testjswrapper").top().exec(function (body) {
    console.log("body: " + body);
  });
});
