
var newConnection = function (stream) {
    // Some of these tests leave outstanding methods with no result yet
    // returned. This should not block us from re-running tests when sources
    // change.
    return new LivedataTest.Connection(stream, {reloadWithOutstanding: true});
};

var makeConnectMessage = function (session) {
    var msg = {
        msg: 'connect',
        version: LivedataTest.SUPPORTED_DDP_VERSIONS[0],
        support: LivedataTest.SUPPORTED_DDP_VERSIONS
    };

    if (session)
        msg.session = session;
    return msg;
}

var testGotMessage = function (test, stream, expected) {
    var retVal = undefined;

    if (stream.sent.length === 0) {
        test.fail({error: 'no message received', expected: expected});
        return retVal;
    }

    var got = stream.sent.shift();

    if (typeof got === 'string' && typeof expected === 'object')
        got = JSON.parse(got);

    // An expected value of '*' matches any value, and the matching value (or
    // array of matching values, if there are multiple) is returned from this
    // function.
    if (typeof expected === 'object') {
        var keysWithStarValues = [];
        _.each(expected, function (v, k) {
            if (v === '*')
                keysWithStarValues.push(k);
        });
        _.each(keysWithStarValues, function (k) {
            expected[k] = got[k];
        });
        if (keysWithStarValues.length === 1) {
            retVal = got[keysWithStarValues[0]];
        } else {
            retVal = _.map(keysWithStarValues, function (k) {
                return got[k];
            });
        }
    }

    test.equal(got, expected);
    return retVal;
};

var startAndConnect = function(test, stream) {
    stream.reset(); // initial connection start.

    testGotMessage(test, stream, makeConnectMessage());
    test.length(stream.sent, 0);

    stream.receive({msg: 'connected', session: SESSION_ID});
    test.length(stream.sent, 0);
};

var SESSION_ID = '17';


if (Meteor.isClient) {
    testAsyncMulti("Meteor Channel - Join Channel Test", [
        function(test, expect) {
            ChannelManager.createChannel("my_channel", null, expect(function(err, res) {
                console.log(arguments);
            }))
        }
    ])
}