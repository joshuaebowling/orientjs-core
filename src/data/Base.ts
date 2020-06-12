// import connection from "./connection";
// import IoC from "../utils/ioc";



// const BaseRepo = {
//     getAllStreaming: async (className = "", onStream = null, onFinish = null) => {
//         var queryStr = 
//         `SELECT * 
//         FROM 
//             ${className}
//         `
//         return new Promise((resolve, reject) => 
//             connection()
//                 .then(({query}) => query(queryStr, {}))
//                 .catch(e => IoC.Log.error(e)))
//             ;
//     }
// };
// export default BaseRepo;