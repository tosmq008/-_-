var e = require("utils/proxy.js"), t = require("widget/wetoast/wetoast.js").WeToast, o = require("utils/notification.js");
var kkk=require("utils/data.js")
require("utils/util.js");

App({
    WeToast: t,
    onLaunch: function(t) {
        wx.checkSession({
            success: function() {
                console.log("session，没有过期");
            },
            fail: function() {
                e.login({
                    success: function(t) {
                        var o = t.code;
                        e.request({
                            url: "https://notice.jianjian.tv/wx/v1.0/session/refresh",
                            data: {
                                code: o
                            },
                            method: "POST",
                            success: function(e) {
                                console.log("session接口返回的" + e.data.code);
                            },
                            fail: function(e) {}
                        });
                    }
                });
            }
        }), Math.round(+new Date() / 1e3) < +wx.getStorageSync("utexp") && this.setupGlobalData(), 
        t && t.scene && 1044 == t.scene && t.shareTicket ? this.globalData.shareTicket = t.shareTicket : this.globalData.shareTicket = null;
    },
    onShow: function(e) {
        e && e.scene && 1044 == e.scene && e.shareTicket ? this.globalData.shareTicket = e.shareTicket : this.globalData.shareTicket = null;
    },
    setupGlobalData: function() {
        var e = wx.getStorageSync("user_id"), t = wx.getStorageSync("user_token"), o = wx.getStorageSync("userInfo"), a = wx.getStorageSync("uptoken"), s = wx.getStorageSync("phost");
        "" != e && "" != t && "" != o && (this.globalData.user_id = e, this.globalData.user_token = t, 
        this.globalData.userInfo = o, this.globalData.phost = s, this.globalData.uptoken = a, 
        this.globalData.hasLogin = !0, this.globalData.hasAuthorized = !0, this.deviceProfile());
    },
    deviceProfile: function() {
        var e = {}, t = this;
        wx.getSystemInfo({
            success: function(o) {
                e.model = o.model.indexOf("<") > -1 ? o.model.split("<")[0] : o.model, e.wechatVersion = o.version, 
                e.pixel = o.windowWidth + "*" + o.windowHeight, e.language = o.language, e.timezone = -new Date().getTimezoneOffset() / 60, 
                e.system = o.system, Object.assign(t.globalData.deviceProfiles, e);
            }
        }), wx.getNetworkType({
            success: function(o) {
                var a = o.networkType.toLocaleLowerCase();
                e.connectionType = "wifi" === a ? 0 : 1, e.cellularNetworkType = "wifi" !== a ? "4g" == a ? "LTE" : a : "OFFLINE", 
                Object.assign(t.globalData.deviceProfiles, e);
            }
        });
    },
    login: function(t, a) {
        var s = this;

        e.login({
            success: function(i) {
              　
                var n = i.code;
                n ? a ? s.getUser(t, n, a) : e.getUserInfo({
                    success: function(e) {

                        s.getUser(t, n, e.userInfo);
                    },
                    fail: function(e) {
                        s.globalData.hasAuthorized = !1, o.postNotificationName("__authorizationState__", !1), 
                        t && t.fail && t.fail(e);
                    },
                    complete: function(e) {
                        t && t.complete && t.complete();
                    }
                }) : console.log("获取用户登录态失败！" + i.errMsg);
            }
        });
    },
    getUser: function(t, a, s) {


        var i = this;
        i.globalData.userInfo = s, wx.setStorageSync("userInfo", s), e.request({
            url: "https://notice.jianjian.tv/v1.0/login",
            data: {
                code: a,
                nickname: s.nickName,
                avatar: s.avatarUrl,
                sex: s.gender,
                city: s.city
            },
            method: "POST",
            success: function(e) {

              e.data=kkk;
          debugger
                if (0 == e.data.code) {
                    var a = e.data.data;
                    wx.setStorageSync("user_id", a.user.user_id), wx.setStorageSync("user_token", a.user_token), 
                    wx.setStorageSync("age", a.age), wx.setStorageSync("utexp", a.utexp), wx.setStorageSync("uptoken", a.uptoken), 
                    wx.setStorageSync("phost", a.phost), i.globalData.hasLogin ? i.setupGlobalData() : (i.setupGlobalData(), 
                    o.postNotificationName("__refreshIndex__")), o.postNotificationName("__authorizationState__", !0), 
                    t && t.success && t.success();
                }
            },
            fail: function(e) {
                console.log("错误啦" + JSON.stringify(e.errMsg)), wx.showToast({
                    title: "网络错误\n请重试",
                    icon: "loading",
                    duration: 2e3
                }), t && t.error && t.error(e);
            }
        });
    },
    globalData: {
        userInfo: null,
        user_id: "",
        user_token: "",
        hasLogin: !1,
        hasAuthorized: !1,
        deviceProfiles: {},
        uptoken: "",
        phost: ""
    }
});