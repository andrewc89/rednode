
# rednode

## Usage

#### Initial

```javascript
  var Reddit = require("./reddit");
  var reddit = new Reddit();
  reddit.setUserAgent("<your user agent>");
  reddit.login("username", "password", function () {
    // do something...
  });
```

#### Subreddit

```javascript
  reddit.r("redditdev", function (error, response, body) {
    console.log(body);
  });
```
```javscript
  reddit.r("redditdev").top().exec(function (error, response, body) {
    console.log(body);
  });
```

#### Posting

```javascript
  reddit.postLink("redditdev", "Node.js reddit api wrapper", "https://github.com/theyshookhands/rednode", function (body) {
    console.log(body);
  });
```

```javascript
  reddit.postSelf("redditdev", "My experience with rednode", "rednode is the best!", function (body) {
    console.log(body);
  });
```

## Dependencies

https://github.com/mikeal/request/
