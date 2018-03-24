function e(e, r, t) {
    this.src = r, this.env = t, this.options = e.options, this.tokens = [], this.inline = e.inline, 
    this.block = e.block, this.renderer = e.renderer;
}

function r(e, r) {
    "string" != typeof e && (r = e, e = "default"), this.inline = new s(), this.block = new i(), 
    this.core = new o(), this.ruler = new u(), this.renderer = new n(), this.options = {}, 
    this.configure(c[e]), this.set(r || {});
}

var t = require("./common/utils").assign, n = require("./renderer"), o = require("./parser_core"), i = require("./parser_block"), s = require("./parser_inline"), u = require("./ruler"), c = {
    default: require("./configs/default")
};

r.prototype.set = function(e) {
    t(this.options, e);
}, r.prototype.configure = function(e) {
    var r = this;
    if (!e) throw new Error("Wrong `remarkable` preset, check name/content");
    e.options && r.set(e.options), e.components && Object.keys(e.components).forEach(function(t) {
        e.components[t].rules && r[t].ruler.enable(e.components[t].rules, !0);
    });
}, r.prototype.use = function(e, r) {
    return e(this, r), this;
}, r.prototype.parse = function(r, t) {
    var n = new e(this, r, t);
    return this.core.process(n), n.tokens;
}, r.prototype.render = function(e, r) {
    return r = r || {}, this.renderer.render(this.parse(e, r), this.options, r);
}, module.exports = r, module.exports.utils = require("./common/utils");