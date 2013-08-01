

Handlebars.registerHelper("each_with_index", function(data, options) {
    var parentData = this
        , hasValues = false
        , key = _.isArray(data) ? '_index' : '_key'
        , branches = _.map(data, function(x, i) {
            hasValues = true;
            // enable eachWithIndex functional parity with handlebars
            if(x){ x[key] = i; }
            // infer a branch key from the data
            var branch = ((x && x._id) || (typeof x === 'string' ? x : null) ||
                Spark.UNIQUE_LABEL);
            return Spark.labelBranch(branch, function() {
                return options.fn(x);
            });
        }).join('');

    return hasValues && branches || Spark.labelBranch('else', function () {
        return options.inverse(parentData);
    })
})