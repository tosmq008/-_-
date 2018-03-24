function e() {
    this.ruler = new r();
    for (var e = 0; e < t.length; e++) this.ruler.push(t[e][0], t[e][1], {
        alt: (t[e][2] || []).slice()
    });
}

var r = require("./ruler"), l = require("./rules_block/state_block"), t = [ [ "hr", require("./rules_block/hr"), [ "paragraph", "blockquote", "list" ] ], [ "list", require("./rules_block/list"), [ "paragraph", "blockquote" ] ], [ "heading", require("./rules_block/heading"), [ "paragraph", "blockquote" ] ], [ "htmlblock", require("./rules_block/htmlblock"), [ "paragraph", "blockquote" ] ], [ "table", require("./rules_block/table"), [ "paragraph" ] ], [ "paragraph", require("./rules_block/paragraph") ] ];

e.prototype.tokenize = function(e, r, l) {
    for (var t, i = this.ruler.getRules(""), a = i.length, u = r, o = !1; u < l && (e.line = u, 
    !(u >= l)) && !(e.tShift[u] < e.blkIndent); ) {
        for (t = 0; t < a && !i[t](e, u, l, !1); t++) ;
        if (e.tight = !o, e.isEmpty(e.line - 1) && (o = !0), (u = e.line) < l && e.isEmpty(u)) {
            if (o = !0, ++u < l && "list" === e.parentType && e.isEmpty(u)) break;
            e.line = u;
        }
    }
};

var i = /[\n\t]/g, a = /\r[\n\u0085]|[\u2424\u2028\u0085]/g, u = /\u00a0/g;

e.prototype.parse = function(e, r, t, o) {
    var n, p = 0, s = 0;
    if (!e) return [];
    e = e.replace(u, " "), (e = e.replace(a, "\n")).indexOf("\t") >= 0 && (e = e.replace(i, function(r, l) {
        var t;
        return 10 === e.charCodeAt(l) ? (p = l + 1, s = 0, r) : (t = "    ".slice((l - p - s) % 4), 
        s = l - p + 1, t);
    })), n = new l(e, this, r, t, o), this.tokenize(n, n.line, n.lineMax);
}, module.exports = e;