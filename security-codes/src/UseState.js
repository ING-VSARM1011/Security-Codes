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

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
      confirmed: false,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        state.value !== SECURITY_CODE ? onError() : onConfirm();
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
            onWrite(e.target.value);
          }}
        />
        <button onClick={() => onCheck()}> Comprobar </button>
      </div>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿estas seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
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
            onReset()
          }}
        >
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
