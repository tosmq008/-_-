var e = require("../utils/proxy"), n = "https://notice.jianjian.tv", t = getApp(), i = function(n, i) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET";
    if (!t.globalData.hasLogin) return t.login(), void (n.complete && n.complete());
    var u = setTimeout(function() {
        wx.showToast({
            title: "加载中",
            icon: "loading"
        });
    }, 300);
    wx.showNavigationBarLoading(), e.request({
        url: i,
        method: n.method || r,
        data: n.data || {},
        header: {
            "NTC-User-Token": t.globalData.user_token
        },
        success: function(e) {
            40001 == e.data.code ? t.login() : n.success && n.success(e);
        },
        fail: function(e) {
            wx.showModal({
                title: "提示",
                content: "网络异常，请重试",
                showCancel: !1
            }), n.fail && n.fail(e);
        },
        complete: function(e) {
            u && clearTimeout(u), wx.hideToast(), wx.hideNavigationBarLoading(), n.complete && n.complete(e);
        }
    });
};

module.exports = {
    postNotice: function(e) {
        return i(e, n + "/v1.5/notices", "POST");
    },
    editNotice: function(e) {
        return i(e, n + "/v1.1/notices/" + e.query.id, "POST");
    },
    getNotice: function(e) {
        return i(e, n + "/v1.1/notices/" + e.query.id + "?encryptedData=" + e.query.encryptedData + "&iv=" + e.query.iv);
    },
    getNoticeViewers: function(e) {
        return i(e, n + "/v1.1/notices/" + e.query.id + "/viewers?since=" + e.query.since + "&num=" + e.query.num + "&gid=" + e.query.gid);
    },
    postActivity: function(e) {
        return i(e, n + "/v1.4/activities", "POST");
    },
    editActivity: function(e) {
        return i(e, n + "/v1.0/activities/" + e.query.id, "POST");
    },
    getActivity: function(e) {
        return i(e, n + "/v1.0/activities/" + e.query.id);
    },
    joinActivity: function(e) {
        return i(e, n + "/v1.2/activities/" + e.query.id + "/members", "POST");
    },
    getActivityMembers: function(e) {
        return i(e, n + "/v1.0/activities/" + e.query.id + "/members?since=" + e.query.since + "&num=" + e.query.num);
    },
    cancelJoin: function(e) {
        return i(e, n + "/v1.0/activity_members/" + e.query.id, "POST");
    },
    getSentMsgs: function(e) {
        return i(e, n + "/v1.1/msgs?tp=out&since=" + e.query.since + "&num=" + e.query.num);
    },
    getRecvMsgs: function(e) {
        return i(e, n + "/v1.1/msgs?tp=in&since=" + e.query.since + "&num=" + e.query.num);
    },
    delRecvMsgs: function(e) {
        return i(e, n + "/v1.0/inmsgs/" + e.query.mid, "POST");
    },
    delSendAct: function(e) {
        return i(e, n + "/v1.0/activities/" + e.query.delete_id, "POST");
    },
    delSendMsg: function(e) {
        return i(e, n + "/v1.0/notices/" + e.query.delete_id, "POST");
    },
    delSendVote: function(e) {
        return i(e, n + "/v1.0/themes/" + e.query.delete_id, "POST");
    },
    delSendBlessing: function(e) {
        return i(e, n + "/v1.0/desires/" + e.query.delete_id, "POST");
    },
    delSendRed: function(e) {
        return i(e, n + "/v1.0/envelopes/" + e.query.delete_id, "POST");
    },
    leaveMessage: function(e) {
        return i(e, n + "/v1.0/leave_msg/" + e.query.id, "POST");
    },
    leaveRedMessage: function(e) {
        return i(e, n + "/v1.0/envelope_viewers/" + e.query.id + "/msgs", "POST");
    },
    getVoteDetail: function(e) {
        return i(e, n + "/v1.3/themes/" + e.query.theme_id);
    },
    voting: function(e) {
        return i(e, n + "/v1.3/themes/" + e.query.theme_id + "/votes", "POST");
    },
    postVote: function(e) {
        return i(e, n + "/v1.3/themes", "POST");
    },
    getUserMore: function(e) {
        return i(e, n + "/v1.0/themes/" + e.query.theme_id + "/options/" + e.query.id + "/voters");
    },
    getBlessingDetail: function(e) {
        return i(e, n + "/v1.0/desires/" + e.query.desire_id);
    },
    sendBlessing: function(e) {
        return i(e, n + "/v1.0/desires/" + e.query.desire_id + "/wishes", "POST");
    },
    getBlessingList: function(e) {
        return i(e, n + "/v1.0/desires/" + e.query.desire_id + "/wishes?since=" + e.query.since + "&num=" + e.query.num);
    },
    greetings: function(e) {
        return i(e, n + "/v1.0/desires/" + e.query.id + "/comments", "POST");
    },
    postBlessing: function(e) {
        return i(e, n + "/v1.0/desires", "POST");
    },
    getGreetingsList: function(e) {
        return i(e, n + "/v1.0/desires/" + e.query.desire_id + "/comments?since=" + e.query.since + "&num=" + e.query.num);
    },
    getRed: function(e) {
        return i(e, n + "/v1.0/envelopes/" + e.query.id);
    },
    getRedViewers: function(e) {
        return i(e, n + "/v1.0/envelopes/" + e.query.id + "/viewers?since=" + e.query.since + "&num=" + e.query.num);
    },
    openRed: function(e) {
        return i(e, n + "/v1.0/envelopes/" + e.query.id + "/openers", "POST");
    },
    payMoney: function(e) {
        return i(e, n + "/v1.0/orders/t", "POST");
    },
    payMeMoney: function(e) {
        return i(e, n + "/v1.0/transfers/t", "POST");
    },
    getRedList: function(e) {
        return i(e, n + "/v1.0/envelopes/" + e.query.envelope_id + "/openers?since=" + e.query.since + "&num=" + e.query.num);
    },
    withdraw: function(e) {
        return i(e, n + "/v1.0/user_withdraw", "POST");
    },
    drawhome: function(e) {
        return i(e, n + "/v1.0/drawhome");
    },
    bills: function(e) {
        return i(e, n + "/v1.0/bills?since=" + e.query.since + "&num=" + e.query.num);
    },
    postredNotice: function(e) {
        return i(e, n + "/v1.2/envelopes", "POST");
    },
    getYourRed: function(e) {
        return i(e, n + "/v1.1/des_envelopes/" + e.query.envelope_id + "/openers", "POST");
    },
    getRedCode: function(e) {
        return i(e, n + "/v1.0/envelopes/" + e.query.envelope_id + "/vcodes", "POST");
    },
    outputMail: function(e) {
        return i(e, n + "/v1.0/activities/" + e.query.activity_id + "/mail", "POST");
    },
    changeGroupName: function(e) {
        return i(e, n + "/v1.0/usergnames", "POST");
    },
    getEditNtc: function(e) {
        return i(e, n + "/v1.0/notices/" + e.query.notice_id + "/edit_detail");
    },
    getEditVote: function(e) {
        return i(e, n + "/v1.0/themes/" + e.query.id + "/edit_detail");
    }
};