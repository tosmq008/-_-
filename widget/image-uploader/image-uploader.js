function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

function a(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var s = a[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(a, t, s) {
        return t && e(a.prototype, t), s && e(a, s), a;
    };
}(), s = require("../../utils/util.js"), i = require("../../utils/qiniuUploader.js"), o = getApp(), r = {
    _chooseImage: "chooseImage",
    _previewImage: "previewImage",
    _deleteImage: "deleteImage",
    sourceType: [ "camera", "album" ],
    sizeType: [ "compressed" ],
    uploadedImagesPaths: []
}, n = function() {
    function r(t) {
        var s, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        a(this, r);
        var u = {
            region: "ECN",
            uptoken: o.globalData.uptoken,
            domain: "https://up.qbox.me",
            shouldUseQiniuFileName: !0
        };
        i.init(u), this.key = n, this.page = t, this.data = this.page.data[n], this.data._chooseImage = this.data._chooseImage + n, 
        this.data._previewImage = this.data._previewImage + n, this.data._deleteImage = this.data._deleteImage + n;
        var h = n + ".uploadedImagesPaths";
        this.page.setData((s = {}, e(s, n, this.data), e(s, h, []), s)), this.page.setData(e({}, h, this.data.uploadedImagesPaths)), 
        this.page[this.data._chooseImage] = this.chooseImage.bind(this), this.page[this.data._previewImage] = this.previewImage.bind(this), 
        this.page[this.data._deleteImage] = this.deleteImage.bind(this);
    }
    return t(r, [ {
        key: "addImages",
        value: function(a) {
            this.data.uploadedImagesPaths = a.map(function(e) {
                return {
                    source: "",
                    uploadurl: e
                };
            }), this.page.setData(e({}, this.key, this.data));
        }
    }, {
        key: "chooseImage",
        value: function() {
            var a = this, t = this.data;
            wx.chooseImage({
                sourceType: t.sourceType,
                sizeType: t.sizeType,
                count: 1,
                success: function(t) {
                    for (var r = t.tempFilePaths, n = a.data.uploadedImagesPaths, u = 0; u < r.length; u++) !function() {
                        var t = r[u], h = o.globalData.user_id.substring(0, 6) + "_" + new Date().getTime() + "_" + s.makeRandomStr(5);
                        wx.showToast({
                            title: "图片上传中",
                            icon: "loading",
                            mask: !0
                        }), i.upload(t, function(s) {
                            var i = o.globalData.phost + "/" + h;
                            wx.hideToast(), n.push({
                                source: t,
                                uploadurl: i
                            }), a.page.setData(e({}, a.key, a.data));
                        }, function(e) {
                            console.error("error: " + JSON.stringify(e)), wx.showModal({
                                title: "上传失败",
                                content: "请稍后重试 - (" + e.errMsg + ")",
                                showCancel: !1
                            }), that.setData({
                                filePath: ""
                            });
                        }, {
                            key: h,
                            region: "ECN",
                            uptoken: o.globalData.uptoken,
                            domain: "https://up.qbox.me",
                            shouldUseQiniuFileName: !1
                        });
                    }();
                }
            });
        }
    }, {
        key: "previewImage",
        value: function(e) {
            var a = e.target.dataset.src;
            wx.previewImage({
                current: a,
                urls: this.data.uploadedImagesPaths.map(function(e) {
                    return e.uploadurl;
                })
            });
        }
    }, {
        key: "deleteImage",
        value: function(a) {
            var t = a.target.dataset.index;
            this.data.uploadedImagesPaths.splice(t, 1), this.page.setData(e({}, this.key, this.data));
        }
    }, {
        key: "purgeImages",
        value: function() {
            var a;
            this.data.uploadedImagesPaths = [];
            var t = this.key + ".uploadedImagesPaths";
            this.page.setData((a = {}, e(a, this.key, this.data), e(a, t, this.data.uploadedImagesPaths), 
            a));
        }
    } ]), r;
}();

n.mergeData = function(e) {
    return s.mergeDeep({}, r, e);
}, module.exports = n;