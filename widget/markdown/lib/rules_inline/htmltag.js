function e(e) {
    var t = 32 | e;
    return t >= 97 && t <= 122;
}

var t = require("../common/html_re").HTML_TAG_RE;

module.exports = function(r, c) {
    var o, s, l, n = r.pos;
    return !!r.options.html && (l = r.posMax, !(60 !== r.src.charCodeAt(n) || n + 2 >= l) && (!(33 !== (o = r.src.charCodeAt(n + 1)) && 63 !== o && 47 !== o && !e(o)) && (!!(s = r.src.slice(n).match(t)) && (c || r.push({
        type: "htmltag",
        content: r.src.slice(n, n + s[0].length),
        level: r.level
    }), r.pos += s[0].length, !0))));
};