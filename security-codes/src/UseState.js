import React, { useState, useEffect} from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        value !== SECURITY_CODE ? setError(true) : setError(false);
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {error && <p>Error: El código es incorrecto.</p>}
      {loading && <p>Cargando...</p>}
      <input 
        placeholder="Código de seguridad" 
        value={value}
        onChange={(e) => {setValue(e.target.value)}}
      />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
