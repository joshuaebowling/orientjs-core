/// <reference path="../../index.d.ts" />

import orientjs from "orientjs";
import memoizee from "memoizee";

const client = orientjs.OrientDBClient;

const _getClient = async (connectionParams: Data.Parameters.IConnectionParameters) => {
    const {address, port} = connectionParams;
    const connectedClient: Data.IClient = await client.connect({host: address, port});
    return connectedClient;
    // new Promise((resolve, reject) => {
    //     return client.connect({
    //         host: address,
    //         port: port
    //     })
    //         .then(client => {
    //             client.sessions({ name: db, username: user, password: pass })
    //                 .then(pool => {
    //                     // redefine connection function for later callz
    //                     pool.acquire().then(session => {
    //                         var result = { session: session, close: pool.close };
    //                         resolve(result);
    //                     });
    //                 })
    //             ;
    //         })
    //         .catch(e => reject(e))
    //     ;
    // });
};

const _mgetClient: (connectionParams: Data.Parameters.IConnectionParameters) => PromiseLike<Data.IClient> = memoizee(_getClient, {async: true});


const _getSession =  (cliConnection: Data.IClient) => async (sessionParams: Data.Parameters.ISessionsParameters) => {
    const pool: Data.ISessions = await cliConnection.sessions(sessionParams);
    const session: Data.ISession  = await pool.acquire();
    return session;
}
const noop = (data:any) => {};
const queryGenerator = (connection) => async (cmd, parameters, callback = noop) => 

    new Promise((resolve, reject) => {
        var query = connection.session.query(cmd, parameters);
        if(callback === null) {
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

// const queryAllGenerator = (connection) => (cmd, parameters) =>
//     new Promise((resolve, reject) => {
//         resolve(connection.session.query(cmd, parameters));
//     });

const connection = async (connectionParams: Data.Parameters.IPoolConnectionParameters) => { 
    const {address, port, user, pass, db} = connectionParams;
    var client: Data.IClient;
    var session: Data.ISession;
    try {
        client = await _mgetClient({address, port});
        session = await _getSession(client)({user, pass, db});

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
  