module.exports = function(e, r, t, i) {
    var s, n, f, a, c, k = !1, l = e.bMarks[r] + e.tShift[r], h = e.eMarks[r];
    if (l + 3 > h) return !1;
    if (126 !== (s = e.src.charCodeAt(l)) && 96 !== s) return !1;
    if (c = l, l = e.skipChars(l, s), (n = l - c) < 3) return !1;
    if ((f = e.src.slice(l, h).trim()).indexOf("`") >= 0) return !1;
    if (i) return !0;
    for (a = r; !(++a >= t) && (l = c = e.bMarks[a] + e.tShift[a], h = e.eMarks[a], 
    !(l < h && e.tShift[a] < e.blkIndent)); ) if (e.src.charCodeAt(l) === s && !(e.tShift[a] - e.blkIndent >= 4 || (l = e.skipChars(l, s)) - c < n || (l = e.skipSpaces(l)) < h)) {
        k = !0;
        break;
    }
    return n = e.tShift[r], e.line = a + (k ? 1 : 0), e.tokens.push({
        type: "fence",
        params: f,
        content: e.getLines(r + 1, a, n, !0),
        lines: [ r, e.line ],
        level: e.level
    }), !0;
};