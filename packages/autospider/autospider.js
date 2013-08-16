var fs = Npm.require('fs');
var child_process = Npm.require('child_process');
var querystring = Npm.require('querystring');
var urlParser = Npm.require('url');

Spiderable = {};

// list of bot user agents that we want to serve statically, but do
// not obey the _escaped_fragment_ protocol. The page is served
// statically to any client whos user agent matches any of these
// regexps. Users may modify this array.
Spiderable.userAgentRegExps = [/^facebookexternalhit/i, /^linkedinbot/i];

// how long to let phantomjs run before we kill it
var REQUEST_TIMEOUT = 15*1000;

// Serve app HTML for this URL?
var appUrl = function (url) {
    if (url === '/favicon.ico' || url === '/robots.txt')
        return false;

    // NOTE: app.manifest is not a web standard like favicon.ico and
    // robots.txt. It is a file name we have chosen to use for HTML5
    // appcache URLs. It is included here to prevent using an appcache
    // then removing it from poisoning an app permanently. Eventually,
    // once we have server side routing, this won't be needed as
    // unknown URLs with return a 404 automatically.
    if (url === '/app.manifest')
        return false;

    if (url === '/app.html')
        return false;

    // Avoid serving app HTML for declared routes such as /sockjs/.
    if (RoutePolicy.classify(url))
        return false;

    // we currently return app HTML on all URLs by default
    return true;
};

WebApp.connectHandlers.use(function (req, res, next) {
    console.log(req.url);
    if ((! /\?.*_auto_escaped_fragment_=/.test(req.url) && appUrl(req.url)) ||
        _.any(Spiderable.userAgentRegExps, function (re) {
            return re.test(req.headers['user-agent']); })) {

        // reassembling url without escaped fragment if exists
        var parsedUrl = urlParser.parse(req.url);
        var parsedQuery = querystring.parse(parsedUrl.query);
        parsedQuery['_auto_escaped_fragment_'] = "";
        var newQuery = querystring.stringify(parsedQuery);
        var newPath = parsedUrl.pathname + (newQuery ? ('?' + newQuery) : '');
        var url = "http://" + req.headers.host + newPath;

        // This string is going to be put into a bash script, so it's important
        // that 'url' (which comes from the network) can neither exploit phantomjs
        // or the bash script. JSON stringification should prevent it from
        // exploiting phantomjs, and since the output of JSON.stringify shouldn't
        // be able to contain newlines, it should be unable to exploit bash as
        // well.
        var phantomScript = "var url = " + JSON.stringify(url) + ";" +
            "var page = require('webpage').create();" +
            "page.open(url);" +
            "setInterval(function() {" +
            "  var ready = page.evaluate(function () {" +
            "    if (typeof Meteor !== 'undefined' " +
            "        && typeof(Meteor.status) !== 'undefined' " +
            "        && Meteor.status().connected) {" +
            "      Deps.flush();" +
            "      return DDP._allSubscriptionsReady();" +
            "    }" +
            "    return false;" +
            "  });" +
            "  if (ready) {" +
            "    var out = page.content;" +
            "    out = out.replace(/<script[^>]+>(.|\\n|\\r)*?<\\/script\\s*>/ig, '');" +
            "    out = out.replace('<meta name=\"fragment\" content=\"!\">', '');" +
            "    console.log(out);" +
            "    phantom.exit();" +
            "  }" +
            "}, 100);\n";

        // Run phantomjs.
        //
        // Use '/dev/stdin' to avoid writing to a temporary file. We can't
        // just omit the file, as PhantomJS takes that to mean 'use a
        // REPL' and exits as soon as stdin closes.
        //
        // However, Node 0.8 broke the ability to open /dev/stdin in the
        // subprocess, so we can't just write our string to the process's stdin
        // directly; see https://gist.github.com/3751746 for the gory details. We
        // work around this with a bash heredoc. (We previous used a "cat |"
        // instead, but that meant we couldn't use exec and had to manage several
        // processes.)
        child_process.execFile(
            '/bin/bash',
            ['-c',
                ("exec phantomjs --load-images=no /dev/stdin <<'END'\n" +
                    phantomScript + "END\n")],
            {timeout: REQUEST_TIMEOUT},
            function (error, stdout, stderr) {
                if (!error && /<html/i.test(stdout)) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
                    res.end(stdout);
                } else {
                    // phantomjs failed. Don't send the error, instead send the
                    // normal page.
                    if (error && error.code === 127)
                        Meteor._debug("spiderable: phantomjs not installed. Download and install from http://phantomjs.org/");
                    else
                        Meteor._debug("spiderable: phantomjs failed:", error, "\nstderr:", stderr);

                    next();
                }
            });
    } else {
        next();
    }
});
