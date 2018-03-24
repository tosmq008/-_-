function e(e) {
    var s = 32 | e;
    return s >= 97 && s <= 122;
}

var s = require("../common/html_blocks"), i = /^<([a-zA-Z]{1,15})[\s\/>]/, l = /^<\/([a-zA-Z]{1,15})[\s>]/;

module.exports = function(r, n, t, o) {
    var c, a, f = r.bMarks[n], u = r.eMarks[n], d = r.tShift[n];
    if (f += d, !r.options.html) return !1;
    if (d > 3 || f + 2 >= u) return !1;
    if (60 !== r.src.charCodeAt(f)) return !1;
    if (33 === (c = r.src.charCodeAt(f + 1)) || 63 === c) {
        if (o) return !0;
    } else {
        if (47 !== c && !e(c)) return !1;
        if (47 === c) {
            if (!(v = r.src.slice(f, u).match(l))) return !1;
        } else if (!(v = r.src.slice(f, u).match(i))) return !1;
        if (!0 !== s[v[1].toLowerCase()]) return !1;
        if (o) return !0;
    }
    for (a = n + 1; a < r.lineMax && !r.isEmpty(a); ) a++;
    r.line = a;
    var v, h = /<video.*?src\s*=\s*['"]*([^\s^'^"]+).*?(?:\/\s*\>|<\/video\>)/g, p = /<audio.*?src\s*=\s*['"]*([^\s^'^"]+).*?(?:name\s*=\s*['"]*([^\s^'^"]+).*?)?(?:author\s*=\s*['"]*([^\s^'^"]+).*?)?(?:\/\s*\>|<\/audio\>)/g, m = /<loc.*?latitude\s*=\s*['"]*([^\s^'^"]+).*?longitude\s*=\s*['"]*([^\s^'^"]+).*?(?:name\s*=\s*['"]*([^\s^'^"]+).*?)?(?:address\s*=\s*['"]*([^\s^'^"]+).*?)?(?:\/\s*\>|<\/loc\>)/g, x = /<file.*?src\s*=\s*['"]*([^\s^'^"]+).*?(?:name\s*=\s*['"]*([^\s^'^"]+).*?)?(?:\/\s*\>|<\/file\>)/g, g = r.getLines(n, a, 0, !0).replace(/\n/g, "");
    if (g.indexOf("video") > 0) for (;v = h.exec(g); ) v[1] && r.tokens.push({
        type: "video",
        src: v[1],
        level: r.level,
        lines: [ n, r.line ]
    }); else if (g.indexOf("audio") > 0) for (;v = p.exec(g); ) v[1] && r.tokens.push({
        type: "audio",
        src: v[1],
        name: v[2],
        author: v[3],
        level: r.level,
        lines: [ n, r.line ]
    }); else if (g.indexOf("loc") > 0) for (;v = m.exec(g); ) v[1] && v[2] && r.tokens.push({
        type: "loc",
        latitude: v[1],
        longitude: v[2],
        name: v[3],
        address: v[4],
        level: r.level,
        lines: [ n, r.line ]
    }); else if (g.indexOf("file") > 0) for (;v = x.exec(g); ) v[1] && r.tokens.push({
        type: "file",
        src: v[1],
        name: v[2],
        level: r.level,
        lines: [ n, r.line ]
    }); else r.tokens.push({
        type: "inline",
        level: r.level,
        lines: [ n, r.line ],
        children: [ {
            type: "text",
            level: 0,
            content: r.getLines(n, a, 0, !0)
        } ]
    });
    return !0;
};