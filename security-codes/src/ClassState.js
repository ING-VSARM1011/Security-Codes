import React from "react";
import { Loading } from './Loading.js'

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
    };
  }

  // Se ejecuta antes de renderizar el componente.
  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  // Se ejecuta cada vez que actualicemos el estado, equivalente al useEffect.
  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {this.state.error && <p>Error: El código es incorrecto.</p>}
        {this.state.loading && <Loading />}
        <input placeholder="Código de seguridad" />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
