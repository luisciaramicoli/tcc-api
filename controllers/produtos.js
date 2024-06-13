const db = require('../database/connection');

module.exports = {
    async listarProdutos(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT * FROM bd_tcc_tecdes_223_g5.produto;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = usuarios[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Produtos.',
                dados: usuarios[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async cadastrarProdutos(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { prod_lote_id,prod_preco} = request.body;
            // instrução SQL
            const sql = `INSERT INTO produto 
                (prod_lote_id, prod_preco)
                VALUES (?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values =  [prod_lote_id, prod_preco];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const prod_id = execSql[0].insertId;
              
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de produto efetuado com sucesso.',
                dados: prod_id 
                //mensSql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarProdutos(request, response) {
        try {
            const { prod_preco } = request.body;
            const { prod_id } = request.params;
            const sql = `UPDATE produto SET prod_preco = ? WHERE prod_id = ?`;
            const values = [prod_preco, prod_id];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Produto ${prod_id} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async apagarProdutos(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { prod_id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM produto WHERE prod_id = ?`;
            // array com parâmetros da exclusão
            const values = [prod_id];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Produto ${prod_id} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 
   
  
    
    
}

