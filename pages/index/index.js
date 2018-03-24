var t, e, a, i, s = require("../../api/api.js"), n = require("../../utils/notification.js"), o = (require("../../utils/util.js"), 
require("../../api/compatibility.js")), r = getApp(), c = !1, d = !1, h = !1, l = 0, u = 0;

Page({
    data: {
        tab: "sent",
        recvList: [],
        sentList: [],
        hasAuthorized: r.globalData.hasAuthorized,
        isNetworkErrorRecv: !1,
        isNetworkErrorSent: !1,
        lineAnime: {}
    },
    onLoad: function() {
        n.addNotification("__refreshIndex__", this.fetchSentData.bind(this, 0), this), n.addNotification("__refreshSent__", this.fetchSentData.bind(this, 0), this), 
        n.addNotification("__refreshIndex__", this.fetchRecvData.bind(this, 0), this), n.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this), 
        r.globalData.hasLogin && (this.fetchSentData(0), this.fetchRecvData(0));
    },
    onShow: function() {
        r.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: r.globalData.hasAuthorized
        });
    },
    onPullDownRefresh: function() {
        "recv" == this.data.tab ? this.fetchRecvData(0) : this.fetchSentData(0);
    },
    onReachBottom: function() {
        "recv" == this.data.tab ? 0 == c && 0 != l && this.fetchRecvData(l) : 0 == d && 0 != u && this.fetchSentData(u);
    },
    bindRecvTap: function(t) {
        if ("sent" == this.data.tab) {
            var e = wx.createAnimation({
                duration: 1e3,
                timingFunction: "ease"
            });
            e.translate(wx.getSystemInfoSync().windowWidth / 2, 0).step({
                duration: 500
            }), this.setData({
                lineAnime: e.export(),
                tab: "recv"
            });
        }
        0 == this.data.recvList.length && this.fetchRecvData(0);
    },
    bindSentTap: function(t) {
        if ("recv" == this.data.tab) {
            var e = wx.createAnimation({
                duration: 1e3,
                timingFunction: "ease"
            });
            e.translate(0, 0).step({
                duration: 500
            }), this.setData({
                lineAnime: e.export(),
                tab: "sent"
            });
        }
        0 == this.data.sentList.length && this.fetchSentData(0);
    },
    bindAddTap: function(t) {
        wx.showActionSheet({
            itemList: [ "发布通知", "发布活动", "发起投票", "发起签到", "群骰子" ],
            success: function(t) {
                t.cancel || (0 == t.tapIndex ? wx.navigateTo({
                    url: "../update/update?type=ntc&origin=index"
                }) : 1 == t.tapIndex ? wx.navigateTo({
                    url: "../update/update?type=act&origin=index"
                }) : 2 == t.tapIndex ? wx.navigateTo({
                    url: "../vote/vote?origin=index"
                }) : 3 == t.tapIndex ? wx.navigateToMiniProgram({
                    appId: "wx68ebc0d25c950db9",
                    path: "pages/index/index",
                    success: function(t) {
                        console.log("打开群签到成功");
                    }
                }) : 4 == t.tapIndex && wx.navigateToMiniProgram({
                    appId: "wxcb58b5da94eced7e",
                    path: "pages/main/main",
                    success: function(t) {
                        console.log("打开群骰子成功");
                    }
                }));
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    detailTap: function(t) {
        var e = t.currentTarget.dataset.obj, s = {
            id: e.id
        };
        i - a < 350 && ("t" == e.type ? wx.navigateTo({
            url: "../votedetail/votedetail?detailID=" + e.id
        }) : "n" == e.type ? wx.navigateTo({
            url: "../detail/detail?type=ntc&obj=" + JSON.stringify(s)
        }) : "a" == e.type ? wx.navigateTo({
            url: "../detail/detail?type=act&obj=" + JSON.stringify(s)
        }) : "d" == e.type ? wx.showModal({
            title: "提示",
            content: "祝福相关已经下线，欢迎使用其他功能",
            showCancel: !1
        }) : "e" == e.type && wx.navigateTo({
            url: "../detail/detail?type=red&obj=" + JSON.stringify(s)
        }));
    },
    fetchSentData: function(t) {
        var e = this;
        if (1 != h) {
            h = !0;
            var a = this;
            s.getSentMsgs({
                query: {
                    since: t || 0,
                    num: 10
                },
                success: function(i) {
                    if (0 === i.data.code) {
                        u = i.data.data.next_since;
                        var s = i.data.data.msg_list;
                        s.forEach(function(t) {
                            if (t.time = a.formatDate(1e3 * t.created), "n" == t.type || "e" == t.type ? t.num = t.viewers : "a" == t.type ? t.num = t.members : "t" == t.type ? t.num = t.voters : "d" == t.type && (t.num = t.wishes), 
                            t.kwords && t.kwords.length > 0) {
                                var e = t.kwords.split("‽");
                                t.keywords = "关键词：" + e.join(" ");
                            }
                        }), void 0 == t || 0 == t ? (d = !1, a.setData({
                            sentList: s,
                            isNetworkErrorSent: !1
                        })) : 0 == s.length ? (d = !0, a.setData({
                            isNetworkErrorSent: !1
                        })) : a.setData({
                            sentList: e.data.sentList.concat(s),
                            isNetworkErrorSent: !1
                        });
                    } else wx.showModal({
                        title: "获取发件箱列表失败",
                        content: "[" + (i.data.code || i.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                },
                fail: function(t) {
                    0 === a.data.sentList.length && a.setData({
                        isNetworkErrorSent: !0
                    });
                },
                complete: function() {
                    h = !1, wx.stopPullDownRefresh();
                }
            });
        } else wx.stopPullDownRefresh();
    },
    fetchRecvData: function(t) {
        var e = this;
        if (1 != h) {
            h = !0;
            var a = this;
            s.getRecvMsgs({
                query: {
                    since: t || 0,
                    num: 10
                },
                success: function(i) {
 
                    if (0 === i.data.code) {
                        l = i.data.data.next_since;
                        var s = i.data.data.msg_list;
                        s.forEach(function(t) {
                            if (t.time = a.formatDate(1e3 * t.created), t.num = t.user.nickname, t.kwords && t.kwords.length > 0) {
                                var e = t.kwords.split("‽");
                                t.keywords = "关键词：" + e.join(" ");
                            }
                        }), void 0 == t || 0 == t ? (c = !1, a.setData({
                            recvList: s,
                            isNetworkErrorRecv: !1
                        })) : 0 == s.length ? (c = !0, a.setData({
                            isNetworkErrorRecv: !1
                        })) : a.setData({
                            recvList: e.data.recvList.concat(s),
                            isNetworkErrorRecv: !1
                        });
                    } else wx.showModal({
                        title: "获取收件箱列表失败",
                        content: "[" + (i.data.code || i.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                },
                fail: function(t) {
                    0 === a.data.recvList.length && a.setData({
                        isNetworkErrorRecv: !0
                    });
                },
                complete: function() {
                    h = !1, wx.stopPullDownRefresh();
                }
            });
        } else wx.stopPullDownRefresh();
    },
    formatDate: function(t) {
        var e = new Date(t), a = e.getFullYear(), i = e.getMonth() + 1, s = (e.getHours(), 
        e.getMinutes());
        s < 10 && (s = "0" + s), i.length <= 1 && (i = "0" + i);
        var n = e.getDate();
        return n.length <= 1 && (n = "0" + n), a != new Date().getFullYear() ? a + "-" + i + "-" + n : i + "-" + n;
    },
    changeAuthorizationState: function(t) {
        this.setData({
            hasAuthorized: t
        });
    },
    reRequestRecv: function() {
        this.fetchRecvData(0);
    },
    reRequestSent: function() {
        this.fetchSentData(0);
    },
    requestGetUserInfo: function(t) {
        r.login({}, t.detail.userInfo);
    },
    requestAuthorization: function(t) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (o ? wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? r.login() : wx.showModal({
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
    touchS: function(i) {
        1 == i.touches.length && (t = i.touches[0].clientX, e = i.touches[0].clientY), a = i.timeStamp;
    },
    touchM: function(a) {
        if (1 == a.touches.length) {
            var i = a.touches[0].clientX, s = t - i, n = a.touches[0].clientY;
            if (e - n > 100) return;
            var o = "";
            0 == s || s < 50 ? o = "left:0px" : s > 50 && (o = "left:-" + s + "px", s >= 200 && (o = "left:-200rpx"));
            var r = a.currentTarget.dataset.obj;
            if ("recv" == this.data.tab) {
                for (d = 0; d < this.data.recvList.length; d++) if (this.data.recvList[d].id == r.id) {
                    c = d / 1;
                    break;
                }
                (h = this.data.recvList)[c].txtStyle = o, this.setData({
                    recvList: h
                });
            } else {
                for (var c, d = 0; d < this.data.sentList.length; d++) if (this.data.sentList[d].id == r.id) {
                    c = d / 1;
                    break;
                }
                var h = this.data.sentList;
                h[c].txtStyle = o, this.setData({
                    sentList: h
                });
            }
        }
    },
    touchE: function(e) {
        if (i = e.timeStamp, 1 == e.changedTouches.length) {
            var a = e.changedTouches[0].clientX, s = t - a > 100 ? "left:-200rpx" : "left:0px", n = e.currentTarget.dataset.obj;
            if ("recv" == this.data.tab) {
                for (r = 0; r < this.data.recvList.length; r++) if (this.data.recvList[r].id == n.id) {
                    o = r / 1;
                    break;
                }
                (c = this.data.recvList)[o].txtStyle = s, this.setData({
                    recvList: c
                });
            } else {
                for (var o, r = 0; r < this.data.sentList.length; r++) if (this.data.sentList[r].id == n.id) {
                    o = r / 1;
                    break;
                }
                var c = this.data.sentList;
                c[o].txtStyle = s, this.setData({
                    sentList: c
                });
            }
        }
    },
    detailLongTap: function(t) {
        var e = this, a = t.currentTarget.dataset.obj;
        wx.showActionSheet({
            itemList: [ "删除" ],
            success: function(t) {
                t.cancel || e.del(a, e);
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    delItem: function(t) {
        var e = t.currentTarget.dataset.item, a = this;
        this.del(e, a);
    },
    del: function(t, e) {
        if ("recv" == e.data.tab) {
            for (i = 0; i < e.data.recvList.length; i++) if (e.data.recvList[i].id == t.id) {
                a = i / 1;
                break;
            }
            s.delRecvMsgs({
                query: {
                    mid: t.id
                },
                data: {
                    type: t.type,
                    act: "del",
                    mid: t.id
                },
                success: function(t) {
                    if (0 === t.data.code) {
                        wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        });
                        var i = e.data.recvList;
                        i.splice(a, 1), e.setData({
                            recvList: i
                        });
                    } else wx.showModal({
                        title: "删除收件箱失败",
                        content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                }
            });
        } else {
            for (var a, i = 0; i < e.data.sentList.length; i++) if (e.data.sentList[i].id == t.id) {
                a = i / 1;
                break;
            }
            var n = {
                query: {
                    delete_id: t.id
                },
                data: {
                    act: "del"
                },
                success: function(t) {
                    if (0 === t.data.code) {
                        wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        });
                        var i = e.data.sentList;
                        i.splice(a, 1), e.setData({
                            sentList: i
                        });
                    } else wx.showModal({
                        title: "删除发件箱失败",
                        content: "[" + (t.data.code || t.statusCode) + "]请检查网络或稍后重试。",
                        showCancel: !1
                    });
                }
            };
            "a" == t.type ? s.delSendAct(n) : "n" == t.type ? s.delSendMsg(n) : "t" == t.type ? s.delSendVote(n) : "d" == t.type ? s.delSendBlessing(n) : "e" == t.type && s.delSendRed(n);
        }
    }
});