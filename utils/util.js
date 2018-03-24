function e(e, r, a) {
    return r in e ? Object.defineProperty(e, r, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = a, e;
}

function r(l) {
    for (var c = arguments.length, p = Array(c > 1 ? c - 1 : 0), g = 1; g < c; g++) p[g - 1] = arguments[g];
    if (!p.length) return l;
    var t = p.shift();
    if (a(l) && a(t)) for (var n in t) a(t[n]) ? (l[n] || Object.assign(l, e({}, n, {})), 
    r(l[n], t[n])) : Object.assign(l, e({}, n, t[n]));
    return r.apply(void 0, [ l ].concat(p));
}

function a(e) {
    return e && "object" === (void 0 === e ? "undefined" : n(e)) && !Array.isArray(e);
}

function l(e) {
    return e = e.replace(/&forall;/g, "∀"), e = e.replace(/&part;/g, "∂"), e = e.replace(/&exists;/g, "∃"), 
    e = e.replace(/&empty;/g, "∅"), e = e.replace(/&nabla;/g, "∇"), e = e.replace(/&isin;/g, "∈"), 
    e = e.replace(/&notin;/g, "∉"), e = e.replace(/&ni;/g, "∋"), e = e.replace(/&prod;/g, "∏"), 
    e = e.replace(/&sum;/g, "∑"), e = e.replace(/&minus;/g, "−"), e = e.replace(/&lowast;/g, "∗"), 
    e = e.replace(/&radic;/g, "√"), e = e.replace(/&prop;/g, "∝"), e = e.replace(/&infin;/g, "∞"), 
    e = e.replace(/&ang;/g, "∠"), e = e.replace(/&and;/g, "∧"), e = e.replace(/&or;/g, "∨"), 
    e = e.replace(/&cap;/g, "∩"), e = e.replace(/&cap;/g, "∪"), e = e.replace(/&int;/g, "∫"), 
    e = e.replace(/&there4;/g, "∴"), e = e.replace(/&sim;/g, "∼"), e = e.replace(/&cong;/g, "≅"), 
    e = e.replace(/&asymp;/g, "≈"), e = e.replace(/&ne;/g, "≠"), e = e.replace(/&le;/g, "≤"), 
    e = e.replace(/&ge;/g, "≥"), e = e.replace(/&sub;/g, "⊂"), e = e.replace(/&sup;/g, "⊃"), 
    e = e.replace(/&nsub;/g, "⊄"), e = e.replace(/&sube;/g, "⊆"), e = e.replace(/&supe;/g, "⊇"), 
    e = e.replace(/&oplus;/g, "⊕"), e = e.replace(/&otimes;/g, "⊗"), e = e.replace(/&perp;/g, "⊥"), 
    e = e.replace(/&sdot;/g, "⋅");
}

function c(e) {
    return e = e.replace(/&Alpha;/g, "Α"), e = e.replace(/&Beta;/g, "Β"), e = e.replace(/&Gamma;/g, "Γ"), 
    e = e.replace(/&Delta;/g, "Δ"), e = e.replace(/&Epsilon;/g, "Ε"), e = e.replace(/&Zeta;/g, "Ζ"), 
    e = e.replace(/&Eta;/g, "Η"), e = e.replace(/&Theta;/g, "Θ"), e = e.replace(/&Iota;/g, "Ι"), 
    e = e.replace(/&Kappa;/g, "Κ"), e = e.replace(/&Lambda;/g, "Λ"), e = e.replace(/&Mu;/g, "Μ"), 
    e = e.replace(/&Nu;/g, "Ν"), e = e.replace(/&Xi;/g, "Ν"), e = e.replace(/&Omicron;/g, "Ο"), 
    e = e.replace(/&Pi;/g, "Π"), e = e.replace(/&Rho;/g, "Ρ"), e = e.replace(/&Sigma;/g, "Σ"), 
    e = e.replace(/&Tau;/g, "Τ"), e = e.replace(/&Upsilon;/g, "Υ"), e = e.replace(/&Phi;/g, "Φ"), 
    e = e.replace(/&Chi;/g, "Χ"), e = e.replace(/&Psi;/g, "Ψ"), e = e.replace(/&Omega;/g, "Ω"), 
    e = e.replace(/&alpha;/g, "α"), e = e.replace(/&beta;/g, "β"), e = e.replace(/&gamma;/g, "γ"), 
    e = e.replace(/&delta;/g, "δ"), e = e.replace(/&epsilon;/g, "ε"), e = e.replace(/&zeta;/g, "ζ"), 
    e = e.replace(/&eta;/g, "η"), e = e.replace(/&theta;/g, "θ"), e = e.replace(/&iota;/g, "ι"), 
    e = e.replace(/&kappa;/g, "κ"), e = e.replace(/&lambda;/g, "λ"), e = e.replace(/&mu;/g, "μ"), 
    e = e.replace(/&nu;/g, "ν"), e = e.replace(/&xi;/g, "ξ"), e = e.replace(/&omicron;/g, "ο"), 
    e = e.replace(/&pi;/g, "π"), e = e.replace(/&rho;/g, "ρ"), e = e.replace(/&sigmaf;/g, "ς"), 
    e = e.replace(/&sigma;/g, "σ"), e = e.replace(/&tau;/g, "τ"), e = e.replace(/&upsilon;/g, "υ"), 
    e = e.replace(/&phi;/g, "φ"), e = e.replace(/&chi;/g, "χ"), e = e.replace(/&psi;/g, "ψ"), 
    e = e.replace(/&omega;/g, "ω"), e = e.replace(/&thetasym;/g, "ϑ"), e = e.replace(/&upsih;/g, "ϒ"), 
    e = e.replace(/&piv;/g, "ϖ"), e = e.replace(/&middot;/g, "·");
}

function p(e) {
    return e = e.replace(/&nbsp;/g, " "), e = e.replace(/&quot;/g, "'"), e = e.replace(/&amp;/g, "&"), 
    e = e.replace(/&lt;/g, "<"), e = e.replace(/&gt;/g, ">");
}

function g(e) {
    return e = e.replace(/&OElig;/g, "Œ"), e = e.replace(/&oelig;/g, "œ"), e = e.replace(/&Scaron;/g, "Š"), 
    e = e.replace(/&scaron;/g, "š"), e = e.replace(/&Yuml;/g, "Ÿ"), e = e.replace(/&fnof;/g, "ƒ"), 
    e = e.replace(/&circ;/g, "ˆ"), e = e.replace(/&tilde;/g, "˜"), e = e.replace(/&ensp;/g, ""), 
    e = e.replace(/&emsp;/g, ""), e = e.replace(/&thinsp;/g, ""), e = e.replace(/&zwnj;/g, ""), 
    e = e.replace(/&zwj;/g, ""), e = e.replace(/&lrm;/g, ""), e = e.replace(/&rlm;/g, ""), 
    e = e.replace(/&ndash;/g, "–"), e = e.replace(/&mdash;/g, "—"), e = e.replace(/&lsquo;/g, "‘"), 
    e = e.replace(/&rsquo;/g, "’"), e = e.replace(/&sbquo;/g, "‚"), e = e.replace(/&ldquo;/g, "“"), 
    e = e.replace(/&rdquo;/g, "”"), e = e.replace(/&bdquo;/g, "„"), e = e.replace(/&dagger;/g, "†"), 
    e = e.replace(/&Dagger;/g, "‡"), e = e.replace(/&bull;/g, "•"), e = e.replace(/&hellip;/g, "…"), 
    e = e.replace(/&permil;/g, "‰"), e = e.replace(/&prime;/g, "′"), e = e.replace(/&Prime;/g, "″"), 
    e = e.replace(/&lsaquo;/g, "‹"), e = e.replace(/&rsaquo;/g, "›"), e = e.replace(/&oline;/g, "‾"), 
    e = e.replace(/&euro;/g, "€"), e = e.replace(/&trade;/g, "™"), e = e.replace(/&larr;/g, "←"), 
    e = e.replace(/&uarr;/g, "↑"), e = e.replace(/&rarr;/g, "→"), e = e.replace(/&darr;/g, "↓"), 
    e = e.replace(/&harr;/g, "↔"), e = e.replace(/&crarr;/g, "↵"), e = e.replace(/&lceil;/g, "⌈"), 
    e = e.replace(/&rceil;/g, "⌉"), e = e.replace(/&lfloor;/g, "⌊"), e = e.replace(/&rfloor;/g, "⌋"), 
    e = e.replace(/&loz;/g, "◊"), e = e.replace(/&spades;/g, "♠"), e = e.replace(/&clubs;/g, "♣"), 
    e = e.replace(/&hearts;/g, "♥"), e = e.replace(/&diams;/g, "♦");
}

function t(e) {
    return e = e.replace(/\r\n/g, ""), e = e.replace(/\n/g, ""), e = e.replace(/\"/g, ""), 
    e = e.replace(/\'/g, "");
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = {
    mergeDeep: r,
    makeRandomStr: function(e) {
        for (var r = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", l = 0; l < e; l++) r += a.charAt(Math.floor(Math.random() * a.length));
        return r;
    },
    weekDayStr: function(e) {
        switch (e) {
          case 0:
            return "星期日";

          case 1:
            return "星期一";

          case 2:
            return "星期二";

          case 3:
            return "星期三";

          case 4:
            return "星期四";

          case 5:
            return "星期五";

          case 6:
            return "星期六";
        }
    },
    strDiscode: function(e) {
        return e = l(e), e = c(e), e = p(e), e = g(e), e = t(e);
    },
    bottleneck: function(e, r) {
        var a = null, l = 0;
        return function() {
            var c = Date.now(), p = this, g = Array.prototype.slice.call(arguments), t = r;
            a && (t = l + r, clearTimeout(a), a = null), l = c, a = setTimeout(function() {
                a = null, l = 0, e.apply(p, g);
            }, t);
        };
    }
};