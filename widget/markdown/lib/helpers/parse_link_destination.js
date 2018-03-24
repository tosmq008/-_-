var r = require("./normalize_link"), e = require("../common/utils").unescapeMd;

module.exports = function(i, n) {
    var s, t, a, o = n, c = i.posMax;
    if (60 === i.src.charCodeAt(n)) {
        for (n++; n < c; ) {
            if (10 === (s = i.src.charCodeAt(n))) return !1;
            if (62 === s) return a = r(e(i.src.slice(o + 1, n))), !!i.parser.validateLink(a) && (i.pos = n + 1, 
            i.linkContent = a, !0);
            92 === s && n + 1 < c ? n += 2 : n++;
        }
        return !1;
    }
    for (t = 0; n < c && 32 !== (s = i.src.charCodeAt(n)) && !(s > 8 && s < 14); ) if (92 === s && n + 1 < c) n += 2; else {
        if (40 === s && ++t > 1) break;
        if (41 === s && --t < 0) break;
        n++;
    }
    return o !== n && (a = e(i.src.slice(o, n)), !!i.parser.validateLink(a) && (i.linkContent = a, 
    i.pos = n, !0));
};