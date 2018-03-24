var r = require("../common/utils").unescapeMd;

module.exports = function(e, t) {
    var o, s = t, c = e.posMax, n = e.src.charCodeAt(t);
    if (34 !== n && 39 !== n && 40 !== n) return !1;
    for (t++, 40 === n && (n = 41); t < c; ) {
        if ((o = e.src.charCodeAt(t)) === n) return e.pos = t + 1, e.linkContent = r(e.src.slice(s + 1, t)), 
        !0;
        92 === o && t + 1 < c ? t += 2 : t++;
    }
    return !1;
};