Package.describe({
    summary: "Channel Server"
})

Package.on_use(function(api) {
    api.use("webapp");
    api.use("underscore");
    api.use("livedata");
    api.use("mongo-livedata");
    api.use("collection-manager");

    api.export("ChannelManager");

    api.add_files("channel_server.js", "server");
    api.add_files("channel_client.js", "client");
})

Package.on_test(function(api) {
    api.use(["channel", "tinytest", "test-helpers"]);
    api.add_files("channel_client_tests.js", "client");
    api.add_files("channel_server_tests.js", "server");
})