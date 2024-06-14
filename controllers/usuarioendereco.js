const db = require('../database/connection');

module.exports = {
    async listarUsuarioEndereco(request, response) {
        try {
            const sql = 'SELECT * FROM USUARIO_ENDERECO;';
            const usuarioEndereco = await db.query(sql);
            const dados = usuarioEndereco[0].map(item => {
                return {
                    ...item,
                    uen_principal: item.uen_principal[0] === 1,
                    uen_secundario: item.uen_secundario[0] === 1
                };
            });
            const nItens = dados.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuário Endereço.',
                dados,
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

    async cadastrarUsuarioEndereco(request, response) {
        try {
            const { usu_id, end_id, uen_secundario, uen_complemento, uen_principal, ten_cod } = request.body;
            const sql = 'INSERT INTO USUARIO_ENDERECO (usu_id, end_id, uen_secundario, uen_complemento, uen_principal, ten_cod) VALUES (?, ?, ?, ?, ?, ?);';
            const values = [usu_id, end_id, uen_secundario, uen_complemento, uen_principal, ten_cod];
            const execSql = await db.query(sql, values);
            const uen_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário endereço efetuado com sucesso.',
                dados: uen_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarUsuarioEndereco(request, response) {
        try {
            const { usu_id, end_id, uen_secundario, uen_complemento, uen_principal, ten_cod } = request.body;
            const { uen_id } = request.params;
            const sql = 'UPDATE USUARIO_ENDERECO SET usu_id = ?, end_id = ?, uen_secundario = ?, uen_complemento = ?, uen_principal = ?, ten_cod = ? WHERE uen_id = ?;';
            const values = [usu_id, end_id, uen_secundario, uen_complemento, uen_principal, ten_cod, uen_id];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário Endereço ${uen_id} atualizado com sucesso!`,
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

    async apagarUsuarioEndereco(request, response) {
        try {
            const { uen_id } = request.params;
            const sql = 'DELETE FROM USUARIO_ENDERECO WHERE uen_id = ?;';
            const values = [uen_id];
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário Endereço ${uen_id} excluído com sucesso.`,
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
