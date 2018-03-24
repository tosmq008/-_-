var t, e = require("../../api/api.js"), a = require("../../utils/notification.js"), i = getApp();

Page({
    data: {
        cellfocus: !0,
        namefocus: !1
    },
    onLoad: function(e) {
        t = e.detailID, this.setData({
            cellfocus: i.globalData.deviceProfiles.system.startsWith("iOS"),
            namefocus: "false" === e.cell && i.globalData.deviceProfiles.system.startsWith("iOS"),
            cell: e.cell,
            name: e.name,
            enableCell: "true" !== e.cell,
            enableName: "true" !== e.name
        });
    },
    bindPhoneInput: function(t) {
        this.setData({
            enableCell: 11 == t.detail.value.length
        });
    },
    bindPhoneConfirm: function(t) {
        "true" === this.data.cell && "true" === this.data.name && this.setData({
            cellfocus: !1,
            namefocus: !0
        });
    },
    bindNameInput: function(t) {
        this.setData({
            enableName: 0 != t.detail.value.length
        });
    },
    formSubmit: function(i) {
        var n = this, o = i.detail.value, s = "", l = "";
        if ("true" !== this.data.cell || 11 == (s = o.phonenumber).length) if ("true" !== this.data.name || 0 != (l = o.namenumber).length) {
            var c = {
                cell: s,
                name: l,
                act: "post"
            };
            this.isRequsting || (this.isRequsting = !0, e.joinActivity({
                query: {
                    id: t
                },
                data: c,
                success: function(t) {
                    0 === t.data.code ? (console.log("添加成功"), wx.showToast({
                        title: "报名成功",
                        icon: "success",
                        duration: 4e3
                    }), a.postNotificationName("__signUp__", {
                        cell: s,
                        name: l,
                        id: t.data.data.id
                    }), wx.navigateBack({
                        delta: 1
                    })) : 40009 === t.data.code ? (wx.showToast({
                        title: "您已报名",
                        icon: "success",
                        duration: 2e3
                    }), a.postNotificationName("__getActivity__"), a.postNotificationName("__getActivityMember__")) : 40016 === t.data.code ? (wx.showModal({
                        title: "提示",
                        content: "报名人数已满",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    }), a.postNotificationName("__getActivity__"), a.postNotificationName("__getActivityMember__")) : wx.showModal({
                        title: "报名失败",
                        content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                },
                fail: function(t) {
                    console.log("报名失败");
                },
                complete: function() {
                    n.isRequsting = !1;
                }
            }));
        } else wx.showModal({
            title: "提示",
            content: "姓名输入有误",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "手机号输入有误",
            showCancel: !1
        });
    }
});