
var findClientSessionById = function(sessionId) {
    var session = Meteor.server.sessions[sessionId];
    return session;
}

ChannelSession = function(clientSession, subHandle, options) {
    this.options = options || {};
    this.clientSession = null;
    this.channel = null;
    this.subHandle = subHandle;
    this.id = null; // userId
    this.setClientSession(clientSession);
}

_.extend(ChannelSession.prototype, {
    setClientSession: function(clientSession) {
        this.clientSession = clientSession;
        if (clientSession) {
            this.id = clientSession.id;
        }
    },

    getClientSession: function() {
        return this.clientSession;
    },

    send: function(who, msg) {
        var id = msg.id;
        delete msg.id;
        this.subHandle.added(this.channel.name, id, {who: who, msg: msg});
    },

    broadcast: function(msg) {

    },

    addChannel: function(channel) {
        this.channels[channel.name] = channel;
    },

    getChannel: function(channel) {
        return this.channel;
    },

    setSubHandle: function(subHandle) {
        if (this.subHandle) {
            this.subHandle.stop();
        }
        this.subHandle = subHandle;
    },

    onStop: function() {
        this.channel.removeSession()
    }
})

/*
 options: {
 public: true/false;
 owner: session id;
 }
 */

Channel = function(name, sessionId, options) {
    this.name = name;
    this.options = options || {};
    this._sessions = {};
    this.owner = sessionId;
}

_.extend(Channel.prototype, {
    addSession: function(session) {
        if (! _.isString(session)) {
            throw Error("Session Id must be a string");
        }
        if (_.has(this._sessions, session.id)) {
            throw Error("Session Id " + session.id + " already join " + this.name)
        }
        else {
            this._sessions[session.id] = session;
            session.addChannel(this);
            return true;
        }
    },

    removeSession: function(session) {
        if (session && session instanceof ChannelSession) {
            if (_.has(this._sessions, session.id)) {
                delete this._sessions[session.id];
            }
        }
        else {
            throw new Error("Session not existed");
        }
        return true;
    },

    getSession: function(sessionId) {
        if (_.isString(sessionId)) {
            return this._sessions[sessionId];
        }
        else {
            throw Error("Session Id must be a string");
        }
    },

    isSessionExsit: function(sessionId) {
        return _.has(this._sessions, sessionId);
    },

    // sessionId   =>  who
    broadcast: function(sessionId, msg) {
        if (_.has(this._sessions, sessionId) && _.isObject(msg)) {
            _.forEach(this._sessions, function(session) {
                session.send(sessionId, msg);
            })
        }
    }
})

Meteor.methods({
    createChannel: function(channelName, sessionId, options) {
        if (_.isString(channelName) && _.isString(sessionId)) {
            try {
                var channel = ChannelManager.createChannel(channelName, sessionId, options);
                if (channel) {
                    return true;
                }
            }catch(e) {
                return new Meteor.Error(1001, e.message);
            }
        }
        return new Meteor.Error(1001, "create channel failed");
    },

    joinChannel: function(channelName, sessionId) {
        var channel;
        if (_.isString(channelName)) {
            channel = ChannelManager.getChannel(channelName);
        }

        if (_.isString(sessionId)) {
            var csession = findClientSessionById(sessionId);
        }

        if (!channel && !csession) {
            try {
                var session = new ChannelSession(csession);
                channel.addSession(session);
                return true;
            }catch (e) {
                throw new Meteor.Error(1001, e.message);
            }
        }
        return false;
    },

    broadcast: function(channelName, sessionId, msg) {
        var channel = ChannelManager.getChannel(channelName);
        if (channel) {
            if (channel.isSessionExsit(sessionId) && _.isObject(msg)) {
                channel.broadcast(sessionId, msg);
                return true;
            }
        }
        return new Meteor.Error(1001, "Broadcast failed, please check channel name and session ID");
    }
})



/*  __channels__  fields
 channel_name  string
 messages:     array
    [{id: ***, userId: ***, time: ***, message: ***, is_send: true/false, ip: ***}]
 */

var channelCollection = CollectionManager.create("__channels__");

// set subscribe handle to channel session
Meteor.publish("channel", function(channelName) {
    var channel = ChannelManager.getChannel(channelName);
    if (channel) {
        var session = channel.getSession(this._session.id);
        if (session) {
            session.setSubHandle(this);
            this.ready();
        }
    }

    this.error(new Meteor.Error(1001, "Subscribe channel :" + channelName + " failed, please call joinChannel first"));
})

_ChannelManager = function () {
    this.options = {};
    this._channels = {};
}

_.extend(_ChannelManager.prototype, {
    configure: function(options) {
        this.options = _.extend(this.options, options);
    },

    createChannel: function(name, sessionId, options) {
        if (_.isString(name)) {
            if (!_.has(this._channels, name)) {
                var channel = new Channel(name, sessionId, options);
                this._channels[name] = channel;
                return channel;
            }
            else {
                throw Error("Channel " + name + " already exist");
            }
        }
        else {
            throw Error("Channel name must be a string");
        }
    },

    destroyChannel: function(name) {
        delete this._channels[name];
    },

    getChannel: function(name) {
        if (_.isString(name)) {
            return this._channels[name];
        }
    },

    getSessionInChannel: function(sessionId, channelName) {
        var channel = this.getChannel(channelName);
        if (channel) {
            channel.getSession(sessionId)
        }
    },

    isSessionInChannel: function(sessionId, channelName) {
        var channel = this.getChannel(channelName);
        if (channel) {
            var session = channel.getSession(sessionId);
            if (session) {
                return true;
            }
        }
        return false;
    }
})

ChannelManager = new _ChannelManager();