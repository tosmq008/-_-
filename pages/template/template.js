function t() {
    var t = {
        region: "ECN",
        uptoken: i.globalData.uptoken,
        domain: "https://up.qbox.me",
        shouldUseQiniuFileName: !0
    };
    a.init(t);
}

require("../../api/api.js");

var e = require("../../utils/notification.js"), a = require("../../utils/qiniuUploader"), i = getApp(), s = null;

Page({
    data: {
        templateList: [ 2, 201, 202 ],
        template: 2,
        filePath: ""
    },
    onLoad: function(e) {
        if (t(), "ntc" == e.type) (a = wx.getStorageSync("my_image")) ? (s = a, this.setData({
            myOldPath: i.globalData.phost + "/" + a,
            templateList: [ 206, 207, 2, 229, 212, 215, 216, 217, 218, 201, 205, 202, 209 ],
            template: 2
        })) : this.setData({
            templateList: [ 206, 2, 229, 212, 215, 216, 217, 218, 201, 205, 202, 209 ],
            template: 2
        }), wx.setNavigationBarTitle({
            title: "选择通知模板"
        }); else if ("bls" == e.type) this.setData({
            templateList: [ 3, 301, 302, 303, 304 ],
            template: 3
        }), wx.setNavigationBarTitle({
            title: "选择祝福模板"
        }); else if ("act" == e.type) {
            var a = wx.getStorageSync("my_image");
            a ? (s = a, this.setData({
                myOldPath: i.globalData.phost + "/" + a,
                templateList: [ 206, 207, 1 ],
                template: 1
            })) : this.setData({
                templateList: [ 206, 1 ],
                template: 1
            });
        }
        this.setData({
            template: 206 == e.template ? 207 : e.template
        }), e.qnkey && (s = e.qnkey, this.setData({
            myOldPath: i.globalData.phost + "/" + s
        }));
    },
    bindTemplateTap: function(t) {
        this.setData({
            template: t.currentTarget.dataset.id
        }), 206 == t.currentTarget.dataset.id && this.addImage();
    },
    bindSubmitTap: function(t) {
        206 == this.data.template || 207 == this.data.template ? (wx.setStorageSync("my_image", s), 
        e.postNotificationName("__templateSelect__", {
            template: 206,
            qiniuImage: s
        })) : e.postNotificationName("__templateSelect__", this.data.template), wx.navigateBack({});
    },
    addImage: function() {
        var t = this, e = this.makeKey();
        this.setData({
            key: e
        }), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(l) {
                var n = l.tempFilePaths[0];
                t.setData({
                    filePath: n
                }), a.upload(n, function(e) {
                    e.imageURL;
                    s = t.data.key;
                }, function(e) {
                    console.error("error: " + JSON.stringify(e)), wx.showModal({
                        title: "上传失败",
                        content: "请稍后重试 - (" + e.errMsg + ")",
                        showCancel: !1
                    }), t.setData({
                        filePath: ""
                    });
                }, {
                    key: e,
                    region: "ECN",
                    uptoken: i.globalData.uptoken,
                    domain: "https://up.qbox.me",
                    shouldUseQiniuFileName: !1
                });
            },
            fail: function(e) {
                null == s && t.setData({
                    template: 2
                });
            }
        });
    },
    makeKey: function() {
        return i.globalData.user_id.substring(0, 6) + "_" + new Date().getTime() + "_" + this.randomWord();
    },
    randomWord: function() {
        for (var t = "", e = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], a = 0; a < 6; a++) t += e[Math.round(Math.random() * (e.length - 1))];
        return t;
    }
});