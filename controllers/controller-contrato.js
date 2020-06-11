import { query } from "../db/query";
import {
  httpStatus,
  successMessage,
  errorMessage,
} from "../helpers/http-status-helper";
import { request } from "https";

//Lista todos los contratos que se tiene en la base de datos
export const listarContratos = async (request, response) => {
  const { rows } = await query(`
        SELECT 
	        id, objeto, nombrecontratante, nombrecontratista,  valorcontrato 
        FROM contrato
    `);

  if (!rows) {
    errorMessage.error = "Error al obtener los contratos";
    return response.status(httpStatus.bad).send(errorMessage);
  }
  successMessage.data = rows;
  return response.status(httpStatus.ok).send(successMessage);
};

//Lista la información, de acuerdo al contrato seleccionado
export const informacionContrato = async (request, response) => {
  const { idContrato } = request.params;
  const consulta = await query(`SELECT * FROM contrato WHERE id=$1 `, [
    idContrato,
  ]);
  if (consulta) {
    response.send(consulta.rows);
  }
};

//permite que se cree un nuevo contrato a la base de datos
export const crearContrato = async (request, response) => {
  try {
    const {
      idContrato,
      objeto,
      nombreContratante,
      nombreContratista,
      tipopersona,
      valorcontrato,
      fechainicio,
      fechaactainicio,
      fechatermminacion,
      cdp,
      rp,
      poliza,
    } = request.body;

    const crearQuery = `
         INSERT INTO contrato (id, objeto, nombrecontratante, nombrecontratista, tipopersona, valorcontrato, fechainicio, fechaactainicio, fechaterminacion, cdp, rp, poliza, modificado) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         `;
    const values = [
      idContrato,
      objeto,
      nombreContratante,
      nombreContratista,
      tipopersona,
      valorcontrato,
      fechainicio,
      fechaactainicio,
      fechatermminacion,
      cdp,
      rp,
      poliza,
      false,
    ];
    const { rowCount } = await query(crearQuery, values);

    successMessage.data = rowCount;
    successMessage.message = "El contrato ha sido creado exitosamente";
    return response.status(httpStatus.ok).send(successMessage);
  } catch (err) {
    errorMessage.err = `Error creando el contrato: ${err}`;
    return response.status(httpStatus.bad).send(errorMessage);
  }
};

//Permite modificar el contrato
export const modificarContrato = async (request, response) => {
  try {
    const { modificado, idContrato } = request.body;

    const modificarQuery = `
         UPDATE contrato 
            SET modificado= $1
            WHERE id = $2      
            `;

    const values = [modificado, idContrato];
    const { rowCount } = await query(modificarQuery, values);
    successMessage.data = rowCount;
    successMessage.message = "El contrato ha sido modificado exitosamente";
    return response.status(httpStatus.ok).send(successMessage);
  } catch (err) {
    errorMessage.err = `Error modificando el contrato: ${err}`;
    return response.status(httpStatus.bad).send(errorMessage);
  }
};

export const buscarDocumentos = async (request, response) => {
  const { tipoPersona } = request.body;
  const { rows } = await query(`
        SELECT 
	        *
        FROM documentos WHERE tipopersona='${tipoPersona}'
    `);

  if (!rows) {
    errorMessage.error =
      "Error al obtener los documentos pertinentes al contrato";
    return response.status(httpStatus.bad).send(errorMessage);
  }
  successMessage.data = rows;
  return response.status(httpStatus.ok).send(successMessage);
};

//Permite verificar las credenciales de quien se va a loguear

export const obtenerUser = async (request, response) => {
  const { username, password } = request.body;
  const { rowCount } = await query(
    `SELECT * FROM users where username=$1 and password=$2`,
    [username, password]
  );
  if (rowCount==1) {
    successMessage.data = rowCount;
    successMessage.message = "¡Bienvenido!";
    return response.status(httpStatus.ok).send(successMessage);
  }else{
      errorMessage.error="Sus datos son incorrectos"
    return response.status(httpStatus.bad).send(errorMessage);

  }
};



//permite guardar documentos a la base de datos
export const guardarDocs = async (request, response) =>{
    if(request.files=== null){
        errorMessage.error="No existe ningún archivo"
    return response.status(httpStatus.bad).send(errorMessage);
    }
    
    const file= request.files.file;
    const directorio=`${__dirname}/documentos/${file.name}`
    const idContrato= 1;
    const idDocumento=1;
    
    file.mv(directorio, err =>{
        if(err){
            console.error(err);
            return response.status(500).send(err);
        }
        try{
        
        const crearQuery = `
        insert into contratocompleto ( idcontrato,iddocumento,adjunto)
        values ($1,$2, $3)
         `;
    const values = [
        
      idContrato,
      idDocumento,
      directorio
      ]

      const { rowCount } =  query(crearQuery, values);
      successMessage.data = rowCount;
      successMessage.message = "Los documentos han sido subidos exitosamente";
      return response.status(httpStatus.ok).send(successMessage);
    }catch(err){
        errorMessage.err = `Error creando el contrato: ${err}`;
    return response.status(httpStatus.bad).send(errorMessage);
    }  
    })
    
}
