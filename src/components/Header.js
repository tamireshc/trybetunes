import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hasUserGet: false,
      user: '',
    };
  }

  componentDidMount() {
    this.activeGetUser();
  }

  activeGetUser = async () => {
    const userGet = await getUser();
    this.setState({
      hasUserGet: true,
      user: userGet.name,
    });
  }

  render() {
    const { hasUserGet, user } = this.state;
    // console.log(this.activeGetUser());
    const tagUser = (
      <p data-testid="header-user-name">
        { user }
      </p>
    );

    return (
      <header data-testid="header-component">
        { hasUserGet ? tagUser : <p>Carregando...</p> }
        <nav>
          <ul>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Músicas Favoritas</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </ul>
        </nav>
      </header>

    );
  }
}

export default Header;
