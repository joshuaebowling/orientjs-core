// import should from 'should'
// import vertex from  "./data/Vertex"

// describe('vertex repo tests', function() {
    
//     it('should have properties and properties should be right types', () => {
//         const shouldCon = should(connection);
//         shouldCon.be.a.Object();
//         shouldCon.have.property('connect')
//         should(connection.connect).be.a.Function();
//     });

//     it('connect() should return an object with expected properties and types thereof', (done) => {
//         const con = connection.connect();
//         should(con).be.a.Promise();
//         con.then(({session}) => {
//             should(session.query).be.a.Function();            
//             should(session.close).be.a.Function();
//             done();
//         });
//     });

//     it('query should return results', (done) => {
//         const con = connection.connect();
//         con.then((connection) => {       
//             var query = connection.session.query("SELECT * FROM V", {});
//             query.all().then(results => {
//                 should(results).be.a.Array();
//                 should(results[0]).be.a.Object();
//                 done();
//             });
//         });
//     });
    
// });