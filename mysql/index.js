import mysql from 'mysql'
import {readFile, readFileSync} from 'fs'
export const connection = mysql.createConnection({
    "host"     : "localhost",
    "user"     : "apisoketwhatsapp",
    "password" : "Nei#8suptec",
    "database" : "apisoketwhatsapp"
});
    
  