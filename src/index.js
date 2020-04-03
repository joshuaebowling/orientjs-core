import connection from "./connection";
import Vertex from "./data/Vertex";
import Edge from "./data/Edge";

connection.connect()
    .then(pool => { 
        console.log('pool created');
    })
    .catch((e) => { throw new Error(e); })

console.log(connection);

export const core = {
    models: {},
    data: {
        Vertex,
        Edge
    }
};
