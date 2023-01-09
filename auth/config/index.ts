import sql from 'mssql'

import dotenv from 'dotenv'

dotenv.config()

const sqlConfig= {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: 'localhost',
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: false
    }
}

sql.connect(sqlConfig).then(async pool=>{
    if(await pool.connect()){
        console.log('connected'); 
    }
})

export default sqlConfig

