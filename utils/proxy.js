var t = {
    map: {},
    mq: [],
    running: [],
    MAX_REQUEST: 5,
    push: function(t) {
        for (t.t = +new Date(); this.mq.indexOf(t.t) > -1 || this.running.indexOf(t.t) > -1; ) t.t += 10 * Math.random() >> 0;
        this.mq.push(t.t), this.map[t.t] = t;
    },
    next: function() {
        var t = this;
        if (0 !== this.mq.length && this.running.length < this.MAX_REQUEST - 1) {
            var e = this.mq.shift(), n = this.map[e], r = n.complete;
            return n.complete = function() {
                for (var e = arguments.length, i = Array(e), o = 0; o < e; o++) i[o] = arguments[o];
                t.running.splice(t.running.indexOf(n.t), 1), delete t.map[n.t], r && r.apply(n, i), 
                t.next();
            }, this.running.push(n.t), wx.request(n);
        }
    },
    request: function(t) {
        return t = t || {}, t = "string" == typeof t ? {
            url: t
        } : t, this.push(t), this.next();
    }
}, e = {}, n = {
    stopRecord: !0,
    pauseVoice: !0,
    stopVoice: !0,
    pauseBackgroundAudio: !0,
    stopBackgroundAudio: !0,
    showNavigationBarLoading: !0,
    hideNavigationBarLoading: !0,
    createAnimation: !0,
    createContext: !0,
    createCanvasContext: !0,
    hideKeyboard: !0,
    stopPullDownRefresh: !0
};

Object.keys(wx).forEach(function(r) {
    n[r] || "on" === r.substr(0, 2) || /\w+Sync$/.test(r) ? Object.defineProperty(e, r, {
        get: function() {
            return function() {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return wx[r].apply(wx, e);
            };
        }
    }) : Object.defineProperty(e, r, {
        get: function() {
            return function(e) {
                e = e || {}, "request" === r && (e = "string" == typeof e ? {
                    url: e
                } : e);
                var n = {};
                [ "fail", "success", "complete" ].forEach(function(t) {
                    n[t] = e[t], e[t] = function(e) {
                        n[t] && n[t].call(self, e);
                    };
                }), "request" === r ? t.request(e) : wx[r](e);
            };
        }
    });
}), module.exports = e;