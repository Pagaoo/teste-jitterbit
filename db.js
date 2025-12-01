import pg from "pg";
import fs from "fs/promises";
import path from "path";

let pool;

// Inicializa o Pool de Conexões
export const initializeDB = () => {
  if (pool) return;
  pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
};

// Executar consultas simples
export const query = (text, params) => {
  if (!pool) throw new Error("Pool de conexões não inicializado.");
  return pool.query(text, params);
};

// Testar a conexão
export const testConnection = async () => {
  if (!pool) throw new Error("Pool de conexões não inicializado.");
  try {
    await pool.query("SELECT 1");
    console.log("Conexão com PostgreSQL estabelecida com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar com PostgreSQL:", err.message);
    throw err;
  }
};

// Criação de tabelas
export const initializeSchema = async () => {
  try {
    const sqlPath = path.resolve(process.cwd(), "init.sql");
    const sqlScript = await fs.readFile(sqlPath, { encoding: "utf-8" });

    // Executa o script que cria as tabelas com CREATE TABLE IF NOT EXISTS
    await query(sqlScript);

    console.log("Schema do banco de dados verificado/criado com sucesso.");
  } catch (err) {
    console.error(
      "Erro ao inicializar o schema do banco de dados (init.sql):",
      err.message
    );
    throw err;
  }
};

export const transaction = async (callback) => {
  if (!pool) throw new Error("Pool de conexões não inicializado.");

  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Inicia a transação
    const result = await callback(client);
    await client.query("COMMIT"); // Confirma as operações
    return result;
  } catch (error) {
    await client.query("ROLLBACK"); // Desfaz todas as operações em caso de erro
    throw error;
  } finally {
    client.release(); // Libera o cliente para o pool
  }
};
