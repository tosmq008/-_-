module.exports = function(e, r, l, s) {
    var t, n, i, c = e.bMarks[r] + e.tShift[r], h = e.eMarks[r];
    if (c >= h) return !1;
    if (35 !== (t = e.src.charCodeAt(c)) || c >= h) return !1;
    for (n = 1, t = e.src.charCodeAt(++c); 35 === t && c < h && n <= 6; ) n++, t = e.src.charCodeAt(++c);
    return !(n > 6 || c < h && 32 !== t) && (!!s || (h = e.skipCharsBack(h, 32, c), 
    (i = e.skipCharsBack(h, 35, c)) > c && 32 === e.src.charCodeAt(i - 1) && (h = i), 
    e.line = r + 1, e.tokens.push({
        type: "heading_open",
        hLevel: n,
        lines: [ r, e.line ],
        level: e.level
    }), c < h && e.tokens.push({
        type: "inline",
        content: e.src.slice(c, h).trim(),
        level: e.level + 1,
        lines: [ r, e.line ],
        children: []
    }), e.tokens.push({
        type: "heading_close",
        hLevel: n,
        level: e.level
    }), !0));
};