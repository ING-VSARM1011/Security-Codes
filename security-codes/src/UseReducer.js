import React, { useReducer, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  };

  const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    write: "WRITE",
    check: "CHECK",
    delete: "DELETE",
    reset: "RESET",
  };

  const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
      ...state,
      error: true,
      loading: false,
      confirmed: false,
    },
    [actionTypes.confirm]: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.write]: {
      ...state,
      value: payload,
    },
    [actionTypes.check]: {
      ...state,
      loading: true,
    },
    [actionTypes.delete]: {
      ...state,
      deleted: true,
    },
    [actionTypes.reset]: {
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
        state.value !== SECURITY_CODE ? onError() : onConfirm();
      }, 3000);
    }
  }, [state.loading]);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onWrite = ({ target: { value } }) => {
    dispatch({
      type: actionTypes.write,
      payload: value,
    });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  };

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
          onChange={onWrite}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿estas seguro?</p>
        <button
          onClick={onDelete}
        >
          Sí, eliminar
        </button>
        <button
          onClick={onReset}
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
          onClick={onReset}
        >
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseReducer };
