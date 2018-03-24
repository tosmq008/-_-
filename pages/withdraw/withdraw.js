var t = getApp(), a = require("../../api/api.js"), e = require("../../utils/notification.js");

Page({
    data: {
        allMoney: "0.00",
        payMoney: "",
        isNetworkError: !1,
        hasAuthorized: t.globalData.hasAuthorized
    },
    onShow: function() {
        t.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: t.globalData.hasAuthorized
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: "提现"
        }), e.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this), 
        this.getMoney();
    },
    getMoney: function() {
        var t = this;
        a.drawhome({
            success: function(a) {
                if (0 === a.data.code) {
                    t.setData({
                        isNetworkError: !1
                    });
                    var e = (a.data.data.balance / 100).toFixed(2);
                    t.setData({
                        allMoney: e,
                        balance: a.data.data.balance
                    });
                } else t.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取钱包详情失败",
                    content: "[" + (a.data.code || a.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                });
            },
            fail: function(a) {
                t.setData({
                    isNetworkError: !0
                });
            }
        });
    },
    reRequest: function(t) {
        this.getMoney();
    },
    changeAuthorizationState: function(t) {
        this.setData({
            hasAuthorized: t
        }), t && this.getMoney();
    },
    requestGetUserInfo: function(a) {
        t.login({}, a.detail.userInfo);
    },
    requestAuthorization: function(a) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (compatibility ? wx.openSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? t.login() : wx.showModal({
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
    },
    historyTap: function() {
        wx.navigateTo({
            url: "../redhistory/redhistory"
        });
    },
    faqTap: function() {
        wx.navigateTo({
            url: "../faq/faq"
        });
    },
    formSubmit: function(t) {
        var e = Math.floor(100 * parseFloat(t.detail.value.money));
        if ("" == t.detail.value.money || e < 100) wx.showModal({
            title: "提示",
            content: "提现金额最少为1元哟~",
            showCancel: !1
        }); else if (e > this.data.balance) wx.showModal({
            title: "提示",
            content: "钱包余额不足",
            showCancel: !1
        }); else {
            var o = {
                amount: e
            }, i = this;
            i.isWithdraw || (i.isWithdraw = !0, a.withdraw({
                data: o,
                success: function(t) {
                    0 === t.data.code ? (i.setData({
                        isNetworkError: !1,
                        payMoney: ""
                    }), i.getMoney(), wx.showModal({
                        title: "提现成功",
                        content: "提现金额会在3个工作日内到账，请注意查收",
                        showCancel: !1
                    })) : -2 === t.data.code ? (i.setData({
                        isNetworkError: !1
                    }), wx.showModal({
                        title: "提现失败",
                        content: "当前提现人数较多，请稍后再试",
                        showCancel: !1
                    })) : 40021 === t.data.code ? (i.setData({
                        isNetworkError: !1
                    }), wx.showModal({
                        title: "提现失败",
                        content: "操作太频繁，请稍后再试",
                        showCancel: !1
                    })) : 4e4 === t.data.code ? (i.setData({
                        isNetworkError: !1
                    }), wx.showModal({
                        title: "提现失败",
                        content: "系统维护中，请稍后再试",
                        showCancel: !1
                    })) : (i.setData({
                        isNetworkError: !0
                    }), wx.showModal({
                        title: "提现失败",
                        content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    }));
                },
                fail: function(t) {
                    i.setData({
                        isNetworkError: !0
                    });
                },
                complete: function() {
                    i.isWithdraw = !1;
                }
            }));
        }
    },
    allPayTap: function() {
        this.setData({
            payMoney: this.data.allMoney
        });
    },
    bindMoneyInput: function(t) {
        t.detail.value = t.detail.value.replace(/[^\d.]/g, ""), t.detail.value = t.detail.value.replace(/\.{2,}/g, "."), 
        t.detail.value = t.detail.value.replace(/^\./g, ""), t.detail.value = t.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."), 
        t.detail.value = t.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"), t.detail.value > this.data.allMoney && (t.detail.value = this.data.allMoney);
        var a = t.detail.value;
        this.setData({
            payMoney: a
        });
    }
});