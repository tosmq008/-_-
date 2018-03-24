!function() {
    function n(n) {
        n.region ? u.qiniuRegion = n.region : console.error("qiniu uploader need your bucket region"), 
        n.uptoken ? u.qiniuUploadToken = n.uptoken : n.uptokenURL ? u.qiniuUploadTokenURL = n.uptokenURL : n.uptokenFunc && (u.qiniuUploadTokenFunction = n.uptokenFunc), 
        n.domain && (u.qiniuImageURLPrefix = n.domain), u.qiniuShouldUseQiniuFileName = n.shouldUseQiniuFileName;
    }
    function e(n, e, i, l) {
        if (null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) console.error("qiniu UploadToken is null, please check the init config or networking"); else {
            var a = o(u.qiniuRegion), t = n.split("//")[1];
            l && l.key && (t = l.key);
            var r = {
                token: u.qiniuUploadToken
            };
            u.qiniuShouldUseQiniuFileName || (r.key = t), wx.showLoading && wx.showLoading({
                title: "正在上传..."
            }), wx.uploadFile({
                url: a,
                filePath: n,
                name: "file",
                formData: r,
                success: function(n) {
                    var i = n.data, o = JSON.parse(i), l = u.qiniuImageURLPrefix + "/" + o.key;
                    o.imageURL = l, console.log(o), e && e(o);
                },
                fail: function(n) {
                    console.error(n), i && i(n);
                },
                complete: function() {
                    wx.hideLoading && wx.hideLoading();
                }
            });
        }
    }
    function i(n) {
        wx.request({
            url: u.qiniuUploadTokenURL,
            success: function(e) {
                var i = e.data.uptoken;
                i && i.length > 0 ? (u.qiniuUploadToken = i, n && n()) : console.error("qiniuUploader cannot get your token, please check the uptokenURL or server");
            },
            fail: function(n) {
                console.error("qiniu UploadToken is null, please check the init config or networking: " + n);
            }
        });
    }
    function o(n) {
        var e = null;
        switch (n) {
          case "ECN":
            e = "https://up.qbox.me";
            break;

          case "NCN":
            e = "https://up-z1.qbox.me";
            break;

          case "SCN":
            e = "https://up-z2.qbox.me";
            break;

          case "NA":
            e = "https://up-na0.qbox.me";
            break;

          default:
            console.error("please make the region is with one of [ECN, SCN, NCN, NA]");
        }
        return e;
    }
    var u = {
        qiniuRegion: "",
        qiniuImageURLPrefix: "",
        qiniuUploadToken: "",
        qiniuUploadTokenURL: "",
        qiniuUploadTokenFunction: null,
        qiniuShouldUseQiniuFileName: !1
    };
    module.exports = {
        init: function(e) {
            u = {
                qiniuRegion: "",
                qiniuImageURLPrefix: "",
                qiniuUploadToken: "",
                qiniuUploadTokenURL: "",
                qiniuUploadTokenFunction: null,
                qiniuShouldUseQiniuFileName: !1
            }, n(e);
        },
        upload: function(o, l, a, t) {
            if (null != o) if (t && n(t), u.qiniuUploadToken) e(o, l, a, t); else if (u.qiniuUploadTokenURL) i(function() {
                e(o, l, a, t);
            }); else {
                if (!u.qiniuUploadTokenFunction) return void console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]");
                if (u.qiniuUploadToken = u.qiniuUploadTokenFunction(), null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) return void console.error("qiniu UploadTokenFunction result is null, please check the return value");
            } else console.error("qiniu uploader need filePath to upload");
        }
    };
}();