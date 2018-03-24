var s = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

module.exports = function(e, o) {
    var r, p, t = e.posMax, a = e.pos;
    if (94 !== e.src.charCodeAt(a)) return !1;
    if (o) return !1;
    if (a + 2 >= t) return !1;
    if (e.level >= e.options.maxNesting) return !1;
    for (e.pos = a + 1; e.pos < t; ) {
        if (94 === e.src.charCodeAt(e.pos)) {
            r = !0;
            break;
        }
        e.parser.skipToken(e);
    }
    return r && a + 1 !== e.pos ? (p = e.src.slice(a + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = a, 
    !1) : (e.posMax = e.pos, e.pos = a + 1, o || e.push({
        type: "sup",
        level: e.level,
        content: p.replace(s, "$1")
    }), e.pos = e.posMax + 1, e.posMax = t, !0) : (e.pos = a, !1);
};