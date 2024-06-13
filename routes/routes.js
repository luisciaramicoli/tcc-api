const express = require('express');
const router = express.Router();

// referência a controllers que serão utilizados nas rotas 
const UsuariosController = require('../controllers/usuarios');
const ProdutosController = require('../controllers/produtos');


router.get('/usuarios',UsuariosController.listarUsuarios);
router.post('/usuarios',UsuariosController.cadastrarUsuarios); //body
router.patch('/usuarios/:usu_id',UsuariosController.editarUsuarios); // params (URL) e body 
router.delete('/usuarios/:usu_id',UsuariosController.apagarUsuarios); // params (URL)
//router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);
router.post('/usuarios/login', UsuariosController.login);

router.get('/produtos', ProdutosController.listarProdutos);
router.post('/produtos', ProdutosController.cadastrarProdutos); //body
router.patch('/produtos/:prod_id', ProdutosController.editarProdutos); // params (URL) e body 
router.delete('/produtos/:prod_id', ProdutosController.apagarProdutos); // params (URL)


module.exports = router;