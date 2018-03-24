function e() {}

function t(e) {
    return {
        tag: e
    };
}

var n = require("./common/utils.js").assign;

module.exports = e, e.prototype.render = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, d = e.length, p = -1, l = [];
    o.imageId = 0;
    for (var s = -1, r = []; ++p < d; ) {
        var h = e[p];
        if ("heading_open" === h.type) (y = t("block")).index = p, y.token = h, y.style = "h" + h.hLevel, 
        r.push(y); else if ("paragraph_open" === h.type) (y = t("block")).index = p, y.token = h, 
        r.push(y); else if ("inline" === h.type) {
            (y = t("inline")).index = p, y.token = h, s > 0 ? o = n(o, {
                order_index: s
            }) : delete o.order_index, this.renderInline(y, h, i, o);
            var a = r.pop();
            a.children || (a.children = []), a.children.push(y), r.push(a);
        } else if (h.type.indexOf("close") > 0) {
            "ordered_list_close" === h.type && (s = -1);
            var u = r.pop(), c = r.pop();
            c ? (c.children || (c.children = []), c.children.push(u), r.push(c)) : l.push(u);
        } else if ("bullet_list_open" === h.type) (y = t("bullet-list")).index = p, y.token = h, 
        r.push(y); else if ("list_item_open" === h.type) s >= 0 && s++, (y = t("list-item")).index = p, 
        y.token = h, r.push(y); else if ("ordered_list_open" === h.type) s = 0, (y = t("ordered-list")).index = p, 
        y.token = h, r.push(y); else if ("table_open" === h.type) (y = t("table")).index = p, 
        y.token = h, r.push(y); else if ("thead_open" === h.type) (y = t("thead")).index = p, 
        y.token = h, r.push(y); else if ("tr_open" === h.type) (y = t("tr")).index = p, 
        y.token = h, r.push(y); else if ("th_open" === h.type) (y = t("th")).index = p, 
        y.token = h, r.push(y); else if ("td_open" === h.type) (y = t("td")).index = p, 
        y.token = h, r.push(y); else if ("tbody_open" === h.type) (y = t("tbody")).index = p, 
        y.token = h, r.push(y); else if ("hr" === h.type) (y = t("hr")).index = p, y.token = h, 
        l.push(y); else if ("video" === h.type) (y = t("video")).index = p, y.token = h, 
        y.src = h.src, l.push(y); else if ("audio" === h.type) (y = t("audio")).index = p, 
        y.token = h, y.src = h.src, y.name = h.name, y.author = h.author, l.push(y); else if ("file" === h.type) (y = t("file")).index = p, 
        y.token = h, y.src = h.src, y.name = h.name, l.push(y); else if ("loc" === h.type) (y = t("loc")).index = p, 
        y.token = h, y.latitude = h.latitude, y.longitude = h.longitude, y.markers = [ {
            iconPath: "/widget/markdown/marker.png",
            title: h.name,
            id: 0,
            latitude: h.latitude,
            longitude: h.longitude,
            width: 25,
            height: 25
        } ], y.name = h.name, y.address = h.address, l.push(y); else if ("hardbreak" === h.type || "softbreak" === h.type) {
            var y = t("break");
            y.index = p, y.token = h, l.push(y);
        }
    }
    return l;
}, e.prototype.renderInline = function(e, n, i, o) {
    var d = void 0;
    n.children.forEach(function(n, i) {
        if (e.children || (e.children = []), "text" === n.type || "code" === n.type) (p = t(d ? d : n.type)).index = i, 
        p.node = n, o.order_index ? (p.content = o.order_index + ". " + n.content, delete o.order_index) : p.content = n.content, 
        e.children.push(p); else if ("strong_open" === n.type || "del_open" === n.type || "em_open" === n.type || "ins_open" === n.type || "mark_open" === n.type || "tel_open" === n.type) d = n.type.slice(0, -5); else if ("strong_close" === n.type || "del_close" === n.type || "em_close" === n.type || "ins_close" === n.type || "mark_close" === n.type || "tel_close" === n.type) d = void 0; else if ("hardbreak" === n.type || "softbreak" === n.type) (p = t("break")).index = i, 
        p.node = n, e.children.push(p); else if ("image" === n.type) {
            var p = t("image");
            p.index = i, p.node = n, p.src = n.src, p.title = n.title, p.alt = n.alt, p.imageId = o.imageId++, 
            e.children.push(p);
        }
    });
};