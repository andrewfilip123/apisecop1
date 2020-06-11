import express from 'express';
import { listarContratos, informacionContrato, crearContrato, modificarContrato, buscarDocumentos, obtenerUser, guardarDocs } from '../controllers/controller-contrato';


const routerContrato = express.Router();
routerContrato.post('/contrato/obtenerusuario', obtenerUser);
routerContrato.get('/contrato/listar', listarContratos);
routerContrato.get('/contrato/listar/:idContrato', informacionContrato);
routerContrato.post('/contrato/modificar', modificarContrato);
routerContrato.post('/contrato/crear', crearContrato);
routerContrato.post('/contrato/buscarDoc', buscarDocumentos);

routerContrato.post('/contrato/guardarDocumentos', guardarDocs)

export default routerContrato;