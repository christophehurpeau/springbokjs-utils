var alphaNumber = function(index) {
    return S.defineProperties({}, {
        encode: function(number) {
            var base = index.length;
            
            var result = "";
            for (var t = Math.floor(Math.log(number) / Math.log(base)); t >= 0; t--) {
                var bcp = this.bcpow(base,t);
                var a   = Math.floor(number / bcp) % base;
                result += index.substr(a,1);
                number = number - (a * bcp);
            }
            return result; // 

reverse

        },
        decode: function(string) {
            var base = index.length, result = 0;
            var len = string.length - 1;
            for (var t = 0; t <= len; t++){
                result += index.indexOf(string.substr(t,1)) * this.bcpow(base, len - t);
            }
            return result;
        
            $result = sprintf('%F', $result);
            return substr($result, 0, strpos($result, '.'));
        },
        /* http://php.net/manual/fr/function.bcpow.php */
        bcpow: function(_a, _b) {
            return Math.floor(Math.pow(parseFloat(_a), parseInt(_b)));
        }
    });
};
alphaNumber.html = alphaNumber("abcdfghjklmonpqrstvwxyz_012345ABCDFGHJKLMNOPQRSTVWXYZ6789"); // - could be allowed too, but reserved as separator
alphaNumber.url = alphaNumber("abcdfghjklmonpqrstvwxyz_012345ABCDFGHJKLMNOPQRSTVWXYZ6789-~");

module.exports = alphaNumber;