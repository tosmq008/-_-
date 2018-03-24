module.exports = function(e, r) {
    var c, o, s, t, n, l = e.pos;
    if (96 !== e.src.charCodeAt(l)) return !1;
    for (c = l, l++, o = e.posMax; l < o && 96 === e.src.charCodeAt(l); ) l++;
    for (s = e.src.slice(c, l), t = n = l; -1 !== (t = e.src.indexOf("`", n)); ) {
        for (n = t + 1; n < o && 96 === e.src.charCodeAt(n); ) n++;
        if (n - t === s.length) return r || e.push({
            type: "code",
            content: e.src.slice(l, t).replace(/[ \n]+/g, " ").trim(),
            block: !1,
            level: e.level
        }), e.pos = n, !0;
    }
    return r || (e.pending += s), e.pos += s.length, !0;
};