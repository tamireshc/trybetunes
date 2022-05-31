import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',

    };
  }

  componentDidMount() {
    this.getUserfunction();
  }

  componentWillUnmount() {
    this.setState();
  }

  getUserfunction = async () => {
    this.setState({ loading: true },
      async () => {
        const userget = await getUser();
        // console.log(userget);
        await this.setState({
          user: userget,
          loading: false,
        });
      });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        { loading && <Loading /> }
        { (
          <div className='profile-container'>
             <img
              src={ user.image }
              data-testid="profile-image"
              alt=""
            />
            <p className='edit-name'>{ user.name }</p>
           

            <p className='edit-email'>{ user.email }</p>
           
            <p className='edit-description'>{ user.description }</p>
            <Link to="/profile/edit"><button>Editar perfil</button> </Link>

          </div>
        ) }
      </div>

    );
  }
}

export default Profile;
