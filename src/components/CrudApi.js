import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp"; 
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const [db, setDb] = useState(null);//inicia vacia
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp(); 
  let url = "http://localhost:5000/santos";

  useEffect(() => {//para cargar la data
    setLoading(true);
     helpHttp() 
       .get(url) 
       .then((res) => {
        //console.log(res);
        if (!res.err) {//si la respuesta no trae una propiedad llamada error
          setDb(res);//actualiza la respuesta, con la variable que nos trae la petición
          setError(null);//actualiza el error a nulo
        } else {
          setDb(null);
          setError(res);
        }
        setLoading(false);
      }); 
  }, [url]);

  const createData = (data) => {//recibe los datos del formulario
    data.id = Date.now();//se agrega el id
    //console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },//para que se agreguen todos los datos, tal cual fueron construidos
    };

     api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb([...db, res]);//actualiza la db + la respuesta que devuelve la API
      } else {
        setError(res);
      }
    }); 
  };

  const updateData = (data) => {//tenemos que saber el id del elemn que se va a actualizar
    let endpoint = `${url}/${data.id}`;
    //console.log(endpoint); es la url para actualizar

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

     api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    }); 
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      }); 
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}     {/* loading true, carga Loader */}{/*existe error carga mensaje  */}
        {error && (     
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          /> 
        )}     {/* existen datos en db, renderiza la CrudTable */}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;