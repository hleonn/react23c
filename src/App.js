import React from 'react';
import CrudApp from "./components/CrudApp";
import CrudApi from "./components/CrudApi";

function App() {
  return (
    <>
      <h1>Ejercicios con React</h1>
      <hr />
      {/* <Modals /> */}
      <hr />
      {/* <ContactForm /> */}
      <hr />
      {/* <SelectsAnidados /> */}
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