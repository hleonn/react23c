//Hook personalizado se caracterizan por devolver logica, se utiliza en SelecList  rafc
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);//guardar data de la APi que estamos consultando
  const [error, setError] = useState(null);//guardar el error en caso de que la peticion fetch traiga un error
  const [loading, setLoading] = useState(false);//almacenar el estado sobre si se ha cargado o no la peticion

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, { signal });

        if (!res.ok) {
          let err = new Error("Error en la petición Fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrió un error";
          throw err;//arroja el error a la parte del catch
        }

        const json = await res.json();

        if (!signal.aborted) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, error, loading };
};