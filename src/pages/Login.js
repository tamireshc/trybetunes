import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';

const MIN_LENGTH_INPUT = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      logado: false,
    };
  }

  activeCreateUser = (name) => {
    console.log(name);

    this.setState(
      { loading: true },
      async () => {
        await createUser({
          name,
        });
        this.setState({
          logado: true,
          loading: false,

        });
        console.log('active');
      },
    );
  }

  disableButton = () => {
    const { name } = this.state;
    // console.log(name.length);
    if (name.length >= MIN_LENGTH_INPUT) {
      return false;
    }
    return true;
  }

  handleChange = ({ target }) => {
    this.disableButton();
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, loading, logado } = this.state;
    const form = (
      <div className='container'>
        <h1>Music On-Line</h1>
      <div data-testid="page-login">
        <input
          type="text"
          name="name"
          placeholder='Nome'
          data-testid="login-name-input"
          onChange={ this.handleChange }
          onKeyDown={ this.disableButton }
          value={ name }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ () => {
            this.activeCreateUser(name);
            // history.push('/search');
          } }
          disabled={ this.disableButton() }
        >
          Entrar
        </button>
      </div>
      </div>
    );

    return (
      <>
        { logado ? <Redirect to="/search" /> : '' }
        { loading ? <p>Carregando...</p> : form }
      </>

    );
  }
}

export default Login;
