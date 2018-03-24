Page({
    data: {
        issue1: !1,
        issue2: !1,
        issue3: !1,
        issue4: !1,
        issue5: !1,
        arrowAnime1: {},
        arrowAnime2: {},
        arrowAnime3: {},
        arrowAnime4: {},
        arrowAnime5: {}
    },
    issue1Tap: function(t) {
        var i = this.data.issue1 ? 180 : 0, a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        a.rotate(i).step({
            duration: 300
        }), this.setData({
            arrowAnime1: a.export(),
            issue1: !this.data.issue1
        });
    },
    issue2Tap: function(t) {
        var i = this.data.issue2 ? 180 : 0, a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        a.rotate(i).step({
            duration: 300
        }), this.setData({
            arrowAnime2: a.export(),
            issue2: !this.data.issue2
        });
    },
    issue3Tap: function(t) {
        var i = this.data.issue3 ? 180 : 0, a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        a.rotate(i).step({
            duration: 300
        }), this.setData({
            arrowAnime3: a.export(),
            issue3: !this.data.issue3
        });
    },
    issue4Tap: function(t) {
        var i = this.data.issue4 ? 180 : 0, a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        a.rotate(i).step({
            duration: 300
        }), this.setData({
            arrowAnime4: a.export(),
            issue4: !this.data.issue4
        });
    },
    issue5Tap: function(t) {
        var i = this.data.issue5 ? 180 : 0, a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        a.rotate(i).step({
            duration: 300
        }), this.setData({
            arrowAnime5: a.export(),
            issue5: !this.data.issue5
        });
    }
});