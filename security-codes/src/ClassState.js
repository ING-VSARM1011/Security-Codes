import React from "react";
import { Loading } from './Loading.js'

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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
        if (SECURITY_CODE === this.state.value) {
          this.setState({ loading: false, error: false });
        } else {
          this.setState({ loading: false, error: true });
        }
      }, 3000);
    }
  }

  render() {
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {(error && !loading) && <p>Error: El código es incorrecto.</p>}
        {loading && <Loading />}
        <input
          placeholder="Código de seguridad"
          value={value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
