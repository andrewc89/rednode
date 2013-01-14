

var rednode = require("./reddit").reddit;
var reddit = new rednode();

reddit.login("GrammarNazism", "wazzup2", function () {
  reddit.postLink("testjswrapper", "testing rednode", "https://github.com/theyshookhands/rednode", function (body) {
    console.log(body);
  });
});
