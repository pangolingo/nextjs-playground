import postgres from 'postgres';
import { DB_CONNECTION_STRING } from '$env/static/private';

const sql = postgres(DB_CONNECTION_STRING);

export default sql;
