var e = getApp(), a = require("../../api/api.js"), t = void 0, i = "";

Page({
    data: {
        moneyValid: !1,
        numValid: !1,
        money: "",
        num: "",
        hasAuthorized: e.globalData.hasAuthorized,
        serviceCharge: "0.00",
        payMoney: "0.00",
        showAdvanced: !1
    },
    dataModel: {
        money: "",
        num: ""
    },
    onLoad: function(a) {
        e.globalData.hasLogin && (i = a.origin, "" != (t = a).file_no && "undefined" != t.file_no || delete t.file_no);
    },
    onShow: function() {
        e.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: e.globalData.hasAuthorized
        });
    },
    faqTap: function() {
        wx.navigateTo({
            url: "../faq/faq"
        });
    },
    bindMoneyInput: function(e) {
        e.detail.value = e.detail.value.replace(/[^\d.]/g, ""), e.detail.value = e.detail.value.replace(/\.{2,}/g, "."), 
        e.detail.value = e.detail.value.replace(/^\./g, ""), e.detail.value = e.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."), 
        e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
        var a = e.detail.value;
        a > 2e5 && (a = 2e5), this.dataModel.money = a;
        var t, i = (1 * a + 1 * (t = a < 10 ? Math.ceil(10 * a) / 100 : Math.ceil(3 * a) / 100)).toFixed(2);
        a < 1 ? this.setData({
            money: ""
        }) : this.setData({
            moneyValid: !!a,
            payMoney: 0 == i ? "0.00" : i,
            serviceCharge: 0 == t ? "0.00" : t,
            money: a
        });
    },
    bindNumInput: function(e) {
        e.detail.value = e.detail.value.replace(/[^\d]/g, ""), 0 == e.detail.value ? e.detail.value = "" : e.detail.value > 100 && (e.detail.value = 100);
        var a = e.detail.value;
        this.dataModel.num = a, this.setData({
            numValid: !!a,
            num: e.detail.value
        });
    },
    bindRecvCellInput: function(e) {
        e.detail.value = e.detail.value.replace(/[^\d]/g, ""), this.setData({
            des_cell: e.detail.value
        });
    },
    switchTargetChange: function(e) {
        this.setData({
            showAdvanced: e.detail.value
        });
    },
    formSubmit: function(n) {
        var l = this, o = this, d = n.detail.value;
        if ("" != d.money) {
            if (1 == d.designated) {
                if (d.money < 10) return void wx.showModal({
                    title: "提示",
                    content: "定向红包最小金额为10元",
                    showCancel: !1
                });
                if ("" == d.des_name) return void wx.showModal({
                    title: "提示",
                    content: "请准确输入接收人姓名",
                    showCancel: !1
                });
                if (!/^1[34578]\d{9}$/.test(d.des_cell)) return void wx.showModal({
                    title: "提示",
                    content: "请准确输入接收人手机",
                    showCancel: !1
                });
            } else if ("" == d.num) return;
            setTimeout(function() {
                var s, u = d.money, c = parseInt(1e4 * u / 100), r = (100 * (1 * u + 1 * (s = u < 10 ? Math.ceil(10 * u) / 100 : Math.ceil(3 * u) / 100)).toFixed(2)).toFixed(0);
                t.invalue = parseInt(c), t.funds = parseInt(r), t.e_num = parseInt(d.num), t.formid = n.detail.formId, 
                1 == d.designated ? (t.designated = 1, t.des_cell = d.des_cell, t.des_name = d.des_name, 
                t.e_num = 1) : t.designated = 0, l.isRequsting || (l.isRequsting = !0, a.postredNotice({
                    data: t,
                    success: function(a) {
                        if (wx.removeStorageSync("noti_content"), wx.removeStorageSync("noti_title"), 0 === a.data.code) {
                            var n = a.data.data.pay_info, l = a.data.data.envelope_id;
                            wx.requestPayment({
                                timeStamp: n.timeStamp + "",
                                nonceStr: n.nonceStr,
                                package: n.package,
                                signType: n.signType,
                                paySign: n.paySign,
                                success: function(a) {
                                    if (wx.reportAnalytics) {
                                        var n = {
                                            origin: i,
                                            type: "red",
                                            template: 208
                                        };
                                        n.signature_change = t.inscribe === e.globalData.userInfo.nickName ? 0 : 1, n.file_no_assign = t.file_no ? 1 : 0, 
                                        wx.reportAnalytics("create_msg", n);
                                    }
                                    var o = {
                                        id: l
                                    };
                                    wx.redirectTo({
                                        url: "../detail/detail?type=red&hint=1&obj=" + JSON.stringify(o)
                                    });
                                },
                                fail: function(e) {
                                    wx.showModal({
                                        title: "提示",
                                        content: "付款失败",
                                        showCancel: !1
                                    });
                                }
                            });
                        } else wx.showModal({
                            title: "发送红包失败",
                            content: "[" + (a.data.code || a.statusCode) + "]请检查网络或稍后重试。",
                            showCancel: !1
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "网络错误，请稍后重试",
                            showCancel: !1
                        });
                    },
                    complete: function() {
                        o.isRequsting = !1;
                    }
                }));
            }, 300);
        }
    }
});