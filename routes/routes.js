const express = require('express');
const router = express.Router();

// referência a controllers que serão utilizados nas rotas 
const ProdutosController = require('../controllers/produtos');
const UsuariosController = require('../controllers/usuarios');
const TiposUsuarioController = require('../controllers/tipousuario');
const TiposEnderecoController = require('../controllers/tipoendereco');
const TipoPagCompraController = require('../controllers/tipopagcompra');
const FornecedoresController = require('../controllers/fornecedor');
const ComprasController = require('../controllers/compras');
const EnderecoController = require('../controllers/endereco');
const UsuarioEndController = require('../controllers/usuarioendereco');
const Pagamento_comprasController = require('../controllers/pagamentos_compras');


//Usuarios

router.get('/usuarios',UsuariosController.listarUsuarios);
router.post('/usuarios',UsuariosController.cadastrarUsuarios); //body
router.patch('/usuarios/:usu_id',UsuariosController.editarUsuarios); // params (URL) e body 
router.delete('/usuarios/:usu_id',UsuariosController.apagarUsuarios); // params (URL)
//router.delete('/usuarios/del/:usu_id',UsuariosController.apagarUsuarios); // params (URL)
router.post('/usuarios/login',UsuariosController.login); // params (URL)



//Tipo_Usuarios
router.get('/tipousu',TiposUsuarioController.listarTiposUsuario);
router.post('/tipousu',TiposUsuarioController.cadastrarTipoUsuario); //body
router.patch('/tipousu/:tus_cod',TiposUsuarioController.editarTipoUsuario); // params (URL) e body 
router.delete('/tipousu/:tus_cod',TiposUsuarioController.apagarTipoUsuario); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarTipoUsuario); // params (URL)


//Produtos
router.get('/produtos',ProdutosController.listarProdutos);
router.post('/produtos',ProdutosController.cadastrarProdutos); //body
router.patch('/produtos/:prod_id',ProdutosController.editarProdutos); // params (URL) e body 
router.delete('/produtos/:prod_id',ProdutosController.apagarProdutos); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarProdutos); // params (URL)


//Tipos_Enderecos
router.get('/tipoend',TiposEnderecoController.listarTiposEndereco);
router.post('/tipoend',TiposEnderecoController.cadastrarTipoEndereco); //body
router.patch('/tipoend/:ten_cod',TiposEnderecoController.editarTipoEndereco); // params (URL) e body 
router.delete('/tipoend/:ten_cod',TiposEnderecoController.apagarTipoEndereco); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarProdutos); // params (URL)


//Tipos_Pag_Compra
router.get('/tipopagcompra',TipoPagCompraController.listarTiposPagamentoCompra);
router.post('/tipopagcompra',TipoPagCompraController.cadastrarTipoPagamentoCompra); //body
router.patch('/tipopagcompra/:tpa_cod',TipoPagCompraController.editarTipoPagamentoCompra); // params (URL) e body 
router.delete('/tipopagcompra/:tpa_cod',TipoPagCompraController.apagarTipoPagamentoCompra); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarProdutos); // params (URL)


//Fornecedores
router.get('/fornecedor',FornecedoresController.listarFornecedores);
router.post('/fornecedor',FornecedoresController.cadastrarFornecedor); //body
router.patch('/fornecedor/:forn_id',FornecedoresController.editarFornecedor); // params (URL) e body 
router.delete('/fornecedor/:forn_id',FornecedoresController.apagarFornecedor); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarTipoUsuario); // params (URL)


//Compras
router.get('/compras',ComprasController.listarCompras);
router.post('/compras',ComprasController.cadastrarCompra); //body
router.patch('/compras/:comp_id',ComprasController.editarCompra); // params (URL) e body 
router.delete('/compras/:comp_id',ComprasController.apagarCompra); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarTipoUsuario); // params (URL)


//Enderecos
router.get('/endereco',EnderecoController.listarEnderecos);
router.post('/endereco',EnderecoController.cadastrarEndereco); //body
router.patch('/endereco/:end_id',EnderecoController.editarEndereco); // params (URL) e body 
router.delete('/endereco/:end_id',EnderecoController.apagarEndereco); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarTipoUsuario); // params (URL)


//Usuario_Endereco
router.get('/usuarioend',UsuarioEndController.listarUsuarioEndereco);
router.post('/usuarioend',UsuarioEndController.cadastrarUsuarioEndereco); //body
router.patch('/usuarioend/:uen_id',UsuarioEndController.editarUsuarioEndereco); // params (URL) e body 
router.delete('/usuarioend/:uen_id',UsuarioEndController.apagarUsuarioEndereco); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarTipoUsuario); // params (URL)

//Pagamento_compras
router.get('/pagamentos_compras',Pagamento_comprasController.listarPagamentosCompras);
router.post('/pagamentos_compras',Pagamento_comprasController.cadastrarPagamentosCompras); //body
router.patch('/pagamentos_compras/:pag_comp_id',Pagamento_comprasController.editarPagamentosCompras); // params (URL) e body 
router.delete('/pagamentos_compras/:pag_comp_id',Pagamento_comprasController.apagarPagamentosCompras); // params (URL)
//router.delete('/produtos/del/:prod_id',ProdutosController.apagarTipoUsuario); // params (URL)



module.exports = router;