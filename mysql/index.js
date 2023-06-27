import mysql from 'mysql'
export const connection =  mysql.createPool({
    "connectionLimit" : 10,
    "host"     : "localhost",
    "user"     : "root",
    "password" : "Nei#8suptec",
    "database" : "apisoketwhatsapp"
});


