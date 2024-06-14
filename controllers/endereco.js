const db = require('../database/connection');

module.exports = {
    async listarEnderecos(request, response) {
        try {
            const sql = 'SELECT * FROM ENDERECOS;';
            const enderecos = await db.query(sql);
            const nItens = enderecos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Endereços.',
                dados: enderecos[0],
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

    async cadastrarEndereco(request, response) {
        try {
            const { end_logradouro, end_bairro, end_cidade, end_estado, end_cep } = request.body;
            const sql = 'INSERT INTO ENDERECOS (end_logradouro, end_bairro, end_cidade, end_estado, end_cep) VALUES (?, ?, ?, ?, ?);';
            const values = [end_logradouro, end_bairro, end_cidade, end_estado, end_cep];
            const execSql = await db.query(sql, values);
            const end_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de endereço efetuado com sucesso.',
                dados: end_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarEndereco(request, response) {
        try {
            const { end_logradouro, end_bairro, end_cidade, end_estado, end_cep } = request.body;
            const { end_id } = request.params;
            const sql = 'UPDATE ENDERECOS SET end_logradouro = ?, end_bairro = ?, end_cidade = ?, end_estado = ?, end_cep = ? WHERE end_id = ?;';
            const values = [end_logradouro, end_bairro, end_cidade, end_estado, end_cep, end_id];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereço ${end_id} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async apagarEndereco(request, response) {
        try {
            const { end_id } = request.params;
            const sql = 'DELETE FROM ENDERECOS WHERE end_id = ?;';
            const values = [end_id];
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereço ${end_id} excluído com sucesso.`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}
