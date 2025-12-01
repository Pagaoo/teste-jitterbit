import pg from "pg";
import fs from "fs/promises";
import path from "path";


const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//usada para executar comandos SQL
export const query = (text, params) => pool.query(text, params);

export const initSchema = async () => {
    try {
        const sqlPath = path.resolve(process.cwd(), "init.sql");
        const sqlScript = await fs.readFile(sqlPath, {encoding:"utf-8"});
        await query(sqlScript);
        console.log("Schema criado ou verificado")
    } catch (err) {
        console.error("Erro ao criar ou verificar Schema do banco de dados", err.message)
        throw err;
    }
}

export const testConn = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Conexão estabelecida");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados: ", err.message);
  }
};
