var t, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../api/api.js"), o = require("../../utils/notification.js"), i = (require("../../utils/util"), 
require("../../utils/qiniuUploader"), require("../../widget/image-uploader/image-uploader.js")), n = getApp(), l = "";

Page({
    data: {
        img: i.mergeData({}),
        type: "act",
        titlefocus: !0,
        descfocus: !1,
        author: "",
        title: "",
        content: "",
        contentLength: 0,
        qiniuImage: "",
        template: 1,
        titleValid: !1,
        contentValid: !1,
        showAdvanced: !1,
        arrowAnime: {},
        activityLocation: "点击选择活动地址",
        isReadyLocation: !1,
        addressLength: 0,
        keywordsStr: "",
        year: new Date().getFullYear(),
        forward: 1,
        isEdit: !1,
        noticeID: "",
        hasAuthorized: n.globalData.hasAuthorized
    },
    dataModel: {
        title: "",
        content: "",
        currentLocation: {}
    },
    onLoad: function(e) {
        var a = this;
        o.addNotification("__authorizationState__", this.changeAuthorizationState.bind(this), this), 
        t = new i(this, "img"), l = e.origin, "act" == e.type ? (this.setData({
            type: e.type,
            template: 1,
            file_no: "",
            author: n.globalData.userInfo && n.globalData.userInfo.nickName ? n.globalData.userInfo.nickName : "",
            titlefocus: !!n.globalData.deviceProfiles.system && n.globalData.deviceProfiles.system.startsWith("iOS")
        }), wx.setNavigationBarTitle({
            title: "发布活动"
        }), o.addNotification("__templateSelect__", this.templateSelect.bind(this), this)) : "ntc" == e.type ? (e.noticeId && this.getEditNtcDe(e.noticeId), 
        this.setData({
            type: e.type,
            template: 2,
            file_no: "",
            author: n.globalData.userInfo && n.globalData.userInfo.nickName ? n.globalData.userInfo.nickName : "",
            titlefocus: !!n.globalData.deviceProfiles.system && n.globalData.deviceProfiles.system.startsWith("iOS")
        }), wx.setNavigationBarTitle({
            title: "发布通知"
        }), o.addNotification("__templateSelect__", this.templateSelect.bind(this), this)) : "red" == e.type && (this.setData({
            type: e.type,
            template: 4,
            file_no: "",
            author: n.globalData.userInfo && n.globalData.userInfo.nickName ? n.globalData.userInfo.nickName : "",
            titlefocus: !!n.globalData.deviceProfiles.system && n.globalData.deviceProfiles.system.startsWith("iOS")
        }), wx.setNavigationBarTitle({
            title: "发布红包通知"
        }), wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#f85a4d",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        })), wx.getStorage({
            key: "noti_content",
            success: function(t) {
                t.data && (a.dataModel.content = t.data, console.log("content是啥" + t.data), a.setData({
                    content: t.data,
                    contentLength: t.data.length,
                    contentValid: !0
                }));
            }
        }), wx.getStorage({
            key: "noti_title",
            success: function(t) {
                t.data && (a.dataModel.title = t.data, console.log("title" + t.data), a.setData({
                    title: t.data,
                    titleValid: !0
                }));
            }
        });
    },
    onShow: function() {
        n.globalData.hasAuthorized != this.data.hasAuthorized && this.setData({
            hasAuthorized: n.globalData.hasAuthorized
        });
        var t = wx.getStorageSync("keywords");
        if (t && t.length > 0) {
            var e = t.join(" ");
            this.setData({
                keywordsStr: e
            });
        }
    },
    onUnload: function() {
        wx.setStorageSync("keywords", []);
    },
    bindAdvancedTap: function() {
        var t = this.data.showAdvanced ? 180 : 0, e = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        e.rotate(t).step({
            duration: 300
        }), this.setData({
            arrowAnime: e.export(),
            showAdvanced: !this.data.showAdvanced
        });
    },
    templateSelect: function(a) {
        "object" == (void 0 === a ? "undefined" : e(a)) ? this.setData({
            template: a.template,
            qiniuKey: a.qiniuImage,
            qiniuImage: n.globalData.phost + "/" + a.qiniuImage
        }) : 205 == a ? (this.setData({
            title: "",
            content: "",
            contentLength: 0,
            template: a
        }), t.purgeImages()) : this.setData({
            template: a
        });
    },
    bindKeywordsTap: function(t) {
        wx.navigateTo({
            url: "../keywords/keywords"
        });
    },
    bindTemplateTap: function(t) {
        var e = "../template/template?type=" + this.data.type + "&template=" + this.data.template;
        206 == this.data.template && this.data.qiniuKey && (e = e + "&qnkey=" + this.data.qiniuKey), 
        wx.navigateTo({
            url: e
        });
    },
    bindTitleInput: function(t) {
        var e = t.detail.value;
        this._saveTitle(e), this.dataModel.title = e, this.setData({
            titleValid: !!e
        });
    },
    bindTitleConfirm: function(t) {
        this.setData({
            titlefocus: !1,
            descfocus: !0
        });
    },
    bindContentInput: function(t) {
        var e = t.detail.value;
        this._saveContent(e), this.dataModel.content = e, this.setData({
            contentLength: e.length,
            contentValid: !!e
        });
    },
    formSubmit: function(t) {
        function e(t) {
            return !!/^[0-9]*$/.test(t);
        }
        var i = this, s = this.data.img.uploadedImagesPaths.map(function(t) {
            return "\n![](" + t.uploadurl + ")";
        });
        setTimeout(function() {
            var c = t.detail.value, r = i, d = i.dataModel.title || c.title, u = i.dataModel.content || c.content;
            u += s.join("");
            var h;
            if (i.data.contentValid && i.data.titleValid) {
                if (205 == i.data.template) {
                    if (d.length >= 5) return void wx.showModal({
                        title: "提示",
                        content: "领奖人姓名须少于五字",
                        showCancel: !1
                    });
                    if (u.length > 10) return void wx.showModal({
                        title: "提示",
                        content: "领奖人称号须十字以内",
                        showCancel: !1
                    });
                } else if (u.length > 1e3) return void wx.showModal({
                    title: "提示",
                    content: "内容必须在1000字以内",
                    showCancel: !1
                });
                if (!c.fileNumber || e(c.fileNumber)) if (!c.personNumber || e(c.personNumber)) {
                    var f = {
                        act: "patch",
                        formid: t.detail.formId,
                        content: u,
                        temp_id: i.data.template,
                        top_pic: i.data.qiniuKey
                    }, g = {
                        id: i.data.noticeID
                    };
                    f.forward = c.forward ? 0 : 1, c.fileNumber && (f.file_no = c.fileNumber);
                    var m = wx.getStorageSync("keywords");
                    if (m && m.length > 0 && (f.kwords = m.join("‽")), "act" == i.data.type) h = a.postActivity, 
                    f.title = d, f.inscribe = c.leader, f.name_req = c.cell_name ? 1 : 0, f.cell_req = c.cell_req ? 1 : 0, 
                    c.personNumber && (f.max_num = c.personNumber), i.data.isReadyLocation && i.dataModel.currentLocation.latitude && i.dataModel.currentLocation.longitude && (f.content += '\n \n<loc latitude="' + i.dataModel.currentLocation.latitude + '" longitude="' + i.dataModel.currentLocation.longitude + '" name="' + i.dataModel.currentLocation.name + '" address="' + i.dataModel.currentLocation.address + '"></loc>'); else if ("ntc" == i.data.type) h = i.data.isEdit ? a.editNotice : a.postNotice, 
                    f.title = d, f.inscribe = c.leader; else if ("red" == i.data.type) return f.title = d, 
                    f.inscribe = c.leader, void wx.navigateTo({
                        url: "../publish/publish?content=" + f.content + "&formid=" + f.formid + "&title=" + f.title + "&inscribe=" + f.inscribe + "&file_no=" + f.file_no + "&temp_id=" + f.temp_id + "&forward=" + f.forward
                    });
                    i.isRequsting || (i.isRequsting = !0, h({
                        data: f,
                        query: g,
                        success: function(t) {
                            if (wx.removeStorageSync("noti_content"), wx.removeStorageSync("noti_title"), 0 === t.data.code) {
                                if (wx.reportAnalytics) {
                                    var e = {
                                        origin: l,
                                        type: r.data.type,
                                        template: r.data.template
                                    };
                                    "act" == r.data.type ? (e.act_limit = f.max_num ? 1 : 0, e.act_map = r.data.isReadyLocation ? 1 : 0, 
                                    e.act_name = f.name_req, e.act_mobile = f.cell_req, e.signature_change = f.inscribe === n.globalData.userInfo.nickName ? 0 : 1, 
                                    e.file_no_assign = f.file_no ? 1 : 0, e.img_count = s.length) : "ntc" == r.data.type && (e.signature_change = f.inscribe === n.globalData.userInfo.nickName ? 0 : 1, 
                                    e.file_no_assign = f.file_no ? 1 : 0, e.img_count = s.length), wx.reportAnalytics("create_msg", e);
                                }
                                wx.showToast({
                                    title: "添加成功",
                                    icon: "success",
                                    duration: 2e3
                                }), o.postNotificationName("__refreshSent__"), "act" == r.data.type ? wx.redirectTo({
                                    url: "../detail/detail?type=" + r.data.type + "&detailID=" + t.data.data.activity_id + "&hint=1"
                                }) : "ntc" == r.data.type && wx.redirectTo({
                                    url: "../detail/detail?type=" + r.data.type + "&detailID=" + t.data.data.notice_id + "&hint=1"
                                });
                            } else 40014 === t.data.code ? wx.showModal({
                                title: "发布失败",
                                content: "根据相关法律法规，请调整您的内容后再进行发布。",
                                showCancel: !1
                            }) : wx.showModal({
                                title: "发布失败",
                                content: "[" + (t.data.code || t.statusCode) + "]请检查网络或调整内容后重新发布。",
                                showCancel: !1
                            });
                        },
                        fail: function(t) {},
                        complete: function() {
                            r.isRequsting = !1;
                        }
                    }));
                } else wx.showModal({
                    title: "提示",
                    content: "人数限制必须为纯数字",
                    showCancel: !1
                }); else wx.showModal({
                    title: "提示",
                    content: "文号必须为纯数字",
                    showCancel: !1
                });
            } else wx.showModal({
                title: "提示",
                content: "标题或内容不得为空",
                showCancel: !1
            });
        }, 300);
    },
    getEditNtcDe: function(e) {
        console.log("ss" + e);
        var o = this;
        a.getEditNtc({
            query: {
                notice_id: e
            },
            success: function(a) {
                if (0 === a.data.code) {
                    var n = a.data.data.notice;
                    if (n.kwords && n.kwords.length > 0) {
                        var l = n.kwords.split("‽");
                        n.kwords = l.join(" ");
                    }
                    if (null == n.kwords && (n.kwords = ""), n.content && n.content.length > 0) {
                        var s = n.content.split("![]"), c = s[0];
                        if ("\n" == c.substr(c.length - 1, c.length) && (c = c.substr(0, c.length - 1)), 
                        s.length > 1) {
                            for (var r = [], d = 1; d < s.length; d++) {
                                var u = {
                                    source: "",
                                    uploadurl: s[d].replace("(", "").replace(")", "").replace("\n", "")
                                };
                                r.push(u);
                            }
                            o.data.img.uploadedImagesPaths = r, t = new i(o, "img");
                        }
                    }
                    o.setData({
                        noticeID: e,
                        content: c,
                        title: n.title,
                        template: n.temp_id,
                        author: n.inscribe,
                        keywordsStr: n.kwords,
                        forward: n.forward,
                        file_no: n.file_no,
                        titleValid: !0,
                        contentValid: !0,
                        isEdit: !0
                    });
                } else wx.showModal({
                    title: "错误",
                    content: "错误编码" + a.data.code,
                    showCancel: !1
                });
            },
            fail: function(t) {
                console.log("请求编辑通知详情失败");
            }
        });
    },
    chooseLocation: function() {
        var t = this;
        wx.chooseLocation && wx.chooseLocation({
            success: function(e) {
                t.setData({
                    activityLocation: e.name,
                    isReadyLocation: !0
                }), t.dataModel.currentLocation = e;
                var a = ('\n \n<loc latitude="' + e.latitude + '" longitude="' + e.longitude + '" name="' + e.name + '" address="' + e.address + '"></loc>').length;
                t.setData({
                    addressLength: a
                });
            },
            cancel: function() {
                t.setData({
                    activityLocation: "点击选择活动地址",
                    isReadyLocation: !1
                }), t.dataModel.currentLocation = {};
            },
            fail: function(t) {
                console.error("choose location error: " + t);
            }
        });
    },
    changeAuthorizationState: function(t) {
        this.setData({
            hasAuthorized: t
        }), t && this.setData({
            author: n.globalData.userInfo && n.globalData.userInfo.nickName ? n.globalData.userInfo.nickName : ""
        });
    },
    requestGetUserInfo: function(t) {
        n.login({}, t.detail.userInfo);
    },
    requestAuthorization: function(t) {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || (compatibility ? wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? n.login() : wx.showModal({
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
    _saveContent: function(t) {
        console.log("存储的content是啥" + t), wx.setStorage({
            key: "noti_content",
            data: t
        });
    },
    _saveTitle: function(t) {
        console.log("存储的title是啥" + t), wx.setStorage({
            key: "noti_title",
            data: t
        });
    }
});