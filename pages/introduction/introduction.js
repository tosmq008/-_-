getApp();

Page({
    data: {},
    onShow: function() {},
    onLoad: function(t) {},
    informTap: function() {
        wx.navigateTo({
            url: "../update/update?type=ntc&origin=intro"
        });
    },
    avtivityTap: function() {
        wx.navigateTo({
            url: "../update/update?type=act&origin=intro"
        });
    },
    redTap: function() {
        wx.navigateTo({
            url: "../update/update?type=red&origin=intro"
        });
    },
    voteTap: function() {
        wx.navigateTo({
            url: "../vote/vote?origin=intro"
        });
    },
    prayTap: function() {
        wx.navigateTo({
            url: "../update/update?type=bls&origin=intro"
        });
    }
});