import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./clientes.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT
    )
  `);
});

export default db;
