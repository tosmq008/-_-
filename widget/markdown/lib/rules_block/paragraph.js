module.exports = function(e, l) {
    var t, n, i, r, p, s, a = l + 1;
    if (t = e.lineMax, a < t && !e.isEmpty(a)) for (s = e.parser.ruler.getRules("paragraph"); a < t && !e.isEmpty(a); a++) if (!(e.tShift[a] - e.blkIndent > 3)) {
        for (i = !1, r = 0, p = s.length; r < p; r++) if (s[r](e, a, t, !0)) {
            i = !0;
            break;
        }
        if (i) break;
    }
    return n = e.getLines(l, a, e.blkIndent, !1), e.line = a, n.length && (e.tokens.push({
        type: "paragraph_open",
        tight: !1,
        lines: [ l, e.line ],
        level: e.level
    }), e.tokens.push({
        type: "inline",
        content: n,
        level: e.level + 1,
        lines: [ l, e.line ],
        children: []
    }), e.tokens.push({
        type: "paragraph_close",
        tight: !1,
        level: e.level
    })), !0;
};