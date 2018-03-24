module.exports = function(e) {
    try {
        normalized = decodeURI(normalized);
    } catch (e) {}
    return encodeURI(normalized);
};