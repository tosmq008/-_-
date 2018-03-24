var r = function() {
    function r(r, t) {
        var e = [], n = !0, i = !1, o = void 0;
        try {
            for (var a, u = r[Symbol.iterator](); !(n = (a = u.next()).done) && (e.push(a.value), 
            !t || e.length !== t); n = !0) ;
        } catch (r) {
            i = !0, o = r;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (i) throw o;
            }
        }
        return e;
    }
    return function(t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return r(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}()((wx.getSystemInfoSync().SDKVersion || "1.0.0").split(".").map(Number), 3), t = r[0], e = r[1], n = (r[2], 
t >= 1 && e >= 1);

module.exports = n;