function e(e, t) {
    var r, s, l;
    return s = e.bMarks[t] + e.tShift[t], l = e.eMarks[t], s >= l ? -1 : 42 !== (r = e.src.charCodeAt(s++)) && 45 !== r && 43 !== r ? -1 : s < l && 32 !== e.src.charCodeAt(s) ? -1 : s;
}

function t(e, t) {
    var r, s = e.bMarks[t] + e.tShift[t], l = e.eMarks[t];
    if (s + 1 >= l) return -1;
    if ((r = e.src.charCodeAt(s++)) < 48 || r > 57) return -1;
    for (;;) {
        if (s >= l) return -1;
        if (!((r = e.src.charCodeAt(s++)) >= 48 && r <= 57)) {
            if (41 === r || 46 === r) break;
            return -1;
        }
    }
    return s < l && 32 !== e.src.charCodeAt(s) ? -1 : s;
}

function r(e, t) {
    var r, s, l = e.level + 2;
    for (r = t + 2, s = e.tokens.length - 2; r < s; r++) e.tokens[r].level === l && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].tight = !0, 
    e.tokens[r].tight = !0, r += 2);
}

module.exports = function(s, l, n, i) {
    var o, a, k, p, f, h, u, c, b, d, v, _, g, y, M, S, m, A, C, I, T, x, E = !0;
    if ((c = t(s, l)) >= 0) g = !0; else {
        if (!((c = e(s, l)) >= 0)) return !1;
        g = !1;
    }
    if (s.level >= s.options.maxNesting) return !1;
    if (_ = s.src.charCodeAt(c - 1), i) return !0;
    for (M = s.tokens.length, g ? (u = s.bMarks[l] + s.tShift[l], v = Number(s.src.substr(u, c - u - 1)), 
    s.tokens.push({
        type: "ordered_list_open",
        order: v,
        lines: m = [ l, 0 ],
        level: s.level++
    })) : s.tokens.push({
        type: "bullet_list_open",
        lines: m = [ l, 0 ],
        level: s.level++
    }), o = l, S = !1, C = s.parser.ruler.getRules("list"); !(!(o < n) || (y = s.skipSpaces(c), 
    b = s.eMarks[o], (d = y >= b ? 1 : y - c) > 4 && (d = 1), d < 1 && (d = 1), a = c - s.bMarks[o] + d, 
    s.tokens.push({
        type: "list_item_open",
        lines: A = [ l, 0 ],
        level: s.level++
    }), p = s.blkIndent, f = s.tight, k = s.tShift[l], h = s.parentType, s.tShift[l] = y - s.bMarks[l], 
    s.blkIndent = a, s.tight = !0, s.parentType = "list", s.parser.tokenize(s, l, n, !0), 
    s.tight && !S || (E = !1), S = s.line - l > 1 && s.isEmpty(s.line - 1), s.blkIndent = p, 
    s.tShift[l] = k, s.tight = f, s.parentType = h, s.tokens.push({
        type: "list_item_close",
        level: --s.level
    }), o = l = s.line, A[1] = o, y = s.bMarks[l], o >= n) || s.isEmpty(o) || s.tShift[o] < s.blkIndent); ) {
        for (x = !1, I = 0, T = C.length; I < T; I++) if (C[I](s, o, n, !0)) {
            x = !0;
            break;
        }
        if (x) break;
        if (g) {
            if ((c = t(s, o)) < 0) break;
        } else if ((c = e(s, o)) < 0) break;
        if (_ !== s.src.charCodeAt(c - 1)) break;
    }
    return s.tokens.push({
        type: g ? "ordered_list_close" : "bullet_list_close",
        level: --s.level
    }), m[1] = o, s.line = o, E && r(s, M), !0;
};