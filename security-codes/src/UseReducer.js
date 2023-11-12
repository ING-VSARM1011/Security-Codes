import React, { useReducer, useEffect} from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {

  const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  };

  const reducerObject = (state, payload) => ({
    ERROR: {
      ...state,
      error: true,
      loading: false,
      confirmed: false,
    },
    CONFIRM: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    WRITE: {
      ...state,
      value: payload,
    },
    CHECK: {
      ...state,
      loading: true,
    },
    DELETE: {
      ...state,
      deleted: true,
    },
    RESET: {
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    },
  });

  const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
      return reducerObject(state, action.payload)[action.type];
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        state.value !== SECURITY_CODE
          ? dispatch({ type: "ERROR" })
          : dispatch({ type: "CONFIRM" });
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
            dispatch({ type: "WRITE", payload: e.target.value });
          }}
        />
        <button onClick={() => dispatch({ type: "CHECK" })}> Comprobar </button>
      </div>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿estas seguro?</p>
        <button
          onClick={() => {
            dispatch({ type: "DELETE" });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
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
            dispatch({ type: "RESET" });
          }}
        >
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseReducer };
