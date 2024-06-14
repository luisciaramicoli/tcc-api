const db = require('../database/connection');

module.exports = {
    async listarTiposUsuario(request, response) {
        try {
            const sql = 'SELECT * FROM tipo_usuario;';
            const tiposUsuario = await db.query(sql);
            const nItens = tiposUsuario[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Tipos de Usuário.',
                dados: tiposUsuario[0],
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

    async cadastrarTipoUsuario(request, response) {
        try {
            const { tus_descricao } = request.body;
            const sql = 'INSERT INTO tipo_usuario (tus_descricao) VALUES (?);';
            const values = [tus_descricao];
            const execSql = await db.query(sql, values);
            const tus_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de tipo de usuário efetuado com sucesso.',
                dados: tus_cod
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarTipoUsuario(request, response) {
        try {
            const { tus_descricao } = request.body;
            const { tus_cod } = request.params;
            const sql = 'UPDATE tipo_usuario SET tus_descricao = ? WHERE tus_cod = ?;';
            const values = [tus_descricao, tus_cod];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de usuário ${tus_cod} atualizado com sucesso!`,
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

    async apagarTipoUsuario(request, response) {
        try {
            const { tus_cod } = request.params;
            const sql = 'DELETE FROM tipo_usuario WHERE tus_cod = ?;';
            const values = [tus_cod];
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de usuário ${tus_cod} excluído com sucesso.`,
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
