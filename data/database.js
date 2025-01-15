import sqlite from "sqlite3"

const db = new sqlite.Database("./data/database.sqlite")

async function initializeDb(){
    await dbRun("DROP TABLE IF EXISTS products")
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, brand STRING, description STRING, price INTEGER)")
    await dbRun('INSERT INTO products (name, brand, description, price) VALUES ("Start Wars Millennium Falcon", "Lego", "LEGO - for adults, recommended for ages 18 and up, LEGO® Star Wars series, release year 2024, pack of 921 building blocks", 23760)')
    await dbRun('INSERT INTO products (name, brand, description, price) VALUES ("Bodzás Limonádé 1,5L", "Márka", "Bodza és citromizű üdítőital", 500)')

}

async function dbRun(sql, params = []) {
    return new Promise((resolve, reject)=>{
        db.run(sql, params, function(err){
            if(err) {reject(err)}
            else {resolve(this)}
        })
    })
}
async function dbGet(sql, params = []) {
    return new Promise((resolve, reject)=>{
        db.get(sql, params,(err, row) => {
            if(err) {reject(err)}
            else {resolve(row)}
        })
    })
}
async function dbAll(sql, params = []) {
    return new Promise((resolve, reject)=>{
        db.all(sql, params,(err, rows) => {
            if(err) {reject(err)}
            else {resolve(rows)}
        })
    })
}

export { dbRun, dbGet, dbAll, initializeDb}