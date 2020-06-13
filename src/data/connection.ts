/// <reference path="../../index.d.ts" />

import orientjs from "orientjs";
import memoizee from "memoizee";

const client = orientjs.OrientDBClient;

const _getClient = async (connectionParams: Data.Parameters.IConnectionParameters) => {
    const {address, port} = connectionParams;
    var connectedClient: Data.IClient;
    try {
        connectedClient = await client.connect({host: address, port});
    } catch(e) {
        console.log(e);
        throw e;
    }
    return connectedClient;
};

const _mgetClient: (connectionParams: Data.Parameters.IConnectionParameters) => PromiseLike<Data.IClient> = memoizee(_getClient, {async: true});


const _getSession =  (cliConnection: Data.IClient) => async (sessionParams: Data.Parameters.ISessionsParameters) => {
    const pool: Data.ISessions = await cliConnection.sessions(sessionParams);
    const session: Data.ISession  = await pool.acquire();
    return session;
}


const queryGenerator = (session: Data.ISession) => async (cmd: string, parameters?: { params: object }| null, callback?: (data:any) => void | null) => 

    new Promise((resolve, reject) => {
        var query = session.query(cmd, parameters, callback);
        if(!callback) {
            resolve(query.all());
        } else {
            query
                .on('data', callback)
                .on('error', (error) => {
                    reject(error);
                })
                .on('end', () => {
                    resolve(true);
                })
            ;
        }
    });


const connection = async (connectionParams: Data.Parameters.IPoolConnectionParameters) => { 
    const {address, port, user, pass, db} = connectionParams;
    var client: Data.IClient;
    var session: Data.ISession;
    try {
        client = await _mgetClient({address, port});
        session = await _getSession(client)({username: user, password: pass, name: db});
    } catch(e) {
        console.log(e);
        throw e;
    };

    const result = {
        query: queryGenerator(session)
    };
    return result;
};

export default connection;