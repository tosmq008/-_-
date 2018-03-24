function o(o) {
    e.push(o);
}

var e = [];

module.exports = {
    addNotification: function(e, n, i) {
        e && n ? (i || console.log("addNotification Warning: no observer will can't remove notice"), 
        o({
            name: e,
            selector: n,
            observer: i
        })) : console.log("addNotification error: no selector or name");
    },
    removeNotification: function(o, n) {
        for (var i = 0; i < e.length; i++) {
            var t = e[i];
            if (t.name === o && t.observer === n) return void e.splice(i, 1);
        }
    },
    postNotificationName: function(o, n) {
        if (0 != e.length) for (var i = 0; i < e.length; i++) {
            var t = e[i];
            t.name === o && t.selector(n);
        } else console.log("postNotificationName error: u hadn't add any notice.");
    },
    addOnceNotification: function(o, n, i) {
        if (e.length > 0) for (var t = 0; t < e.length; t++) {
            var r = e[t];
            if (r.name === o && r.observer === i) return;
        }
        this.addNotification(o, n, i);
    }
};