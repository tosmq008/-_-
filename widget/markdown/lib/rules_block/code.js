module.exports = function(e, t, n) {
    var l, i;
    if (e.tShift[t] - e.blkIndent < 4) return !1;
    for (i = l = t + 1; l < n; ) if (e.isEmpty(l)) l++; else {
        if (!(e.tShift[l] - e.blkIndent >= 4)) break;
        i = ++l;
    }
    return e.line = l, e.tokens.push({
        type: "code",
        content: e.getLines(t, i, 4 + e.blkIndent, !0),
        block: !0,
        lines: [ t, e.line ],
        level: e.level
    }), !0;
};