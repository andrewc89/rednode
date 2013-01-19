

var Reddit = require("./reddit2");
var reddit = new Reddit();

reddit.login("GrammarNazism", "wazzup2", function () {
  reddit.postLink("testjswrapper", "testing rednode", "https://github.com/theyshookhands/rednode", function (body) {
    console.log(body);
  });
});
