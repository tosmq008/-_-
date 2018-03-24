var e = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;

module.exports = function(l, t) {
    var s, p, r = l.pos;
    if (s = l.src.slice(r), p = s.match(e)) {
        var v = p[0];
        return t || (l.push({
            type: "tel_open",
            level: l.level
        }), l.push({
            type: "text",
            content: v,
            level: l.level + 1
        }), l.push({
            type: "tel_close",
            level: l.level
        })), l.pos += p[0].length, !0;
    }
    return !1;
};