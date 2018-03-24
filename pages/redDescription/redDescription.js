getApp();

Page({
    data: {},
    onShow: function() {},
    onLoad: function(t) {},
    tapWithdraw: function() {
        wx.navigateTo({
            url: "../withdraw/withdraw"
        });
    }
});