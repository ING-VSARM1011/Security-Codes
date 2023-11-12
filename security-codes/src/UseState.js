import React, { useState, useEffect} from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        state.value !== SECURITY_CODE
          ? setState({ ...state, error: true, loading: false, confirmed: false })
          : setState({ ...state, error: false, loading: false, confirmed: true });
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {state.error && !state.loading && (
          <p>Error: El código es incorrecto.</p>
        )}
        {state.loading && <p>Cargando...</p>}
        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(e) => {
            setState({ ...state, value: e.target.value });
          }}
        />
        <button onClick={() => setState({ ...state, loading: true })}>
          {" "}
          Comprobar{" "}
        </button>
      </div>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿estas seguro?</p>
        <button
          onClick={() => {
            setState({ ...state, deleted: true });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            setState({ ...state, confirmed: false, value:'' });
          }}
        >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button
          onClick={() => {
            setState({ ...state, confirmed: false, deleted: false, value: '' });
          }}
        >
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
