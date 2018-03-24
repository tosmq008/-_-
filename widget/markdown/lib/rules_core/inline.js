module.exports = function(n) {
    var e, t, i, o = n.tokens;
    for (t = 0, i = o.length; t < i; t++) "inline" === (e = o[t]).type && n.inline.parse(e.content, n.options, n.env, e.children);
};