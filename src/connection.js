import orientjs from "orientjs";

const client = orientjs.OrientDBClient;

var _connection = ({address, port, user, pass, db}) => 
    new Promise((resolve, reject) => {        
        return client.connect({
            host: address,
            port: port
        })
            .then(client => {
                client.sessions({ name: db, username: user, password: pass })
                .then(pool => {
                    // redefine connection function for later callz
                    pool.acquire().then(session => {
                        var result = { session: session, close: pool.close };
                        resolve(result);
                    });
                })
            })
            .catch(e => reject(e))
        ;
    });

const queryGenerator = (connection) => (cmd, parameters, callback = null) => {
        return new Promise((resolve, reject) => {
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

    };

const queryAllGenerator = (connection) => (cmd, parameters) => {
        return new Promise((resolve, reject) => {
            resolve(connection.session.query(cmd, parameters));
        });
    };


export default ({address, port, user, pass, db}) => { 
    const connection = _connection({address, port, user, pass, db});
    return new Promise((resolve, reject) => {
        connection.then(con => {
            resolve({
                query: queryGenerator(con)
            });
        });
    });
};
  