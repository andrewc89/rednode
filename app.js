

var Reddit = require("./reddit");
var reddit = new Reddit();

reddit.login("GrammarNazism", "wazzup2", function () {
  //reddit.postSelf("testjswrapper", "testing rednode", "blah blah blah", function (body) {
    //console.log(body);
  //});
  reddit.r("testjswrapper", function (body) {
    console.log(body);
  }).top();
});
