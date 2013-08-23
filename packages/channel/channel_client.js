
/*
Meteor.joinChannel = function(channelName, cb) {
    Meteor.call("joinChannel", channelName, Meteor.connection._lastSessionId, cb);
}
    */

_ChannelManager = function() {
    this._channels = {};
}

_.extend(_ChannelManager.prototype, {
    createChannel: function(channelName, sessionId, options, cb) {
        Meteor.call("createChannel", channelName, sessionId, options, function(err, res) {
            console.log(arguments);
            cb(err, res);
        })
    },

    destoryChannel: function(channelName, cb) {

    },

    joinChannel: function(channelName, cb) {

    },

    leaveChannel: function(channelName, cb) {

    },

    getAllChannels: function(cb) {

    },

    getChannel: function(channelName, cb) {

    }
})

Channel = function(options) {
    this._options = options || {};
    this._admin = null;

    this._joinSessionListeners = [];
}

_.extend(Channel.prototype, {
    getAllSession: function() {

    },

    addAdmin: function(sessionId) {

    },

    removeAdmin: function(sessionId) {

    },

    broadcast: function(msg) {

    },
    /*
    {
        onSessionEnter: function() {}
        onSessionLeave: function() {}
        onBroadcast: function() {}
        onChannelChange: function() {}
        onDestoryed: function {}
    }
     */
    addListener: function(listener) {

    }
})

ChannelManager = new _ChannelManager;