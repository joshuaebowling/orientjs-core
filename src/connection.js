import orientjs from "orientjs";

const client = orientjs.OrientDBClient;

var _connection = new Promise((resolve, reject) => {
    return client.connect({
        host: "localhost",
        port: 2424
    })
        .then(client => {
            client.sessions({ name: "archetype", username: "root", password: "root" })
            .then(pool => {
                // redefine connection function for later callz
                pool.acquire().then(session => {
                    var result = { session: session, close: pool.close };
                    _connection = new Promise(resolve => resolve(result));
                    resolve(result);
                });
            })
        })
        .catch(e => reject(e))
    ;
});

function queryGenerator(cmd, parameters, callback) {
    return new Promise((resolve, reject) => {
        _connection.then(query => { 
            var query = session.query(cmd, parameters);
            query
                .on('data', callback)
                .on('error', (error) => {
                    reject(error);
                })
                .on('end', () => {
                    resolve(true);
                })
            ;                
        })
        .catch()
        ;  
    });

}


export default { 
    connect: () => _connection,
    query: queryGenerator
}
  