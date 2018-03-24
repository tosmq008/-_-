function o(o) {
    var e = o.currentTarget.dataset.tel;
    wx.makePhoneCall({
        phoneNumber: e
    });
}

function e(o) {
    var e = o.currentTarget.dataset.src;
    wx.previewImage({
        current: e,
        urls: [ e ]
    });
}

function t(o) {
    var e = o.currentTarget.dataset.src;
    wx.downloadFile && wx.saveVideoToPhotosAlbum && wx.showActionSheet({
        itemList: [ "保存视频" ],
        success: function(o) {
            0 === o.tapIndex && (wx.showLoading && wx.showLoading({
                title: "正在下载视频...",
                mask: !0
            }), wx.downloadFile && wx.downloadFile({
                url: e,
                success: function(o) {
                    wx.saveVideoToPhotosAlbum({
                        filePath: o.tempFilePath,
                        success: function(o) {
                            wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            });
                        },
                        fail: function(o) {
                            wx.showToast({
                                title: "保存视频失败 - " + o.errMsg,
                                icon: "loading",
                                duration: 2e3
                            });
                        },
                        complete: function() {
                            wx.hideLoading && wx.hideLoading();
                        }
                    });
                },
                fail: function(o) {
                    wx.hideLoading && wx.hideLoading(), wx.showToast({
                        title: "下载视频失败 - " + o.errMsg,
                        icon: "loading",
                        duration: 2e3
                    }), console.log(o.errMsg);
                }
            }));
        }
    });
}

function n(o) {
    var e = o.currentTarget.dataset.src;
    wx.downloadFile && wx.saveFile && wx.showActionSheet({
        itemList: [ "保存文档" ],
        success: function(o) {
            0 === o.tapIndex && (wx.showLoading && wx.showLoading({
                title: "正在保存文档...",
                mask: !0
            }), wx.downloadFile && wx.downloadFile({
                url: e,
                success: function(o) {
                    wx.saveFile({
                        tempFilePath: o.tempFilePath,
                        success: function(o) {
                            wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            });
                        },
                        fail: function(o) {
                            wx.showToast({
                                title: "保存文档失败 - " + o.errMsg,
                                icon: "loading",
                                duration: 2e3
                            });
                        },
                        complete: function() {
                            wx.hideLoading && wx.hideLoading();
                        }
                    });
                },
                fail: function(o) {
                    wx.hideLoading && wx.hideLoading(), wx.showToast({
                        title: "下载文档失败 - " + o.errMsg,
                        icon: "loading",
                        duration: 2e3
                    }), console.log(o.errMsg);
                }
            }));
        }
    });
}

function a(o) {
    var e = o.currentTarget.dataset.src;
    wx.showLoading && wx.showLoading({
        title: "正在打开文档...",
        mask: !0
    }), wx.downloadFile && wx.downloadFile({
        url: e,
        success: function(o) {
            var e = o.tempFilePath;
            wx.openDocument && wx.openDocument({
                filePath: e,
                fail: function(o) {
                    wx.showModal({
                        title: "打开文档失败",
                        content: "仅支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx",
                        showCancel: !1
                    });
                },
                complete: function() {
                    wx.hideLoading && wx.hideLoading();
                }
            });
        },
        fail: function(o) {
            wx.hideLoading && wx.hideLoading(), wx.showToast({
                title: "下载文档失败 - " + o.errMsg,
                icon: "loading",
                duration: 2e3
            });
        },
        complete: function() {}
    });
}

function i(o) {}

function s(o, e, t, n) {
    var a, i = Object.prototype, c = i.toString, d = i.hasOwnProperty.bind(o);
    if ("[object Array]" !== c.call(n) && (n = []), t) for (a in o) d(a) && (a === e && o[a] === t ? n.push(o) : "[object Array]" !== c.call(o[a]) && "[object Object]" !== c.call(o[a]) || s(o[a], e, t, n)); else for (a in o) d(a) && (a === e ? n.push(o) : "[object Array]" !== c.call(o[a]) && "[object Object]" !== c.call(o[a]) || s(o[a], e, t, n));
    return n;
}

var c = require("./lib/index");

module.exports = {
    markdown: function() {
        var d = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "markdown", l = arguments[1], r = arguments[2], w = new c({
            html: !0
        }).render(l, {}), u = {};
        u[d] = w, r.setData(u), r.markdownImageLoad = i, r.markdownImageTap = e, r.markdownTelTap = o, 
        r.markdownFileTap = a, r.markdownFileLongTap = n, r.markdownVideoLongTap = t, r.markdownWrapLongTap = function(o) {
            wx.setClipboardData && wx.showActionSheet({
                itemList: [ "复制内容" ],
                success: function(o) {
                    0 === o.tapIndex && wx.setClipboardData && wx.setClipboardData({
                        data: l,
                        success: function(o) {
                            wx.showToast({
                                title: "复制成功",
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    });
                },
                fail: function(o) {
                    console.log(o.errMsg);
                }
            });
        }, r.markdownMapMarkerTap = function(o) {
            r.markdownMapTap();
        }, r.markdownMapTap = function() {
            var o = s(this.data[d], "tag", "loc")[0];
            wx.openLocation({
                latitude: parseFloat(o.latitude),
                longitude: parseFloat(o.longitude),
                scale: 28,
                name: o.name,
                address: o.address,
                success: function(o) {
                    console.log(o);
                },
                fail: function(o) {
                    console.log(o);
                }
            });
        };
    }
};