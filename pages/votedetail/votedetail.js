var t, e = getApp(), a = require("../../api/api.js"), i = require("../../utils/notification.js"), n = require("../../api/compatibility.js"), s = !1, o = !1, r = 0;

Page({
    data: {
        type: "vot",
        pageFrom: "list",
        hint: 0,
        isNetworkError: !1,
        shareHint: "分享到群里",
        postHint: "发布到群里",
        hasAuthorized: e.globalData.hasAuthorized,
        share_wrap: "ui-d-n",
        mask_cls: "ui-d-n",
        navigator: "ui-d-n",
        outdate: !1,
        enable: !1,
        deleted: !1,
        is_single: !0,
        voted: !0,
        title: "",
        subtitle: "",
        remainTime: "",
        options: [],
        author: "",
        anonymous: !0,
        inscribe: "",
        content: "",
        more: !1,
        isAuthor: !1,
        voteUsers: [ {
            nickname: "lucifer"
        }, {
            nickname: "dianna"
        } ]
    },
    onShow: function() {
        e.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: e.globalData.hasAuthorized
        }), this.getVoteDetail(t);
    },
    onLoad: function(e) {
        if (wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        }), i.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this), 
        e.from ? this.setData({
            pageFrom: e.from,
            hint: e.hint ? e.hint : 0
        }) : this.setData({
            hint: e.hint ? e.hint : 0
        }), e.obj) {
            var a = JSON.parse(e.obj);
            t = a.id;
        } else e.detailID && (t = e.detailID);
    },
    showPreShareHint: function() {
        1 == this.data.hint && this.setData({
            showHint: !0
        });
    },
    reRequest: function() {
        this.getVoteDetail(t);
    },
    getVoteDetail: function(t) {
        var i = this;
        a.getVoteDetail({
            query: {
                theme_id: t
            },
            success: function(t) {
                if (0 === t.data.code) {
                    var a = t.data.data.theme, n = i.initlist(a);
                    r = 0;
                    var s = Date.parse(new Date()), o = !1;
                    a.deadline < s / 1e3 && (o = !0), e.globalData.user_id == a.user_id && i.setData({
                        isAuthor: !0
                    });
                    var d, h = i.remainTime(a.deadline, s / 1e3), l = "";
                    a.is_single ? d = a.anonymous ? "[单选/匿名]" : "[单选/实名]" : (d = a.anonymous ? "[多选/匿名]" : "[多选/实名]", 
                    0 != a.v_min && 0 != a.v_max ? l = a.v_min == a.v_max ? "只能选择" + a.v_min + "项" : "最少选择" + a.v_min + "项，最多选择" + a.v_max + "项" : 0 != a.v_min ? l = "最少选择" + a.v_min + "项" : 0 != a.v_max && (l = "最多选择" + a.v_max + "项")), 
                    i.setData({
                        deleted: a.deleted,
                        is_single: a.is_single,
                        mul: l,
                        v_max: a.v_max,
                        v_min: a.v_min,
                        voted: a.voted,
                        title: a.title,
                        subtitle: a.subtitle,
                        voters: a.voters,
                        options: n,
                        deadline: a.deadline,
                        outdate: o,
                        author: a.user.nickname,
                        remainTime: h,
                        anonymous: a.anonymous,
                        inscribe: null == a.inscribe ? a.user.nickname : a.inscribe,
                        isNetworkError: !1,
                        content: d,
                        forward: null == a.forward ? 1 : a.forward
                    }), i.showPreShareHint();
                } else 40012 === t.data.code ? wx.redirectTo({
                    url: "../introduction/introduction"
                }) : (i.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取投票详情失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                }));
            },
            fail: function(t) {
                i.setData({
                    isNetworkError: !0
                });
            }
        });
    },
    remainTime: function(t, e) {
        if (t < e) return "已截止";
        if (t - e > 86400) {
            a = (t - e) / 86400;
            return parseInt(a) + "天";
        }
        if (t - e > 3600) {
            a = (t - e) / 3600;
            return parseInt(a) + "小时";
        }
        if (t - e > 60) {
            var a = (t - e) / 60;
            return parseInt(a) + "分钟";
        }
        return "即将结束";
    },
    formatDate: function(t, e) {
        var a = new Date(t), i = a.getFullYear(), n = a.getMonth() + 1, s = a.getHours(), o = a.getMinutes();
        o < 10 && (o = "0" + o), n.length <= 1 && (n = "0" + n);
        var r = a.getDate();
        return r.length <= 1 && (r = "0" + r), e ? i + "年" + n + "月" + r + "日" : n + "月" + r + "日 " + s + ":" + o;
    },
    onShareAppMessage: function(a) {
        var i;
        if (a && (i = a.from, wx.reportAnalytics && !s && (s = !0, wx.reportAnalytics("share_trigger", {
            type: this.data.type,
            page_from: this.data.pageFrom,
            create_initial: this.data.hint,
            share_from: i
        }))), this.data.isAuthor || 0 != this.data.forward) {
            var n = this;
            return {
                title: e.globalData.userInfo.nickName + "邀请你参与群投票",
                path: "pages/votedetail/votedetail?from=share&detailID=" + t,
                success: function(t) {
                    n.setData({
                        showHint: !1,
                        hint: 0
                    }), wx.reportAnalytics && !o && (o = !0, wx.reportAnalytics("share_success", {
                        type: n.data.type,
                        page_from: n.data.pageFrom,
                        create_initial: n.data.hint,
                        share_from: i
                    }));
                },
                fail: function(t) {}
            };
        }
        return {
            title: "向您推荐一个小程序：",
            path: "pages/introduction/introduction",
            imageUrl: "http://ntc-qn.jianjian.tv/ntc_forward_0.jpg",
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "作者已开启禁止转发，此次转发无效",
                    showCancel: !1
                });
            },
            fail: function(t) {}
        };
    },
    changeAuthorizationState: function(e) {
        this.setData({
            hasAuthorized: e
        }), e && this.getVoteDetail(t);
    },
    requestGetUserInfo: function(t) {
        e.login({}, t.detail.userInfo);
    },
    requestAuthorization: function(t) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (n ? wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? e.login() : wx.showModal({
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
    bindUpdateTap: function(e) {
        this.data.isAuthor ? wx.navigateTo({
            url: "../vote/vote?voteId=" + t + "&origin=detail"
        }) : wx.navigateTo({
            url: "../vote/vote?origin=detail"
        });
    },
    bindNaviBackTap: function() {
        getCurrentPages().length >= 2 ? wx.navigateBack() : wx.redirectTo({
            url: "../index/index"
        });
    },
    bindShareTap: function() {
        if (!wx.canIUse || !wx.canIUse("button.open-type.share")) {
            var t = this;
            t.isAning || (t.isAning = !0, t.setData({
                mask_cls: "group-share group-share_active",
                share_wrap: "group-share__wrap",
                shareHint: "点击右上角，选择转发",
                postHint: "点击右上角，选择转发"
            }), setTimeout(function() {
                t.setData({
                    mask_cls: "group-share group-share_active group-share_hide"
                });
            }, 2e3), setTimeout(function() {
                t.setData({
                    mask_cls: "group-share",
                    share_wrap: "ui-d-n"
                }), t.isAning = !1;
            }, 3e3));
        }
    },
    bindiconTap: function(e) {
        var i = this, n = e.currentTarget.dataset.index, s = e.currentTarget.dataset.indexicon, o = this.data.options, r = o[n].voter_li, d = r[s];
        d.hasOwnProperty("more") ? a.getUserMore({
            query: {
                theme_id: t,
                id: o[n].id
            },
            data: {
                since: o[n].vl_next_since,
                num: 5
            },
            success: function(t) {
                if (0 === t.data.code) {
                    var e = t.data.data.voter_li, a = t.data.data.vl_next_since;
                    if (0 == e.length) r.splice(r.length - 1, 1); else if (r.splice(r.length - 1, 1), 
                    r = r.concat(e), e.length >= 5) {
                        var s = {
                            avatar: "../../images/more.png",
                            more: !1
                        };
                        r.push(s);
                    }
                    o[n].voter_li = r, o[n].vl_next_since = a, i.setData({
                        options: o
                    });
                } else wx.showModal({
                    title: "获取投票用户失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                });
            }
        }) : d.hasOwnProperty("show") && d.show ? d.show = !1 : d.show = !0, r[s] = d, o[n].voter_li = r, 
        this.setData({
            options: o
        });
    },
    binditemTap: function(t) {
        if (!(this.data.voted || this.data.deleted || this.data.outdate)) {
            var e = t.currentTarget.dataset.index, a = this.data.options;
            if (1 == a[e].voted) a[e].voted = !1, r--, this.data.is_single ? this.setData({
                enable: !1
            }) : 0 != this.data.v_min && 0 != this.data.v_max ? this.setData({
                enable: r >= this.data.v_min && r <= this.data.v_max
            }) : 0 != this.data.v_min ? this.setData({
                enable: r >= this.data.v_min
            }) : 0 != this.data.v_max ? this.setData({
                enable: r <= this.data.v_max
            }) : this.setData({
                enable: r > 0
            }); else if (this.data.is_single) {
                for (var i = 0; i < a.length; i++) a[i].voted = !1;
                a[e].voted = !0, r = 1, this.setData({
                    enable: !0
                });
            } else {
                if (0 != this.data.v_max && r >= this.data.v_max) return;
                a[e].voted = !0, r++, 0 != this.data.v_min && 0 != this.data.v_max ? this.setData({
                    enable: r >= this.data.v_min && r <= this.data.v_max
                }) : 0 != this.data.v_min ? this.setData({
                    enable: r >= this.data.v_min
                }) : 0 != this.data.v_max ? this.setData({
                    enable: r <= this.data.v_max
                }) : this.setData({
                    enable: r > 0
                });
            }
            this.setData({
                options: a
            });
        }
    },
    bindSaveTap: function() {
        if (this.data.enable) {
            Date.parse(new Date());
            for (var t = void 0, e = "", a = this.data.options, i = 0; i < a.length; i++) 1 == a[i].voted && void 0 != a[i].id && "" != a[i].id && (e = "" == e ? a[i].id : e + ";" + a[i].id);
            t = {
                options: e
            }, this.data.deleted || this.data.voted || "" == e || ("" == e ? wx.showModal({
                title: "提示",
                content: "请重新选择",
                showCancel: !1
            }) : this.goVoting(t));
        }
    },
    goVoting: function(e) {
        var i = this;
        a.voting({
            query: {
                theme_id: t
            },
            data: e,
            success: function(t) {
                if (0 === t.data.code) {
                    var e = t.data.data.latest, a = i.initlist(e);
                    i.setData({
                        voted: e.voted,
                        voters: e.voters,
                        options: a
                    });
                } else 40013 == t.data.code ? wx.showModal({
                    title: "提示",
                    content: "投票已结束",
                    showCancel: !1
                }) : wx.showModal({
                    title: "投票失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                });
            }
        });
    },
    initlist: function(t) {
        var e = t.voters, a = t.options, i = t.selected;
        if (0 == i.length) for (o = 0; o < a.length; o++) {
            if (0 == e) a[o].percentage = 0; else {
                n = 100 * a[o].voters / e;
                a[o].percentage = n.toFixed(0);
            }
            a[o].voted = !1;
        } else for (o = 0; o < a.length; o++) {
            if (0 == e) a[o].percentage = 0; else {
                var n = 100 * a[o].voters / e;
                a[o].percentage = n.toFixed(0);
            }
            a[o].voted = !1;
            for (var s = 0; s < i.length; s++) if (a[o].id == i[s]) {
                a[o].voted = !0;
                break;
            }
        }
        for (var o = 0; o < a.length; o++) if (a[o].hasOwnProperty("voter_li")) {
            var r = a[o].voter_li;
            if (0 == r.length) ; else if (r.length >= 5) {
                var d = {
                    avatar: "../../images/more.png",
                    more: !1
                };
                r.push(d), a[o].voter_li = r;
            }
        }
        return a;
    },
    bindIntroducetionTap: function(t) {
        wx.navigateTo({
            url: "../introduction/introduction"
        });
    }
});