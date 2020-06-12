// import connection from "./connection";
// import Vertex from "./data/Vertex";
// import Edge from "./data/Edge";
// import ioc from "./utils/ioc";

// function initializePool({address, port, user, pass, db}) {
//     connection.connect({address, port, user, pass, db})
//         .then(() => ioc.log.message('connected'))
//         .catch((e) => { 
//             ioc.log.error(e)
//             throw new Error(e); 
//         })
//     ;
// };
    

// export const core = (address = "", port = 0, user = "", pass = "", db = "") => {
//     initializePool({address, port, user, pass, db});
//     const result = {
//         models: {},
//         data: {
//             Vertex,
//             Edge
//         }
//     }
// };
