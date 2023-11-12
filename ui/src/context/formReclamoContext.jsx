import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function ReclamoFormProvider({ children }) {
  const initialState = {
    tipoReclamo: { id: null, value: null },
    descripcionReclamo: null,
    urgenciaReclamo: { id: null, value: null },
    imagenReclamo: null,
    imagenReclamoToShow: null,
    ubicacionBarrio: { id: null, value: null },
    ubicacionCalleReclamo: { id: null, value: null },
    ubicacionAlturaCalleReclamo: null,
    ubicacionInterseccion: { id: null, value: null },
    ubicacionEntreCalle1: { id: null, value: null },
    ubicacionEntreCalle2: { id: null, value: null },
    ubicacionGPSReclamo: { latitude: null, longitude: null },
  };

  const [formFields, setFormFields] = useState(initialState);

  const updateFormFields = (fieldName, value) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      [fieldName]: value,
    }));
  };

  const resetFormFields = () => {
    setFormFields(initialState);
  };

  return (
    <FormContext.Provider
      value={{ formFields, updateFormFields, resetFormFields }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useReclamoForm() {
  return useContext(FormContext);
}
