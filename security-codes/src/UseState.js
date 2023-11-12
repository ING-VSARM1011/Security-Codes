import React, { useState, useEffect} from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
  });

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        state.value !== SECURITY_CODE
          ? setState({ ...state, error: true, loading: false })
          : setState({ ...state, error: false, loading: false });
      }, 3000);
    }
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {(state.error && !state.loading) && <p>Error: El código es incorrecto.</p>}
      {state.loading && <p>Cargando...</p>}
      <input
        placeholder="Código de seguridad"
        value={state.value}
        onChange={(e) => {
          setState({ ...state, value: e.target.value });
        }}
      />
      <button onClick={() => setState({ ...state, loading: true })}> Comprobar </button>
    </div>
  );
}

export { UseState };
