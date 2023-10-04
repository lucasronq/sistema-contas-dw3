const express = require('express');
const routerApp = express.Router();

const usuariosController = require('../modules/usuarios/usuarios.controller');
const contasContoller = require('../modules/contas/contas.controller');

routerApp.use((req, res, next) => {
    next();
});

routerApp.post('/login', usuariosController.login);
routerApp.post('/logout', usuariosController.autenticaJWT, usuariosController.logout);

routerApp.get('/contas', usuariosController.autenticaJWT, contasContoller.getAllContas);
routerApp.get('/conta/:id', usuariosController.autenticaJWT, contasContoller.getContaById);
routerApp.post('/conta', usuariosController.autenticaJWT, contasContoller.insertConta);
routerApp.put('/conta', usuariosController.autenticaJWT, contasContoller.updateContaById);
routerApp.delete('/conta', usuariosController.autenticaJWT, contasContoller.deleteContaById);

module.exports = routerApp;