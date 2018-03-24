function e() {
    this.ruler = new r();
    for (var e = 0; e < s.length; e++) this.ruler.push(s[e][0], s[e][1]);
    this.validateLink = i;
}

function i(e) {
    var i = [ "vbscript", "javascript", "file", "data" ], r = e.trim().toLowerCase();
    return -1 === r.indexOf(":") || -1 === i.indexOf(r.split(":")[0]);
}

var r = require("./ruler"), n = require("./rules_inline/state_inline"), s = (require("./common/utils"), 
[ [ "newline", require("./rules_inline/newline") ], [ "autolink", require("./rules_inline/autolink") ], [ "text", require("./rules_inline/text") ], [ "escape", require("./rules_inline/escape") ], [ "backticks", require("./rules_inline/backticks") ], [ "del", require("./rules_inline/del") ], [ "ins", require("./rules_inline/ins") ], [ "mark", require("./rules_inline/mark") ], [ "emphasis", require("./rules_inline/emphasis") ], [ "links", require("./rules_inline/links") ] ]);

e.prototype.skipToken = function(e) {
    var i, r, n = this.ruler.getRules(""), s = n.length, t = e.pos;
    if ((r = e.cacheGet(t)) > 0) e.pos = r; else {
        for (i = 0; i < s; i++) if (n[i](e, !0)) return void e.cacheSet(t, e.pos);
        e.pos++, e.cacheSet(t, e.pos);
    }
}, e.prototype.tokenize = function(e) {
    for (var i, r, n = this.ruler.getRules(""), s = n.length, t = e.posMax; e.pos < t; ) {
        for (r = 0; r < s && !(i = n[r](e, !1)); r++) ;
        if (i) {
            if (e.pos >= t) break;
        } else e.pending += e.src[e.pos++];
    }
    e.pending && e.pushPending();
}, e.prototype.parse = function(e, i, r, s) {
    var t = new n(e, this, i, r, s);
    this.tokenize(t);
}, module.exports = e;