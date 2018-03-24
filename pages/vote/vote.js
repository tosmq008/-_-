function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a, i = require("../../api/api.js"), n = require("../../utils/notification.js"), o = getApp(), s = "";

Page((t = {
    data: {
        autofocus: !0,
        todayStr: new Date().toISOString().slice(0, 10),
        date: new Date().toISOString().slice(0, 10),
        title: "",
        content: "",
        cell_req: !1,
        titleValid: !1,
        pixelRatio: wx.getSystemInfoSync().pixelRatio,
        cellNum: [ "", "" ],
        endDay: "",
        endDayPicker: "",
        endTime: "",
        arrowAnime: {},
        showAdvanced: !1,
        showMore: !1,
        v_min: 0,
        v_max: 0
    },
    onLoad: function(e) {
        s = e.origin, wx.setNavigationBarTitle({
            title: "发起投票",
            success: function(e) {}
        }), e.voteId && (a = e.voteId, this.getVoteDetail(e.voteId));
        var t = this.GetDateStr(3), i = this.GetTimeStr(), n = t.split("-");
        this.setData({
            endDay: n[0] + "年" + n[1] + "月" + n[2] + "日",
            endDayPicker: t,
            endTime: i,
            author: o.globalData.userInfo && o.globalData.userInfo.nickName ? o.globalData.userInfo.nickName : "",
            autofocus: o.globalData.deviceProfiles.system.startsWith("iOS")
        });
    },
    GetDateStr: function(e) {
        var t = new Date();
        return t.setDate(t.getDate() + e), t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate());
    },
    GetTimeStr: function() {
        var e = new Date();
        return (e.getHours() < 10 ? "0" + e.getHours() : e.getHours()) + ":" + (e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes());
    },
    addCell: function(e) {
        var t = this.data.cellNum;
        t.push(""), this.setData({
            cellNum: t
        });
    },
    deteleCell: function(e) {
        var t = e.currentTarget.dataset.item, a = this.data.cellNum;
        2 != a.length && (a.splice(t, 1), this.setData({
            cellNum: a
        }));
    },
    bindCellContentInput: function(e) {
        var t = e.currentTarget.dataset.item, a = e.detail.value, i = this.data.cellNum;
        i[t] = a, this.setData({
            cellNum: i
        });
    },
    bindTitleInput: function(e) {
        this.setData({
            titleValid: !!e.detail.value
        });
    },
    bindMoreLeastInput: function(e) {
        e.detail.value = e.detail.value.replace(/[^\d]/g, ""), this.setData({
            more_least: e.detail.value
        });
    },
    bindMoreMostInput: function(e) {
        e.detail.value = e.detail.value.replace(/[^\d]/g, ""), this.setData({
            more_most: e.detail.value
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    formSubmit: function(e) {
        var t = this;
        setTimeout(function() {
            var a = e.detail.value, l = t, r = i.postVote;
            if (t.data.titleValid) {
                for (var d = t.data.cellNum, c = 0; c < d.length; c++) if ("" == d[c]) {
                    var u = "第" + (c + 1) + "个选项不能为空";
                    return void wx.showModal({
                        title: "提示",
                        content: u,
                        showCancel: !1
                    });
                }
                var h = 0, m = 0;
                if (a.more_choose && (h = a.more_least ? parseInt(a.more_least) : 0, m = a.more_most ? parseInt(a.more_most) : 0, 
                0 != h && 0 != m && h > m)) wx.showModal({
                    title: "提示",
                    content: "最少选择数必须小于最多选择数",
                    showCancel: !1
                }); else {
                    var d = t.data.cellNum, v = t.data.endDay.replace("年", "/").replace("月", "/").replace("日", " ") + t.data.endTime + ":00", g = new Date(v), f = Date.parse(g) / 1e3, w = a.no_forward ? 0 : 1, D = void 0;
                    D = {
                        title: a.title,
                        subtitle: a.description,
                        is_single: a.more_choose ? 0 : 1,
                        anonymous: a.name_choose ? 1 : 0,
                        inscribe: a.leader,
                        options: d,
                        deadline: f,
                        v_min: h,
                        v_max: m,
                        forward: w
                    }, t.isRequsting || (t.isRequsting = !0, r({
                        data: D,
                        success: function(e) {
                            if (0 === e.data.code) {
                                wx.reportAnalytics && wx.reportAnalytics("create_msg", {
                                    origin: s,
                                    type: "vot",
                                    template: "3",
                                    vot_multi: a.more_choose ? 1 : 0,
                                    vot_anonymous: a.name_choose ? 1 : 0,
                                    signature_change: a.leader === o.globalData.userInfo.nickName ? 0 : 1
                                }), wx.showToast({
                                    title: "添加成功",
                                    icon: "success",
                                    duration: 2e3
                                }), n.postNotificationName("__refreshSent__");
                                var t = e.data.data.theme_id;
                                wx.redirectTo({
                                    url: "../votedetail/votedetail?detailID=" + t + "&hint=1"
                                });
                            } else 40014 === e.data.code ? wx.showModal({
                                title: "发布失败",
                                content: "根据相关法律法规，请调整您的内容后再进行发布。",
                                showCancel: !1
                            }) : wx.showModal({
                                title: "发布失败",
                                content: "[" + (e.data.code || e.statusCode) + "]请检查网络或调整内容后重新发布。",
                                showCancel: !1
                            });
                        },
                        fail: function(e) {},
                        complete: function() {
                            l.isRequsting = !1;
                        }
                    }));
                }
            } else wx.showModal({
                title: "提示",
                content: "标题不得为空",
                showCancel: !1
            });
        }, 300);
    }
}, e(t, "bindDateChange", function(e) {
    var t = e.detail.value, a = t.split("-"), i = a[0] + "年" + a[1] + "月" + a[2] + "日";
    this.setData({
        endDayPicker: t,
        endDay: i
    });
}), e(t, "bindTimeChange", function(e) {
    var t = e.detail.value;
    this.setData({
        endTime: t
    });
}), e(t, "bindAdvancedTap", function() {
    var e = this.data.showAdvanced ? 180 : 0, t = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
    });
    t.rotate(e).step({
        duration: 300
    }), this.setData({
        showAdvanced: !this.data.showAdvanced,
        arrowAnime: t.export()
    });
}), e(t, "bindMoreTap", function() {
    this.setData({
        showMore: !this.data.showMore
    });
}), e(t, "getVoteDetail", function(e) {
    console.log("ss" + e);
    var t = this;
    i.getEditVote({
        query: {
            id: e
        },
        success: function(e) {
            if (0 === e.data.code) {
                var a = e.data.data.theme;
                t.setData({
                    title: a.title,
                    subtitle: a.subtitle,
                    deadline: a.deadline,
                    showMore: !a.is_single,
                    cellNum: a.options,
                    anonymous: a.anonymous,
                    author: a.inscribe,
                    v_min: a.v_min,
                    v_max: a.v_max,
                    forward: 0 == a.forward,
                    titleValid: !0
                });
            } else wx.showModal({
                title: "错误",
                content: "错误编码" + e.data.code,
                showCancel: !1
            });
        },
        fail: function(e) {
            console.log("请求编辑投票详情失败");
        }
    });
}), t));