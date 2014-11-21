var _ = require('underscore');

class Response{

    constructor(onSend){

        if(typeof onSend ==='function' && onSend.length === 2 ){
            this.onSend = onSend;
            this.data = null;
            this.stat = 200;
            return;
        }

        console.error('Invalid OnSend Signature or type');
        throw new Error('Invalid OnSend Signature or type');
    }

    send(data, dontUseme){

        if(dontUseme){
            throw new Error('Don\'t use response.send(status, data), use response.status(status).send(data)');
        }

        console.log('sending ' + JSON.stringify(data));

        this.data = data;

        this.onSend(this.stat,data);

    }

    status (n){
        if(typeof n === 'number'){ // Setter
            console.log('setting.status: %n' ,n);
            this.stat = n;
            return;
        }
        return this.stat;
    }
}
class App {

    constructor(){
        this._callbacks = [];
    }

    get callbacks (){
        return this._callbacks;
    }
    set callbacks (value){
        this._callbacks = value;
    }

    get(path, callBack){

        if(typeof callBack === 'function'){ //Setter
            this.callbacks.push({path:path,callback:callBack});
            return;
        }

        var found = _.findWhere(this.callbacks,{path:path});
        return found ? found.callback : function(){throw new Error("Not Found");};
    }

}

module.exports = {
    App:App, Response:Response
};