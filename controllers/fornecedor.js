const db = require('../database/connection');

module.exports = {
    async listarFornecedores(request, response) {
        try {
            const sql = 'SELECT * FROM FORNECEDORES;';
            const fornecedores = await db.query(sql);
            const nItens = fornecedores[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Fornecedores.',
                dados: fornecedores[0],
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

    async cadastrarFornecedor(request, response) {
        try {
            const { forn_nome, forn_vendedor, forn_telefone, forn_celular, forn_email } = request.body;
            const sql = 'INSERT INTO FORNECEDORES (forn_nome, forn_vendedor, forn_telefone, forn_celular, forn_email) VALUES (?, ?, ?, ?, ?);';
            const values = [forn_nome, forn_vendedor, forn_telefone, forn_celular, forn_email];
            const execSql = await db.query(sql, values);
            const forn_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de fornecedor efetuado com sucesso.',
                dados: forn_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarFornecedor(request, response) {
        try {
            const { forn_nome, forn_vendedor, forn_telefone, forn_celular, forn_email } = request.body;
            const { forn_id } = request.params;
            const sql = 'UPDATE FORNECEDORES SET forn_nome = ?, forn_vendedor = ?, forn_telefone = ?, forn_celular = ?, forn_email = ? WHERE forn_id = ?;';
            const values = [forn_nome, forn_vendedor, forn_telefone, forn_celular, forn_email, forn_id];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Fornecedor ${forn_id} atualizado com sucesso!`,
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

    async apagarFornecedor(request, response) {
        try {
            const { forn_id } = request.params;
            const sql = 'DELETE FROM FORNECEDORES WHERE forn_id = ?;';
            const values = [forn_id];
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Fornecedor ${forn_id} excluído com sucesso.`,
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
