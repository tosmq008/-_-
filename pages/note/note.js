var e, t, i, a = require("../../api/api.js"), o = require("../../utils/notification.js"), n = (require("../../utils/util"), 
getApp());

Page({
    data: {
        enable: !1,
        autofocus: !0
    },
    onLoad: function(a) {
        e = a.cellId, t = a.type, i = a.gid, this.setData({
            ty: t
        }), n.globalData.deviceProfiles.system.startsWith("iOS") || this.setData({
            autofocus: !1
        });
    },
    bindPhoneInput: function(e) {
        this.setData({
            enable: 0 != e.detail.value.length
        });
    },
    formSubmit: function(n) {
        var s = this, c = setTimeout(function() {
            wx.showLoading && wx.showLoading({
                title: "留言中..."
            });
        }, 300), u = n.detail.value.note;
        if (0 != u.length) {
            var l, d = void 0, g = void 0;
            "blessing" == t ? (d = {
                content: u
            }, g = "留言", l = a.greetings) : "red" == t ? (d = {
                msg: u
            }, g = "留言", l = a.leaveRedMessage) : "gNickname" == t ? (d = {
                group_id: i,
                nickname: u
            }, g = "修改群昵称", l = a.changeGroupName) : (d = {
                type: "ntc" == t ? "n" : "a",
                msg: u
            }, g = "留言", l = a.leaveMessage), s.isRequsting || (s.isRequsting = !0, l({
                query: {
                    id: e
                },
                data: d,
                success: function(e) {
                    0 === e.data.code ? (console.log("添加成功"), setTimeout(function() {
                        wx.showToast({
                            title: g + "成功",
                            icon: "success",
                            duration: 4e3
                        });
                    }, 300), o.postNotificationName("__getNote__", {
                        note: u
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3)) : 40014 === e.data.code ? wx.showModal({
                        title: g + "失败",
                        content: "根据相关法律法规，请调整您的内容后再进行" + g + "。",
                        showCancel: !1
                    }) : wx.showModal({
                        title: g + "失败",
                        content: "[" + (e.data.code || e.statusCode) + "]请检查网络或调整内容后重新" + g + "。",
                        showCancel: !1
                    });
                },
                fail: function(e) {},
                complete: function() {
                    c && clearTimeout(c), wx.hideLoading && wx.hideLoading(), s.isRequsting = !1;
                }
            }));
        } else wx.showModal({
            title: "提示",
            content: "内容输入有误",
            showCancel: !1
        });
    }
});