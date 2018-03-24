module.exports = function(e, s) {
    var a, o, r, l = -1, n = e.posMax, p = e.pos, c = e.isInLabel;
    if (e.isInLabel) return -1;
    if (e.labelUnmatchedScopes) return e.labelUnmatchedScopes--, -1;
    for (e.pos = s + 1, e.isInLabel = !0, a = 1; e.pos < n; ) {
        if (91 === (r = e.src.charCodeAt(e.pos))) a++; else if (93 === r && 0 == --a) {
            o = !0;
            break;
        }
        e.parser.skipToken(e);
    }
    return o ? (l = e.pos, e.labelUnmatchedScopes = 0) : e.labelUnmatchedScopes = a - 1, 
    e.pos = p, e.isInLabel = c, l;
};