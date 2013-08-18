
_CollectionManager = function() {
    this.collections = {};
}

_CollectionManager.prototype = {
    create: function(name) {
        if (typeof name === "function")
            name = name();

        var ret = null;
        if (! _.has(this.collections, name)) {
            ret = this.collections[name] = new Meteor.Collection(name);
        }
        else {
            ret = this.collections[name];
        }
        return ret;
    }
}

CollectionManager = new _CollectionManager;

