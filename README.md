
# rednode

## Install

<pre>
  git clone git://github.com/theyshookhands/rednode.git
</pre>

## Usage

<pre>
  var rednode = require("./reddit").reddit;
  var reddit = new rednode();
  reddit.setUserAgent("<your user agent>");
  reddit.login("username", "password");
</pre>

## Dependencies

https://github.com/mikeal/request/
