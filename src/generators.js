/**
 * @module generators
 */

/**
 * Generate a random code with the specified size
 *
 * @param {Number} size
 * @param {String=} characters
 * @return {Map}
 */
exports.randomCode = function(size, characters) {
    characters = (characters||'abcdefghijklmnopqrstuvwxyz0123456789').split('')
        .sort(() => { return 0.5 - Math.random(); });//shuffle

    var finalWord = '', lastChar = '', charBeforeLast = '';
    var i = 0, length = characters.length, ch;
    while (i++ < size) {
        while ((ch=characters[Math.floor(Math.random() * length)])===lastChar || ch===charBeforeLast) {
        }
        charBeforeLast = lastChar;
        finalWord += (lastChar = ch);
    }
    return finalWord;
};
