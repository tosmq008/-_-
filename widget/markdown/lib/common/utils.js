function t(t) {
    return Object.prototype.toString.call(t);
}

function o(t) {
    return u[t];
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = Object.prototype.hasOwnProperty, n = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g, i = /[&<>"]/, c = /[&<>"]/g, u = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
};

exports.assign = function(t) {
    return [].slice.call(arguments, 1).forEach(function(o) {
        if (o) {
            if ("object" !== (void 0 === o ? "undefined" : r(o))) throw new TypeError(o + "must be object");
            Object.keys(o).forEach(function(r) {
                t[r] = o[r];
            });
        }
    }), t;
}, exports.isString = function(o) {
    return "[object String]" === t(o);
}, exports.has = function(t, o) {
    return !!t && e.call(t, o);
}, exports.unescapeMd = function(t) {
    return t.indexOf("\\") < 0 ? t : t.replace(n, "$1");
}, exports.isValidEntityCode = function(t) {
    return !(t >= 55296 && t <= 57343 || t >= 64976 && t <= 65007 || 65535 == (65535 & t) || 65534 == (65535 & t) || t >= 0 && t <= 8 || 11 === t || t >= 14 && t <= 31 || t >= 127 && t <= 159 || t > 1114111);
}, exports.fromCodePoint = function(t) {
    if (t > 65535) {
        var o = 55296 + ((t -= 65536) >> 10), r = 56320 + (1023 & t);
        return String.fromCharCode(o, r);
    }
    return String.fromCharCode(t);
}, exports.escapeHtml = function(t) {
    return i.test(t) ? t.replace(c, o) : t;
};