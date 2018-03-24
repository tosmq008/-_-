var t = getApp(), e = require("../../api/api.js"), i = require("../../utils/notification.js"), o = require("../../api/compatibility.js");

Page({
    data: {
        pageFrom: "list",
        isNetworkError: !1,
        historyList: [],
        hasAuthorized: t.globalData.hasAuthorized
    },
    onShow: function() {
        t.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: t.globalData.hasAuthorized
        }), this.getBills();
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "历史记录"
        }), i.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this);
    },
    getBills: function() {
        var t = this.data.historyList, i = 0 == t.length ? 0 : t[t.length - 1].idx;
        i || (i = 0);
        var o = this;
        this.noMoreMember || o.isReqRedMembers || (o.isReqRedMembers = !0, e.bills({
            query: {
                since: i,
                num: 10
            },
            success: function(t) {
                if (0 === t.data.code) {
                    o.setData({
                        isNetworkError: !1
                    });
                    var e = t.data.data.bill_list;
                    if (0 == e.length) o.noMoreMember = !0; else {
                        o.noMoreMember = !1;
                        for (var i = o.data.historyList, a = 0; a < e.length; a++) {
                            var s = e[a];
                            s.time = o.formatDate(1e3 * s.created, !0), "in" == s.type ? (s.name = "抢到的红包", 
                            s.color = "get", s.amount = "+" + (s.amount / 100).toFixed(2)) : (s.name = "发出的红包", 
                            s.color = "out", s.amount = "-" + (s.amount / 100).toFixed(2), s.refunds = (s.refunds / 100).toFixed(2)), 
                            i.push(s);
                        }
                        o.setData({
                            historyList: i
                        });
                    }
                } else o.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取历史详情失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                });
            },
            fail: function(t) {
                o.setData({
                    isNetworkError: !0
                });
            },
            complete: function() {
                o.isReqRedMembers = !1, setTimeout(function() {
                    o.noMoreMember = !1;
                }, 2e3);
            }
        }));
    },
    formatDate: function(t, e) {
        var i = new Date(t), o = i.getFullYear(), a = i.getMonth() + 1, s = i.getHours(), n = i.getMinutes(), r = i.getSeconds();
        s < 10 && (s = "0" + s), n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), a.length <= 1 && (a = "0" + a);
        var h = i.getDate();
        return h.length <= 1 && (h = "0" + h), e ? o + "-" + a + "-" + h + " " + s + ":" + n + ":" + r : a + "月" + h + "日 " + s + ":" + n;
    },
    onReachBottom: function() {
        var t = this.data.historyList.slice(-1).pop();
        t && t.idx && this.getBills();
    },
    reRequest: function(t) {
        this.getBills();
    },
    changeAuthorizationState: function(t) {
        this.setData({
            hasAuthorized: t
        }), t && this.getNoticeDetail();
    },
    requestGetUserInfo: function(e) {
        t.login({}, e.detail.userInfo);
    },
    requestAuthorization: function(e) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (o ? wx.openSetting({
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