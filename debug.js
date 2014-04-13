module.exports = {
    stack: function(){
        try{throw new Error();}catch(err){ console.log(err.stack); }
    },
    dump: function(o){
        /*#if NODE*/
        return require('util').inspect(o);
        /*#/if*/
        //TODO
        
    }
};