/// <reference path="../../index.d.ts"/>
const Log: Utils.ILog = {
    message: (message) => console.log(message),
    error: (e, opts) => console.log(JSON.stringify(e, ...opts)) 
};

export default Log;