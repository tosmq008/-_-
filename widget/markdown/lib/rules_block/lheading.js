module.exports = function(e, l, t) {
    var n, s, i, r = l + 1;
    return !(r >= t) && (!(e.tShift[r] < e.blkIndent) && (!(e.tShift[r] - e.blkIndent > 3) && (s = e.bMarks[r] + e.tShift[r], 
    i = e.eMarks[r], !(s >= i) && ((45 === (n = e.src.charCodeAt(s)) || 61 === n) && (s = e.skipChars(s, n), 
    !((s = e.skipSpaces(s)) < i) && (s = e.bMarks[l] + e.tShift[l], e.line = r + 1, 
    e.tokens.push({
        type: "heading_open",
        hLevel: 61 === n ? 1 : 2,
        lines: [ l, e.line ],
        level: e.level
    }), e.tokens.push({
        type: "inline",
        content: e.src.slice(s, e.eMarks[l]).trim(),
        level: e.level + 1,
        lines: [ l, e.line - 1 ],
        children: []
    }), e.tokens.push({
        type: "heading_close",
        hLevel: 61 === n ? 1 : 2,
        level: e.level
    }), !0))))));
};