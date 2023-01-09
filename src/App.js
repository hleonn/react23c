import React from 'react';
import CrudApp from "./components/CrudApp";
import CrudApi from "./components/CrudApi";
import SelectsAnidados from "./components/SelectsAnidados";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <>
      <h1>Ejercicios con React</h1>
      <hr />
      <Modals /> 
      <hr />
      <ContactForm />
      <hr />
      <SelectsAnidados /> 
      <hr />
      {/* <SongSearch /> */}
      <CrudApi /> 
      <hr />
      <CrudApp />
      <hr />
    </>
  );
}

export default App;
