module.exports = {
    randomCode: function(size, string){
        string= (string||'abcdefghijklmnopqrstuvwxyz0123456789').split('')
            .sort(function(){return 0.5-Math.random()});//shuffle
        
        var finalWord = '', lastChar = '', charBeforeLast = '';
        var i = 0, length = string.length, ch;
        while (i++ < size) {
            while ((ch=string[Math.floor(Math.random() * length)])===lastChar || ch===charBeforeLast)
                ;
            charBeforeLast = lastChar;
            finalWord += (lastChar = ch);
        }
        return finalWord;
    }
};
