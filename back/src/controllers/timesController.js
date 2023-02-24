const TimesDAO = require('../DAO/TimesDAO')

class timesController {
    static rotas(app){
        // Rotas para os recursos times. O endpoint das rotas aparece na primeira parte entre aspas. O que vem depois são os métodos que trabalharão com as requisições.
        app.get('/times', timesController.listar)
        app.post('/times', timesController.inserir)
        app.delete('/times/:id', timesController.deletar)
        app.put('/times/:id', timesController.atualizar)
    }

    // GET
    static async listar(req, res){
        const times = await TimesDAO.listar()
        
        // Devolve a lista e o status code 200, quer dizer que a requisição foi bem sucedida.
        res.status(200).send(times)
    }

    // POST
    static async inserir(req, res){
        const time = {
            nome: req.body.nome,
            origem: req.body.origem,
            divisao: req.body.divisao
        }
        // Verifica se o corpo da requisição está sendo enviado com todas as chaves, se faltar alguma chave, entra no If e dá um status de requisição mal sucedida, dá um return encerrando a função.
        if(!time || !time.nome || !time.origem || !time.divisao) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        // Classe TimesDAO é chamada com o método inserir para adicionar o time na tabela de times no banco e retorna o resultado da operação que é o próprio time cadastrado
        const result = await TimesDAO.inserir(time)

        // Se o resultado retornado não for o time que enviamos, ele trará a informação da chave erro. Esse retorno de erro tem ligação com uma funcão de conexão do próprio SQLite. Se entrar no If, dá um status code 500.        
        if(result.erro) {
            res.status(500).send(result)
        }

        // Se o cadastro ocorrer tudo OK, devolve o status code 201, que é o ideal para ROTAS POST, que quer dizer: Recurso Criado, ou seja, houve a cadastro de algo no banco. 
        // Abaixo a resposta personalizada que será mostrada, em caso de status 201. Além da mensagem, mostra também o objeto cadastrado
        res.status(201).send({"Mensagem": "Time criado com sucesso", "Novo Time: ": time})
    }

    // DELETE
    static async deletar(req, res) {
        // Envia a constante id para TimesDAO.deletar.
        const time = await TimesDAO.deletar(req.params.id)

        // Se o time não for encontrado, devolve um erro staus code 500.
        if(time.erro){
            res.status(500).send({'Menssagem': 'Erro ao deletar o time'})
            return
        }

        res.status(200).send({mensagem: 'Time removido com sucesso'})
    }

    // PUT --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Time" atualizado com sucesso" }
    static async atualizar(req, res){
        const time = {
            nome: req.body.nome,
            origem: req.body.origem,
            divisao: req.body.divisao
        }

        const result = await TimesDAO.atualizar(req.params.id, time)

        if(result.erro){
            res.status(500).send('Erro ao atualizar o time')
            return
        }

        res.status(200).send({mensagem: 'Time atualizado com sucesso', "Time: ": time})
    }
}

// Exportação da Classe "timesController"
module.exports = timesController