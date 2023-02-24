// Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado.

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Times

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const TIMES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "TIMES" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(90),
    "origem" varchar(40),
    "divisao" varchar(40)
);`;


// Função responsável por criar a tabela "TIMES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function createTableTimes() {
    db.run(TIMES_SCHEMA, (error)=> {
      if (error) console.log("Erro ao criar tabela de times");
    });
}


// Funções executadas de forma síncrona, uma após a outra, dentro da função serialize(). Ao final da execução dessas funções, o banco de dados estará criado e populado com as informações fornecidas.
db.serialize( ()=> {
    createTableTimes();
});