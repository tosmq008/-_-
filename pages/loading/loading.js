function e() {
    n || (n = !0, clearTimeout(t), t = setTimeout(function() {
        n = !1;
    }, 2e3), setTimeout(function() {
        wx.redirectTo({
            url: "../index/index"
        });
    }, 500));
}

var t, n, o = require("../../api/compatibility.js"), i = getApp(), u = {
    success: function() {
        e();
    },
    fail: function() {
        getCurrentPages()[0].setData({
            hasAuthorized: !1
        });
    },
    error: function() {
        getCurrentPages()[0].setData({
            isNetworkError: !0
        });
    },
    complete: function() {}
};

Page({
    data: {
        hasAuthorized: !0,
        isNetworkError: !1
    },
    onReady: function() {
        Math.round(+new Date() / 1e3) + 7200 > +wx.getStorageSync("utexp") ? i.login(u, null) : e();
    },
    reRequest: function() {
        i.login(u, null);
    },
    requestGetUserInfo: function(e) {
        debugger
        i.login(u, e.detail.userInfo);
    },
    requestAuthorization: function(e) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (o ? wx.openSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? i.login(u, null) : wx.showModal({
                    title: "授权提示",
                    content: "小程序需要您的微信授权才能使用哦~",
                    showCancel: !1
                });
            }
        }) : wx.showModal({
            title: "授权提示",
            content: "小程序需要您的微信授权才能使用哦~\n错过授权页面的处理办法：删除群里有事→重新搜索进入→点击授权按钮",
            showCancel: !1
        }));
    }
});