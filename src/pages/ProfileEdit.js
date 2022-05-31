import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      hasUserSalve: false,
    };
  }

  componentDidMount() {
    this.getUserFunction();
  }

  getUserFunction = () => {
    this.setState(
      { loading: true },
      async () => {
        const userGet = await getUser();
        this.setState({
          name: userGet.name,
          email: userGet.email,
          description: userGet.description,
          photo: userGet.image,
          loading: false,
        });
        console.log('userget');
      },
    );
  }

  handleChange = ({ target }) => {
    this.validateButton();
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  validateButton = () => {
    const { name, email, description, photo } = this.state;
    const regex = /[\w.-]+@[\w-]+\.[\w.-]+/gi;

    // ajustar validação

    if (name && description && photo && regex.test(email)) {
      updateUser({
        name,
        email,
        image: photo,
        description,
      });
      console.log('validado');
      return false;
    }
    console.log(' nao validado');
    return true;
  };

  sendInfosProfile = () => {
    if (this.validateButton() === false) {
      this.setState({
        hasUserSalve: true,
      });
    }
    console.log('clicou');
  }

  render() {
    const { loading, name, email, description, photo, hasUserSalve } = this.state;
    return (
      <div
        data-testid="page-profile-edit"
      >
        <Header />
        { loading && <p>Carregando...</p> }
        { hasUserSalve ? <Redirect to="/profile" /> : '' }
        <div>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="edit-input-name"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <br />

          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              data-testid="edit-input-email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descrissão
            <input
              type="description"
              data-testid="edit-input-description"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="photo">
            Foto
            <input
              type="photo"
              data-testid="edit-input-image"
              name="photo"
              id="photo"
              value={ photo }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ this.validateButton() }
            onClick={ this.sendInfosProfile }
          >
            Salvar
          </button>

        </div>

      </div>

    );
  }
}

export default ProfileEdit;
