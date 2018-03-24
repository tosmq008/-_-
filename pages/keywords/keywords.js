var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

getApp(), require("../../api/api.js"), require("../../utils/notification.js"), require("../../api/compatibility.js");

Page({
    data: {
        pageFrom: "list",
        isNetworkError: !1,
        keyList: [],
        hasAuthorized: !0,
        keywordValid: !1,
        focus: !0
    },
    onLoad: function(e) {
        var o = wx.getStorageSync("keywords");
        "object" == (void 0 === o ? "undefined" : t(o)) && this.setData({
            keyList: o
        });
    },
    bindKeyInput: function(t) {
        var e = t.detail.value;
        this.setData({
            keywordValid: !!e,
            keyword: e
        });
    },
    bindCloseTap: function(t) {
        var e = t.currentTarget.dataset.indexicon, o = this.data.keyList;
        o.splice(e, 1), this.setData({
            keyList: o
        }), this.save();
    },
    addKey: function(t) {
        var e = this.data.keyword, o = this.data.keyList;
        e && 0 != e.length && (e.length > 7 ? wx.showModal({
            title: "提示",
            content: "关键字最多7个字",
            showCancel: !1
        }) : o.length >= 7 ? wx.showModal({
            title: "提示",
            content: "最多只能输入7组关键字",
            showCancel: !1
        }) : (o.push(e), this.setData({
            keyList: o,
            keyword: "",
            keywordValid: !1,
            focus: !1
        }), this.save(), this.setData({
            focus: !0
        })));
    },
    save: function() {
        var t = this.data.keyList;
        t.join(";',';");
        wx.setStorageSync("keywords", t), console.log("看看", wx.getStorageSync("keywords"));
    }
});