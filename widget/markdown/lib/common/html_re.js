function e(e, t) {
    return e = e.source, t = t || "", function a(o, u) {
        return o ? (u = u.source || u, e = e.replace(o, u), a) : new RegExp(e, t);
    };
}

var t = /[a-zA-Z_:][a-zA-Z0-9:._-]*/, a = /[^"'=<>`\x00-\x20]+/, o = /'[^']*'/, u = /"[^"]*"/, n = e(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", a)("single_quoted", o)("double_quoted", u)(), r = e(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", t)("attr_value", n)(), s = e(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", r)(), c = /<\/[A-Za-z][A-Za-z0-9]*\s*>/, _ = /<!--([^-]+|[-][^-]+)*-->/, d = /<[?].*?[?]>/, l = /<![A-Z]+\s+[^>]*>/, i = /<!\[CDATA\[([^\]]+|\][^\]]|\]\][^>])*\]\]>/, A = e(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", s)("close_tag", c)("comment", _)("processing", d)("declaration", l)("cdata", i)();

module.exports.HTML_TAG_RE = A;