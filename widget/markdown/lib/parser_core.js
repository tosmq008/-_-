function r() {
    this.options = {}, this.ruler = new e();
    for (var r = 0; r < i.length; r++) this.ruler.push(i[r][0], i[r][1]);
}

var e = require("./ruler"), i = [ [ "block", require("./rules_core/block") ], [ "inline", require("./rules_core/inline") ] ];

r.prototype.process = function(r) {
    var e, i, o;
    for (e = 0, i = (o = this.ruler.getRules("")).length; e < i; e++) o[e](r);
}, module.exports = r;