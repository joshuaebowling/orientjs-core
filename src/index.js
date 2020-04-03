import connection from "./connection";
import Vertex from "./data/Vertex";
import Edge from "./data/Edge";

function initializePool({address, port, user, pass, db}) {
    connection.connect({address, port, user, pass, db})
        .then(pool => { 
            console.log('pool created');
        })
        .catch((e) => { 
            throw new Error(e); 
        })
    ;
}

export const core = (address = "", port = 0, user = "", pass = "", db = "") => {
    initializePool({address, port, user, pass, db});
    const result = {
        models: {},
        data: {
            Vertex,
            Edge
        }
    }
};
