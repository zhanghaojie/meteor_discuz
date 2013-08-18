Package.describe({
    summary: "Manage all the collection"
})

Package.on_use(function(api) {
    api.use("underscore");

    api.add_files("collection_manager.js");

    api.export("CollectionManager");
})