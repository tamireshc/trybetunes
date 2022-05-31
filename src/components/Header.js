import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
        <div className='header-top'>
          <Link to="/"><h2>Music On-line</h2></Link>
          
          <div className='header-name'>
          { <p>{hasUserGet}</p> ? tagUser : <Loading /> }
          </div> 
        </div>
        
        <nav>
          <ul>
            <div className='link-to-search'>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            </div>
            <div className='link-to-favorites'>
            <Link data-testid="link-to-favorites" to="/favorites">Músicas Favoritas</Link>
            </div>
            <div className='link-to-profile'>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </div>
            
            
            
          </ul>
        </nav>
      </header>

    );
  }
}

export default Header;
