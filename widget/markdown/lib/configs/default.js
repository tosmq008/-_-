module.exports = {
    options: {
        html: !1,
        xhtmlOut: !1,
        breaks: !1,
        langPrefix: "language-",
        linkify: !1,
        linkTarget: "",
        typographer: !1,
        quotes: "“”‘’",
        highlight: null,
        maxNesting: 20
    },
    components: {
        core: {
            rules: [ "block", "inline" ]
        },
        block: {
            rules: [ "heading", "hr", "htmlblock", "paragraph", "table" ]
        },
        inline: {
            rules: [ "autolink", "backticks", "del", "emphasis", "escape", "ins", "mark", "links", "newline", "text" ]
        }
    }
};