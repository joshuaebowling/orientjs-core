import should from "should"
import config from "config"
import connection from  "../connection"

const dbConfig = config.get('dbConfig');

describe('connection tests', function() {
    const getConn = () => connection({
            address: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            pass: dbConfig.pass,
            db: dbConfig.dbName
        });

    it('should have properties and properties should be right types', () => {
        const shouldCon = should(connection);
        shouldCon.be.a.Function();
    });

    it('connect() should return an object with expected properties and types thereof', (done) => {
        const con = getConn();
        should(con).be.a.Promise();
        con.then(({query, queryAll}) => {
            should(query).be.a.Function();
            done();
        });
    });

    it('query should return results with callback', (done) => {
        const con = getConn();
        con.then(({query}) => {
            var queryResult = query("SELECT * FROM V", {}, (data) => {
                should(data).be.a.Object();
            })
            .then(finish => { 
                should(finish).be.True();
                done();
            })
        ;

        });
    });

    it('query should return all results with all().then', (done) => {
        const con = getConn();
        con.then(({query}) => {
            const queryResult = query("SELECT * FROM V", {});
            console.log('qr',queryResult);
            queryResult.then(results => {
                console.log('results', results);
                should(results).be.a.Array();
                should(results[0]).be.a.Object();
                done();
            });
        });
    });

});