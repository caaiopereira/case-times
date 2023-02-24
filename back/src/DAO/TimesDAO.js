// Importação do arquivo "db.js"
const db = require("../infra/db");

// Essa classe encapsula o acesso ao Banco de Dados.
class TimesDAO {

    // GET  --  Função ALL - Retorna todas as linhas.
    static listar() {
        const query = 'SELECT * FROM TIMES';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }

    // POST  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos ao usuário.
    static inserir(time) {
        const query = 'INSERT INTO TIMES (nome, origem, divisao) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [time.nome, time.origem, time.divisao], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao inserir o time",
                        erro: err,
                    });
                }
                resolve(time);
            });
        });
    }

    // DELETE -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Time deletado com sucesso" }
    static deletar(id) {
        const query = 'DELETE FROM TIMES WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao deletar o time",
                        erro: err
                    });
                }
                resolve({ mensagem: "Time deletado com sucesso", id: id })
            });
        });
    }
    
    // PUT -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Time atualizado com sucesso" }
    static atualizar(id, time) {
        const query = 'UPDATE TIMES SET nome = ?, origem = ?, divisao = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [time.nome, time.origem, time.divisao, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar o time",
                        erro: err,
                    });
                }
                resolve({ mensagem: "Time atualizado com sucesso" });
            });
        });
    }

}

// Exportação da classe
module.exports = TimesDAO