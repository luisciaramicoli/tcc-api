const db = require('../database/connection');

module.exports = {
    async listarEnderecos(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT * FROM bd_tcc_tecdes_223_g5.enderecos; `;
            // executa instruções SQL e armazena o resultado na variável usuários
            const enderecos = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = enderecos[0].length;
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários.',
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
    
    async cadastrarEnderecos(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { end_logradouro, end_bairro, end_cidade, end_estado, end_cep} = request.body;
            // instrução SQL
            const sql = `INSERT INTO enderecos
                (end_logradouro, end_bairro, end_cidade, end_estado, end_cep) 
                VALUES (?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [end_logradouro, end_bairro, end_cidade, end_estado, end_cep];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const end_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário efetuado com sucesso.',
                dados: end_id
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
    async editarEnderecos(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { end_logradouro, end_bairro,end_cidade, end_estado, end_cep} = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { end_id } = request.params;
            // instruções SQL
           
            const sql = `UPDATE enderecos SET end_logradouro = ?, end_bairro = ?, 
            end_cidade = ?, end_estado = ?,  end_cep = ?
                 WHERE end_id = ?`;
            // preparo do array com dados que serão atualizados
            const values = [end_logradouro, end_bairro, end_cidade, end_estado, end_cep,end_id];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Endereços ${end_id} atualizado com sucesso!`,
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
    async apagarEnderecos(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { usu_id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            // array com parâmetros da exclusão
            const values = [usu_id];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} excluído com sucesso`,
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
    async ocultarEnderecos(request, response) {
        try {
            const usu_ativo = false; 
            const { usu_id } = request.params; 
            const sql = `UPDATE usuarios SET usu_ativo = ? 
                WHERE usu_id = ?;`;
            const values = [usu_ativo, usu_id]; 
            const atualizacao = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} excluído com sucesso`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 
    async login(request, response) {
        try {

            const { usu_email, usu_senha } = request.body;

            const sql = `SELECT usu_id, usu_nome, tus_cod FROM usuarios 
                WHERE usu_email = ? AND usu_senha = ?`;

            const values = [usu_email, usu_senha];

            const usuarios = await db.query(sql, values);
            const nItens = usuarios[0].length; 

            if (nItens < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Login e/ou senha inválido.',
                    dados: null,
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: usuarios[0]
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

