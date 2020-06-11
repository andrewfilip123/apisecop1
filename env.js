import dotenv  from 'dotenv';

dotenv.config();

const configur = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_BD,
    password: process.env.PG_PWD,
    port: process.env.PG_PORT
};


export default configur;