module.exports = function(e, r, t, n) {
    var s, i, l, u = e.bMarks[r], o = e.eMarks[r];
    if ((u += e.tShift[r]) > o) return !1;
    if (42 !== (s = e.src.charCodeAt(u++)) && 45 !== s && 95 !== s) return !1;
    for (i = 1; u < o; ) {
        if ((l = e.src.charCodeAt(u++)) !== s && 32 !== l) return !1;
        l === s && i++;
    }
    return !(i < 3) && (!!n || (e.line = r + 1, e.tokens.push({
        type: "hr",
        lines: [ r, e.line ],
        level: e.level
    }), !0));
};