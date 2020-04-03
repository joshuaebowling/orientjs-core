import connection from "../connection";

const BaseRepo = {
    getAll: (className = "", callback) => {
        var query = 
        `SELECT * 
        FROM 
            ${className}
        `
        console.log('query,callback=', query, callback);
        return connection.query(query, {}, data => (callback || console.log)(data));
    }
};
export default BaseRepo;