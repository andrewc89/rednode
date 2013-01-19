
# rednode

## Usage

```javascript
  var Reddit = require("./reddit");
  var reddit = new Reddit();
  reddit.setUserAgent("<your user agent>");
  reddit.login("username", "password", function () {
		reddit.postLink("redditdev", "node.js reddit api wrapper", "https://github.com/theyshookhands/rednode", function (body) {
			console.log(body);
		});
	});
```

## Dependencies

https://github.com/mikeal/request/
