import { Pool } from 'pg'
import configur from '../env'

const pool = new Pool(configur);

export default pool;
