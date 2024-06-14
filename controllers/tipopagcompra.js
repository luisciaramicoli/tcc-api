const db = require('../database/connection');

module.exports = {
    async listarTiposPagamentoCompra(request, response) {
        try {
            const sql = 'SELECT * FROM tipo_pagamento_compra;';
            const tiposPagamentoCompra = await db.query(sql);
            const nItens = tiposPagamentoCompra[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Tipos de Pagamento de Compra.',
                dados: tiposPagamentoCompra[0],
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

    async cadastrarTipoPagamentoCompra(request, response) {
        try {
            const { tpa_descricao } = request.body;
            const sql = 'INSERT INTO tipo_pagamento_compra (tpa_descricao) VALUES (?);';
            const values = [tpa_descricao];
            const execSql = await db.query(sql, values);
            const tpa_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de tipo de pagamento de compra efetuado com sucesso.',
                dados: tpa_cod
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarTipoPagamentoCompra(request, response) {
        try {
            const { tpa_descricao } = request.body;
            const { tpa_cod } = request.params;
            const sql = 'UPDATE tipo_pagamento_compra SET tpa_descricao = ? WHERE tpa_cod = ?;';
            const values = [tpa_descricao, tpa_cod];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de pagamento de compra ${tpa_cod} atualizado com sucesso!`,
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

    async apagarTipoPagamentoCompra(request, response) {
        try {
            const { tpa_cod } = request.params;
            const sql = 'DELETE FROM tipo_pagamento_compra WHERE tpa_cod = ?;';
            const values = [tpa_cod];
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de pagamento de compra ${tpa_cod} excluído com sucesso.`,
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
