module.exports = function(e, n) {
    var r, p = e.pos;
    if (10 !== e.src.charCodeAt(p)) return !1;
    if (r = e.pending.length - 1, e.posMax, !n) if (r >= 0 && 32 === e.pending.charCodeAt(r)) if (r >= 1 && 32 === e.pending.charCodeAt(r - 1)) {
        for (var i = r - 2; i >= 0; i--) if (32 !== e.pending.charCodeAt(i)) {
            e.pending = e.pending.substring(0, i + 1);
            break;
        }
        e.push({
            type: "hardbreak",
            level: e.level
        });
    } else e.pending = e.pending.slice(0, -1), e.push({
        type: "softbreak",
        level: e.level
    }); else e.push({
        type: "softbreak",
        level: e.level
    });
    return p++, e.pos = p, !0;
};