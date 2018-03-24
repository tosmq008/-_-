var t, e, a, i, o = getApp(), n = require("../../api/api.js"), s = require("../../utils/notification.js"), r = require("../../api/compatibility.js"), d = require("../../widget/markdown/markdown.js"), c = !1, l = !1, u = !1, h = 30, m = "";

Page({
    data: {
        pageFrom: "list",
        isNetworkError: !1,
        type: "ntc",
        hint: 0,
        joind: !0,
        enough: !1,
        members: 0,
        memberList: [],
        shareHint: "分享到群里",
        postHint: "发布到群里",
        hasAuthorized: o.globalData.hasAuthorized,
        deleted: !1,
        share_wrap: "ui-d-n",
        mask_cls: "ui-d-n",
        navigator: "ui-d-n",
        templateID: 0,
        isAuthor: !1,
        redReady: !1,
        redStatus: "unopen",
        redMyAmountStr: "",
        redMyAmount: 0,
        redAnimation: !1,
        redCountdown: 5,
        kwords: "",
        showRead: !1,
        vcodeStatus: 0,
        designated: !1,
        desName: "",
        fundsStr: "",
        timeStr: "获取验证码",
        showMail: !1,
        eggAnime: [],
        eggEnable: !1,
        iseditNtc: !1
    },
    onShow: function() {
        o.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: o.globalData.hasAuthorized
        }), this.reRequest();
    },
    onLoad: function(e) {
        if (wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        }), a = o.globalData.shareTicket, o.globalData.shareTicket = null, s.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this), 
        e.from ? this.setData({
            type: e.type,
            hint: e.hint ? e.hint : 0,
            pageFrom: e.from
        }) : this.setData({
            type: e.type,
            hint: e.hint ? e.hint : 0
        }), e.obj) {
            var i = JSON.parse(e.obj);
            t = i.id;
        } else e.detailID && (t = e.detailID);
        "act" == e.type && (s.addNotification("__signUp__", this.successSignup.bind(this), this), 
        s.addNotification("__getActivity__", this.getActivityDetail.bind(this), this), s.addNotification("__getActivityMember__", this.getActivityMember.bind(this), this)), 
        s.addNotification("__getNote__", this.showNote.bind(this), this);
    },
    checkEgg: function() {
        221 != this.data.templateID || -1 === this.data.title.indexOf("元旦快乐") && -1 === this.data.content.indexOf("元旦快乐") ? 222 == this.data.templateID || 223 == this.data.templateID || 224 == this.data.templateID ? this.generateEggAnime("../../images/jin.png", "🎄") : 205 == this.data.templateID ? this.generateEggAnime("../../images/flower.png", "🌺") : 225 == this.data.templateID && this.generateEggAnime("../../images/bainian.png", "") : this.generateEggAnime(null, "🥚");
    },
    generateEggAnime: function(t, e) {
        for (var a = [], i = 0; i < 20; i++) {
            var o = Math.floor(3e3 * Math.random()), n = wx.createAnimation({
                duration: 5e3,
                timingFunction: "linear",
                delay: o
            }), s = 3 * Math.random() + 1, r = Math.floor(600 * Math.random() - 300);
            i < 5 && (r = Math.abs(r)), i >= 15 && (r = -Math.abs(r)), n.scale(s, s).translate(r, 1e3).step(), 
            a[i] = n.export();
        }
        var d = this;
        d.setData({
            eggEnable: !0,
            eggImg: t,
            eggChar: e
        }), setTimeout(function() {
            d.setData({
                eggAnime: a
            });
        }, 200), setTimeout(function() {
            d.setData({
                eggEnable: !1
            });
        }, 8e3);
    },
    showPreShareHint: function() {
        1 == this.data.hint && void 0 == this.data.showHint && this.setData({
            showHint: !0
        });
    },
    reRequest: function() {
        var t = this;
        wx.getShareInfo && wx.getShareInfo({
            shareTicket: a,
            success: function(e) {
                console.log(e), "ntc" == t.data.type ? t.getNoticeDetail(e) : "act" == t.data.type ? t.getActivityDetail(e) : "red" == t.data.type && t.getRedDetail(e);
            },
            fail: function(e) {
                console.log(e), "ntc" == t.data.type ? t.getNoticeDetail() : "act" == t.data.type ? t.getActivityDetail() : "red" == t.data.type && t.getRedDetail();
            },
            complete: function() {}
        });
    },
    getNoticeDetail: function(e) {
        var a = this;
        n.getNotice({
            query: {
                id: t,
                encryptedData: e && e.encryptedData ? encodeURI(e.encryptedData) : "",
                iv: e && e.iv ? encodeURI(e.iv) : ""
            },
            success: function(t) {
                0 === t.data.code ? (a.showNoticeData(t.data.data.notice), d.markdown("markdown", t.data.data.notice.content, a), 
                a.showPreShareHint(), a.setData({
                    isNetworkError: !1
                })) : 40007 === t.data.code ? wx.redirectTo({
                    url: "../introduction/introduction"
                }) : (a.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取通知详情失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                }));
            },
            fail: function(t) {
                a.setData({
                    isNetworkError: !0
                });
            }
        });
    },
    getNoticeMember: function() {
        var e = this.data.memberList, a = 0 == e.length ? 0 : e[e.length - 1].id;
        a || (a = 0);
        var i = this;
        this.noMoreNoticeMember || i.isReqNoticeMembers || (i.isReqNoticeMembers = !0, n.getNoticeViewers({
            query: {
                id: t,
                since: a,
                num: 10,
                gid: m
            },
            success: function(t) {
                if (0 === t.data.code) if (0 == (e = t.data.data.viewer_list).length) i.noMoreNoticeMember = !0, 
                i.setData({
                    navigator: "index-navigator"
                }); else {
                    i.noMoreNoticeMember = !1;
                    for (var e = t.data.data.viewer_list, a = i.data.memberList, n = 0; n < e.length; n++) {
                        var s = e[n];
                        s.time = i.formatDate(1e3 * s.created, !1), s.user_id == o.globalData.user_id ? s.isme = !0 : s.isme = !1, 
                        s.user_id == o.globalData.user_id || null != s.msg ? s.showNote = !0 : s.showNote = !1, 
                        a.push(s);
                    }
                    i.setData({
                        memberList: a
                    });
                }
            },
            complete: function() {
                i.isReqNoticeMembers = !1, setTimeout(function() {
                    i.noMoreNoticeMember = !1;
                }, 2e3);
            }
        }));
    },
    showNoticeData: function(a) {
        for (var i = this.formatDate(1e3 * a.created, !0), n = [], s = a.viewer_list, r = 0; r < s.length; r++) {
            var d = s[r];
            d.time = this.formatDate(1e3 * d.created, !1), d.user_id == o.globalData.user_id ? d.isme = !0 : d.isme = !1, 
            d.user_id == o.globalData.user_id || null != d.msg ? d.showNote = !0 : d.showNote = !1, 
            n.push(d);
        }
        var c = new Date(1e3 * a.created), l = (c.getMonth(), c.getDate(), null != a.file_no ? a.file_no : t % 1e3);
        e = a.user.nickname;
        var u = void 0 != a.inscribe && null != a.inscribe && "" != a.inscribe ? a.inscribe : a.user.nickname, h = void 0 != a.temp_id && null != a.temp_id && "" != a.temp_id ? a.temp_id : 2;
        220 == h && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#b7343a",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        }), 222 != h && 223 != h || wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ce2323",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        }), 224 == h && wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#f3e8d4",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        }), 225 == h && wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ea4a4a",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        }), 227 == h && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#2c3449",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
        var g = void 0 != a.temp_id && null != a.temp_id && "" != a.temp_id ? o.globalData.phost + "/" + a.top_pic : o.globalData.phost;
        if (m = a.group.group_id, a.kwords && a.kwords.length > 0) {
            var w = a.kwords.split("‽");
            a.kwords = "关键词：" + w.join(" ");
        }
        null == a.kwords && (a.kwords = "");
        var f, p = Date.parse(new Date()) / 1e3;
        f = a.created + a.elimit > p && a.user_id == o.globalData.user_id, this.setData({
            isAuthor: a.user_id == o.globalData.user_id,
            title: a.title,
            content: a.content,
            time: i,
            members: a.viewers,
            memberList: n,
            userName: u,
            templateID: h,
            topPic: g,
            time_year: i.substr(0, 4),
            time_id: l,
            deleted: a.deleted,
            kwords: a.kwords,
            hasGid: null != a.group.group_id,
            forward: null == a.forward ? 1 : a.forward,
            iseditNtc: f,
            createTime: a.created,
            elimit: a.elimit
        }), this.checkEgg();
    },
    getActivityDetail: function() {
        var e = this;
        n.getActivity({
            query: {
                id: t
            },
            success: function(t) {
                0 === t.data.code ? (e.showActivityData(t.data.data.activity), d.markdown("markdown", t.data.data.activity.content, e), 
                e.showPreShareHint(), t.data.data.activity.joined ? e.setData({
                    isNetworkError: !1
                }) : e.setData({
                    joind: !1,
                    isNetworkError: !1
                })) : 40008 === t.data.code ? wx.redirectTo({
                    url: "../introduction/introduction"
                }) : (e.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取活动详情失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                }));
            },
            fail: function(t) {
                e.setData({
                    isNetworkError: !0
                });
            }
        });
    },
    getActivityMember: function() {
        var e = this.data.memberList, a = 0 == e.length ? 0 : e[e.length - 1].id;
        a || (a = 0);
        var i = this;
        this.noMoreActivityMember || i.isReqActMembers || (i.isReqActMembers = !0, n.getActivityMembers({
            query: {
                id: t,
                since: a,
                num: 10
            },
            success: function(t) {
                if (0 === t.data.code) {
                    if (0 == (e = t.data.data.member_list).length) return i.noMoreActivityMember = !0, 
                    void i.setData({
                        navigator: "index-navigator"
                    });
                    var e = t.data.data.member_list, n = i.data.memberList;
                    0 === a && n.splice(0, n.length);
                    for (var s = 0; s < e.length; s++) {
                        var r = e[s];
                        r.time = i.formatDate(1e3 * r.created, !1), r.user_id == o.globalData.user_id || null != r.msg ? r.showNote = !0 : r.showNote = !1, 
                        r.cell = r.cell ? r.cell.substr(0, 3) + "-" + r.cell.substr(3, 4) + "-" + r.cell.substr(7, 4) : "", 
                        n.push(r);
                    }
                    i.setData({
                        memberList: n
                    });
                }
            },
            complete: function() {
                i.isReqActMembers = !1, setTimeout(function() {
                    i.noMoreActivityMember = !1;
                }, 2e3);
            }
        }));
    },
    showActivityData: function(a) {
        for (var i = this.formatDate(1e3 * a.created, !0), n = [], s = a.member_list, r = 0; r < s.length; r++) {
            var d = s[r];
            d.time = this.formatDate(1e3 * d.created, !1), d.user_id == o.globalData.user_id || null != d.msg ? d.showNote = !0 : d.showNote = !1, 
            d.cell = d.cell ? d.cell.substr(0, 3) + "-" + d.cell.substr(3, 4) + "-" + d.cell.substr(7, 4) : "", 
            n.push(d);
        }
        var c = new Date(1e3 * a.created), l = (c.getMonth(), c.getDate(), null != a.file_no ? a.file_no : t % 1e3);
        e = a.user.nickname;
        var u = void 0 != a.inscribe && null != a.inscribe && "" != a.inscribe ? a.inscribe : a.user.nickname, h = void 0 != a.temp_id && null != a.temp_id && "" != a.temp_id ? a.temp_id : 1, m = void 0 != a.temp_id && null != a.temp_id && "" != a.temp_id ? o.globalData.phost + "/" + a.top_pic : o.globalData.phost;
        if (a.kwords && a.kwords.length > 0) {
            var g = a.kwords.split("‽");
            a.kwords = "关键词：" + g.join(" ");
        }
        null == a.kwords && (a.kwords = ""), this.setData({
            isAuthor: a.user_id == o.globalData.user_id,
            title: a.title,
            content: a.content,
            cell_req: a.cell_req,
            name_req: a.name_req,
            time: i,
            members: a.members,
            memberList: n,
            userName: u,
            templateID: h,
            topPic: m,
            time_year: i.substr(0, 4),
            time_id: l,
            max_num: a.max_num,
            deleted: a.deleted,
            enough: a.members == a.max_num,
            kwords: a.kwords,
            user_id: a.user_id,
            joined_id: a.joined_id,
            forward: null == a.forward ? 1 : a.forward
        });
    },
    getRedDetail: function() {
        var e = this;
        n.getRed({
            query: {
                id: t
            },
            success: function(t) {
                0 === t.data.code ? (e.showRedData(t.data.data.envelope), d.markdown("markdown", t.data.data.envelope.content, e), 
                e.showPreShareHint(), e.setData({
                    isNetworkError: !1
                })) : 40029 === t.data.code ? wx.redirectTo({
                    url: "../introduction/introduction"
                }) : (e.setData({
                    isNetworkError: !0
                }), wx.showModal({
                    title: "获取红包通知详情失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                }));
            },
            fail: function(t) {
                e.setData({
                    isNetworkError: !0
                });
            }
        });
    },
    getRedMember: function() {
        var e = this.data.memberList, a = 0 == e.length ? 0 : e[e.length - 1].id;
        a || (a = 0);
        var i = this;
        this.noMoreRedMember || i.isReqRedMembers || (i.isReqRedMembers = !0, n.getRedViewers({
            query: {
                id: t,
                since: a,
                num: 10
            },
            success: function(t) {
                if (0 === t.data.code) if (0 == (e = t.data.data.viewer_list).length) i.noMoreRedMember = !0, 
                i.setData({
                    navigator: "index-navigator"
                }); else {
                    i.noMoreRedMember = !1;
                    for (var e = t.data.data.viewer_list, a = i.data.memberList, n = 0; n < e.length; n++) {
                        var s = e[n];
                        s.time = i.formatDate(1e3 * s.created, !1), s.user_id == o.globalData.user_id || null != s.msg ? s.showNote = !0 : s.showNote = !1, 
                        a.push(s);
                    }
                    i.setData({
                        memberList: a
                    });
                }
            },
            complete: function() {
                i.isReqRedMembers = !1, setTimeout(function() {
                    i.noMoreRedMember = !1;
                }, 2e3);
            }
        }));
    },
    showRedData: function(a) {
        for (var i = this, n = this.formatDate(1e3 * a.created, !0), s = [], r = a.viewer_list, d = 0; d < r.length; d++) {
            var c = r[d];
            c.time = this.formatDate(1e3 * c.created, !1), c.user_id == o.globalData.user_id || null != c.msg ? c.showNote = !0 : c.showNote = !1, 
            s.push(c);
        }
        var l = new Date(1e3 * a.created), u = (l.getMonth(), l.getDate(), null != a.file_no ? a.file_no : t % 1e3);
        e = a.user.nickname;
        var h = void 0 != a.inscribe && null != a.inscribe && "" != a.inscribe ? a.inscribe : a.user.nickname, m = void 0 != a.temp_id && null != a.temp_id && "" != a.temp_id ? o.globalData.phost + "/" + a.top_pic : o.globalData.phost, g = new Date(), w = "unopen", f = "", p = 0;
        if (a.opened) w = "opened", f = new Number(a.packet / 100).toFixed(2), p = a.packet; else if (g - l >= 864e5) w = "expired"; else if (a.e_num <= a.openers) w = "empty"; else if (5 == this.data.redCountdown) var v = setInterval(function() {
            var t = i.data.redCountdown - 1;
            i.setData({
                redCountdown: t
            }), 0 == t && clearInterval(v);
        }, 1e3);
        if (a.kwords && a.kwords.length > 0) {
            var b = a.kwords.split("‽");
            a.kwords = "关键词：" + b.join(" ");
        }
        null == a.kwords && (a.kwords = "");
        var _ = new Number(a.funds / 100).toFixed(2);
        this.setData({
            isAuthor: a.user_id == o.globalData.user_id,
            title: a.title,
            content: a.content,
            time: n,
            members: a.viewers,
            memberList: s,
            userName: h,
            templateID: a.designated ? 219 : 208,
            topPic: m,
            redReady: a.is_ready,
            redStatus: w,
            redMyAmount: p,
            redMyAmountStr: f,
            time_year: n.substr(0, 4),
            time_id: u,
            deleted: a.deleted,
            kwords: a.kwords,
            designated: a.designated,
            desName: a.des_name,
            fundsStr: _,
            forward: null == a.forward ? 0 : a.forward
        }), "red" == this.data.type && wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#F85A4D",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
    },
    showNote: function(t) {
        for (var e = this.data.memberList, a = 0; a < e.length; a++) if (e[a].user_id == o.globalData.user_id) {
            e[a].msg = t.note, this.setData({
                memberList: e
            });
            break;
        }
    },
    formatDate: function(t, e) {
        var a = new Date(t), i = a.getFullYear(), o = a.getMonth() + 1, n = a.getHours(), s = a.getMinutes(), r = a.getSeconds();
        r < 10 && (r = "0" + r), s < 10 && (s = "0" + s), o.length <= 1 && (o = "0" + o);
        var d = a.getDate();
        return d.length <= 1 && (d = "0" + d), e ? i + "年" + o + "月" + d + "日" : o + "月" + d + "日 " + n + ":" + s + ":" + r;
    },
    joinActivity: function() {
        var e = this.data.cell_req, a = this.data.name_req, i = this;
        if (e || a) wx.navigateTo({
            url: "../signup/signup?detailID=" + t + "&cell=" + e + "&name=" + a
        }); else {
            var o = {
                cell: "",
                act: "post"
            };
            i.isJoinAct || (i.isJoinAct = !0, n.joinActivity({
                query: {
                    id: t
                },
                data: o,
                success: function(t) {
                    0 === t.data.code ? (console.log("报名成功"), wx.showToast({
                        title: "报名成功",
                        icon: "success",
                        duration: 2e3
                    }), i.successSignup({
                        id: t.data.data.id
                    })) : 40009 === t.data.code ? (wx.showToast({
                        title: "您已报名",
                        icon: "success",
                        duration: 2e3
                    }), s.postNotificationName("__getActivity__"), s.postNotificationName("__getActivityMember__")) : 40016 === t.data.code ? (wx.showModal({
                        title: "提示",
                        content: "报名人数已满",
                        showCancel: !1
                    }), s.postNotificationName("__getActivity__"), s.postNotificationName("__getActivityMember__")) : wx.showModal({
                        title: "报名失败",
                        content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                },
                fail: function(t) {
                    console.log("报名失败");
                },
                complete: function() {
                    i.isJoinAct = !1;
                }
            }));
        }
    },
    joinCancel: function() {
        var t = this, e = this.data.joined_id;
        if ("" != e && "undefine" != e) {
            var a = {
                act: "cancel",
                member_id: e
            };
            n.cancelJoin({
                query: {
                    id: e
                },
                data: a,
                success: function(a) {
                    if (0 === a.data.code) {
                        console.log("取消报名成功"), wx.showToast({
                            title: "取消报名成功",
                            icon: "success",
                            duration: 2e3
                        });
                        for (var i = t.data.memberList, o = 0; i.length; o++) if (i[o].id == e) {
                            i.splice(o, 1);
                            break;
                        }
                        var n = t.data.members - 1;
                        t.setData({
                            memberList: i,
                            members: n,
                            joind: !1
                        }), s.removeNotification("__signUp__", t);
                    } else wx.showModal({
                        title: "取消报名失败",
                        content: "[" + (a.data.code || a.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                },
                fail: function(t) {
                    console.log("取消报名失败");
                },
                complete: function() {}
            });
        }
    },
    getMail: function() {
        this.setData({
            showMail: !0
        });
    },
    hideMail: function() {
        this.setData({
            showMail: !1
        });
    },
    successSignup: function(t) {
        var e = {};
        e.time = "刚刚", t && (e.cell = t.cell ? t.cell.substr(0, 3) + "-" + t.cell.substr(3, 4) + "-" + t.cell.substr(7, 4) : "", 
        e.id = t.id), e.user = o.globalData.userInfo, e.user.avatar = o.globalData.userInfo.avatarUrl, 
        e.user.nickname = t && t.name ? t.name : o.globalData.userInfo.nickName, e.user.user_id = o.globalData.user_id, 
        e.user_id = o.globalData.user_id, e.msg = null, e.showNote = !0;
        var a = this.data.memberList;
        a.splice(0, 0, e);
        var i = this.data.members + 1;
        this.setData({
            memberList: a,
            members: i,
            joined_id: t.id,
            joind: !0
        }), s.removeNotification("__signUp__", this);
    },
    onReachBottom: function() {
        var t = this.data.memberList.slice(-1).pop();
        t && t.id && ("ntc" == this.data.type ? this.getNoticeMember() : "act" == this.data.type ? this.getActivityMember() : "red" == this.data.type && this.getRedMember());
    },
    onShareAppMessage: function(e) {
        var a;
        e && (a = e.from, wx.reportAnalytics && !c && (c = !0, wx.reportAnalytics("share_trigger", {
            type: this.data.type,
            page_from: this.data.pageFrom,
            create_initial: this.data.hint,
            share_from: a
        })));
        var i = this, o = "", n = "", s = "";
        return i.data.isAuthor || 1 == i.data.forward ? (o = "red" == this.data.type ? "[微信红包]恭喜发财，大吉大利" : "ntc" == this.data.type ? "您有一条新通知，点击查看" : "有新活动邀请您参加，点击查看", 
        n = "pages/detail/detail?from=share&detailID=" + t + "&type=" + this.data.type) : (o = "向您推荐一个小程序：", 
        n = "pages/introduction/introduction", s = "http://ntc-qn.jianjian.tv/ntc_forward_0.jpg"), 
        {
            title: o,
            path: n,
            imageUrl: s,
            success: function(t) {
                i.data.isAuthor || 1 == i.data.forward ? (i.setData({
                    showHint: !1
                }), wx.reportAnalytics && !l && (l = !0, wx.reportAnalytics("share_success", {
                    type: i.data.type,
                    page_from: i.data.pageFrom,
                    create_initial: i.data.hint,
                    share_from: a
                }))) : wx.showModal({
                    title: "提示",
                    content: "作者已开启禁止转发，此次转发无效",
                    showCancel: !1
                });
            },
            fail: function(t) {}
        };
    },
    changeAuthorizationState: function(t) {
        this.setData({
            hasAuthorized: t
        }), t && this.reRequest();
    },
    requestGetUserInfo: function(t) {
        o.login({}, t.detail.userInfo);
    },
    requestAuthorization: function(t) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (r ? wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? o.login() : wx.showModal({
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
    bindUpdateTap: function(t) {
        "red" != this.data.type ? wx.navigateTo({
            url: "../update/update?type=" + this.data.type + "&template=" + this.data.templateID + "&origin=detail"
        }) : wx.navigateTo({
            url: "../redDescription/redDescription"
        });
    },
    bindIditNtc: function(e) {
        var a = Date.parse(new Date()) / 1e3;
        this.data.createTime + this.data.elimit <= a ? (this.setData({
            iseditNtc: !1
        }), wx.showModal({
            title: "操作失败",
            content: "超过可重新编辑时间（" + this.data.elimit + "秒）",
            showCancel: !1
        })) : wx.navigateTo({
            url: "../update/update?type=" + this.data.type + "&template=" + this.data.templateID + "&noticeId=" + t + "&origin=detail"
        });
    },
    bindMemberTap: function(t) {
        t.currentTarget.dataset.member.cell && wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.member.cell
        });
    },
    bindIntroductionTap: function(t) {
        wx.navigateTo({
            url: "../introduction/introduction"
        });
    },
    bindNicknameTap: function(t) {
        var e = t.target.dataset.id;
        wx.navigateTo({
            url: "../note/note?cellId=" + e + "&type=gNickname&gid=" + m
        });
    },
    bindNoteTap: function(t) {
        var e = t.target.dataset.id;
        wx.navigateTo({
            url: "../note/note?cellId=" + e + "&type=" + this.data.type
        });
    },
    bindRedOpenTap: function(t) {
        this.data.designated ? this.openMyRed() : this.redOpen(t);
    },
    redOpen: function(e) {
        var a = this;
        a.isOpenRed || (a.isOpenRed = !0, this.setData({
            redAnimation: !0
        }), n.openRed({
            data: {
                formid: e.detail.formId
            },
            query: {
                id: t
            },
            success: function(t) {
                a.openRedSuccess(t);
            },
            fail: function(t) {
                console.log("打开红包失败");
            },
            complete: function() {
                a.isOpenRed = !1, a.setData({
                    redAnimation: !1
                });
            }
        }));
    },
    formSubmitMyRedCard: function(e) {
        var a = e.detail.value, i = a.vcode, o = a.cell, s = this;
        "" != i && "" != o && (s.isOpenRed || (s.isOpenRed = !0, this.setData({
            redAnimation: !0
        }), n.getYourRed({
            data: {
                formid: e.detail.formId,
                vcode: i,
                cell: o
            },
            query: {
                envelope_id: t
            },
            success: function(t) {
                0 === t.data.code ? s.closeMyRed() : wx.showModal({
                    title: "错误",
                    content: "错误编码" + t.data.code,
                    showCancel: !1
                }), s.openRedSuccess(t);
            },
            fail: function(t) {
                console.log("打开红包失败");
            },
            complete: function() {
                s.isOpenRed = !1, s.setData({
                    redAnimation: !1
                });
            }
        })));
    },
    formSubmitMail: function(e) {
        var a = e.detail.value.mail, i = this;
        "" != a && n.outputMail({
            data: {
                formid: e.detail.formId,
                mail: a
            },
            query: {
                activity_id: t
            },
            success: function(t) {
                0 === t.data.code ? (i.hideMail(), wx.showModal({
                    title: "提示",
                    content: "邮件已发送，请注意查收",
                    showCancel: !1
                })) : wx.showModal({
                    title: "错误",
                    content: "错误编码" + t.data.code,
                    showCancel: !1
                });
            },
            fail: function(t) {
                console.log("打开红包失败");
            }
        });
    },
    openRedSuccess: function(e) {
        if (0 === e.data.code) {
            var a = new Number(e.data.data.packet / 100).toFixed(2), i = e.data.data.packet;
            this.setData({
                redMyAmount: i,
                redMyAmountStr: a
            }), wx.navigateTo({
                url: "../redetail/redetail?objID=" + t
            });
        } else 40037 === e.data.code ? wx.showModal({
            title: "验证码错误",
            content: "请5秒后重新输入验证码",
            showCancel: !1
        }) : 40027 === e.data.code ? wx.showModal({
            title: "打开红包失败",
            content: "等待时间不足，打开通知5秒后才能开启红包",
            showCancel: !1
        }) : 40029 === e.data.code ? (wx.showModal({
            title: "打开红包失败",
            content: "红包通知不存在或已被删除",
            showCancel: !1
        }), this.setData({
            redStatus: "blank"
        })) : 40023 === e.data.code ? wx.showModal({
            title: "打开红包失败",
            content: "频繁开启红包",
            showCancel: !1
        }) : 40026 === e.data.code ? wx.showModal({
            title: "打开红包失败",
            content: "红包通知尚未就绪",
            showCancel: !1
        }) : 40030 === e.data.code ? (wx.showModal({
            title: "打开红包失败",
            content: "红包通知已过期",
            showCancel: !1
        }), this.setData({
            redStatus: "expired"
        })) : 40031 === e.data.code || 40033 === e.data.code || 40034 === e.data.code ? (wx.showModal({
            title: "打开红包失败",
            content: "红包已被抢空",
            showCancel: !1
        }), this.setData({
            redStatus: "empty"
        })) : 40032 === e.data.code ? (wx.showModal({
            title: "打开红包失败",
            content: "重复抢红包",
            showCancel: !1
        }), this.setData({
            redStatus: "blank"
        })) : 40038 === e.data.code ? wx.showModal({
            title: "打开红包失败",
            content: "请输入正确的领取人手机",
            showCancel: !1
        }) : wx.showModal({
            title: "打开红包失败",
            content: "[" + (e.data.code || e.statusCode) + "]请检查网络或稍后重试。",
            showCancel: !1
        });
    },
    openMyRed: function() {
        this.setData({
            showRead: !0
        });
    },
    closeMyRed: function() {
        this.setData({
            showRead: !1,
            vcodeStatus: 0
        });
    },
    bindRedDetailTap: function(e) {
        wx.navigateTo({
            url: "../redetail/redetail?objID=" + t
        });
    },
    bindWithdrawTap: function(t) {
        wx.navigateTo({
            url: "../withdraw/withdraw"
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
    bindRedCellInput: function(t) {
        t.detail.value = t.detail.value.replace(/[^\d]/g, ""), this.setData({
            red_cell: t.detail.value
        });
    },
    bindRedCodeInput: function(t) {
        t.detail.value = t.detail.value.replace(/[^\d]/g, ""), this.setData({
            red_code: t.detail.value
        });
    },
    bindRedSendCode: function(e) {
        var a = this;
        u || (30 == h && (u = !0, i = setInterval(function() {
            0 == h ? (clearInterval(i), u = !1, h = 30, a.setData({
                timeStr: "获取验证码",
                vcodeStatus: 0
            })) : (h--, a.setData({
                timeStr: h + "S"
            }));
        }, 1e3)), this.data.vcodeStatus > 0 || (/^1[34578]\d{9}$/.test(this.data.red_cell) ? (this.setData({
            vcodeStatus: 1
        }), n.getRedCode({
            data: {
                cell: this.data.red_cell
            },
            query: {
                envelope_id: t
            },
            success: function(t) {
                0 === t.data.code ? a.setData({
                    vcodeStatus: 2
                }) : 40038 === t.data.code ? (wx.showModal({
                    title: "发送验证码失败",
                    content: "请输入正确的领取人手机",
                    showCancel: !1
                }), a.setData({
                    vcodeStatus: 0
                })) : 40039 === t.data.code ? (wx.showModal({
                    title: "验证码已下发",
                    content: "请查看短信获取验证码",
                    showCancel: !1
                }), a.setData({
                    vcodeStatus: 0
                })) : (wx.showModal({
                    title: "发送验证码失败",
                    content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                    showCancel: !1
                }), a.setData({
                    vcodeStatus: 0
                }));
            },
            fail: function(t) {
                console.log("发送验证码失败"), a.setData({
                    vcodeStatus: 0
                });
            },
            complete: function() {}
        })) : wx.showModal({
            title: "提示",
            content: "请输入合法的手机号",
            showCancel: !1
        })));
    }
});