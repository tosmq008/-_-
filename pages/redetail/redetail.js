var e, t = getApp(), a = require("../../api/api.js"), o = require("../../utils/notification.js"), i = require("../../api/compatibility.js");

Page({
    data: {
        pageFrom: "list",
        isNetworkError: !1,
        redList: [],
        hasAuthorized: t.globalData.hasAuthorized
    },
    onShow: function() {
        t.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: t.globalData.hasAuthorized
        }), this.getRedDetail();
    },
    onLoad: function(t) {
        o.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this), 
        e = t.objID, wx.setNavigationBarTitle({
            title: "领取详情"
        });
    },
    getRedDetail: function() {
        var o = this;
        a.getRed({
            query: {
                id: e
            },
            success: function(e) {
                if (0 === e.data.code) {
                    o.getRedMember();
                    var a = e.data.data.envelope, i = a.packet;
                    o.setData({
                        avatar: a.user.avatar,
                        amount: i / 100,
                        inscribe: a.inscribe,
                        eNum: a.e_num,
                        openers: a.openers
                    }), a.user_id == t.globalData.user_id ? o.setData({
                        funds: a.funds / 100,
                        balance: (a.funds - a.balance) / 100,
                        showMoney: !0
                    }) : o.setData({
                        showMoney: !1
                    });
                } else o.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取红包详情失败",
                    content: "[" + (e.data.code || e.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                });
            },
            fail: function(e) {
                o.setData({
                    isNetworkError: !0
                });
            }
        });
    },
    reRequest: function(e) {
        this.getRedDetail();
    },
    getRedMember: function() {
        var t = this.data.redList, o = 0 == t.length ? 0 : t[t.length - 1].id;
        o || (o = 0);
        var i = this;
        this.noMoreMember || i.isReqRedMembers || (i.isReqRedMembers = !0, a.getRedList({
            query: {
                envelope_id: e,
                since: o,
                num: 10
            },
            success: function(e) {
                if (0 === e.data.code) {
                    i.setData({
                        isNetworkError: !1
                    });
                    var t = e.data.data.opener_list;
                    if (0 == t.length) i.noMoreMember = !0; else {
                        i.noMoreMember = !1;
                        for (var a = i.data.redList, o = 0; o < t.length; o++) {
                            var s = t[o];
                            s.time = i.formatDate(1e3 * s.created, !1), s.amount = (s.amount / 100).toFixed(2), 
                            a.push(s);
                        }
                        i.setData({
                            redList: a
                        });
                    }
                } else i.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取红包领取详情失败",
                    content: "[" + (e.data.code || e.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                });
            },
            fail: function(e) {
                i.setData({
                    isNetworkError: !0
                });
            },
            complete: function() {
                i.isReqRedMembers = !1, setTimeout(function() {
                    i.noMoreMember = !1;
                }, 2e3);
            }
        }));
    },
    formatDate: function(e, t) {
        var a = new Date(e), o = a.getFullYear(), i = a.getMonth() + 1, s = a.getHours(), n = a.getMinutes();
        n < 10 && (n = "0" + n), i.length <= 1 && (i = "0" + i);
        var r = a.getDate();
        return r.length <= 1 && (r = "0" + r), t ? o + "年" + i + "月" + r + "日" : i + "月" + r + "日 " + s + ":" + n;
    },
    onReachBottom: function() {
        var e = this.data.redList.slice(-1).pop();
        e && e.id && this.getRedMember();
    },
    withdraw: function() {
        wx.navigateTo({
            url: "../withdraw/withdraw"
        });
    },
    changeAuthorizationState: function(e) {
        this.setData({
            hasAuthorized: e
        }), e && this.getRedDetail();
    },
    requestGetUserInfo: function(e) {
        t.login({}, e.detail.userInfo);
    },
    requestAuthorization: function(e) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (i ? wx.openSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? t.login() : wx.showModal({
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