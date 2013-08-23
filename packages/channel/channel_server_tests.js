/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-8-21
 * Time: AM8:33
 * To change this template use File | Settings | File Templates.
 */

Tinytest.add("Meteor Channel - Create Channel Test", function(test) {
    var channel = ChannelManager.createChannel("my_channel");
    test.isTrue(channel.name == "my_channel");
})