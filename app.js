

var Reddit = require("./reddit2");
var reddit = new Reddit();

reddit.login("testjswrapper", "testjswrapper", function () {
  reddit.postLink("testjswrapper", "testing rednode", "https://github.com/theyshookhands/Reddit", function (body) {
    console.log(body);
  });
});
