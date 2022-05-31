import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LENGTH_INPUT = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameSinger: '',
      nameSingerForScreen: '',
      loading: false,
      foundAlbum: false,
      albuns: [],
      noneAlbum: false,
    };
  }

  searchAmbum = (name) => {
    console.log('search');
    this.setState(
      { loading: true, foundAlbum: false },
      async () => {
        const result = await searchAlbumsAPI(name);
        console.log(result);

        this.setState({
          albuns: [result],
          foundAlbum: true,
          loading: false,
          nameSingerForScreen: name,
          nameSinger: '',
        });

        if (result.length === 0) {
          this.setState({
            noneAlbum: true,
          });
        }
      },
    );
  }

  disableButton = () => {
    const { nameSinger } = this.state;
    // console.log(name.length);
    if (nameSinger.length >= MIN_LENGTH_INPUT) {
      return false;
    }
    return true;
  };

  handleChange = ({ target }) => {
    this.disableButton();
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  // componentDidUpdate() {
  // }

  render() {
    const { nameSinger,
      foundAlbum, loading, albuns, noneAlbum, nameSingerForScreen } = this.state;
    const form = (
      <div className='form-search'>
        <input
          type="text"
          name="nameSinger"
          data-testid="search-artist-input"
          placeholder='Nome do Artista'
          onChange={ this.handleChange }
          value={ nameSinger }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ this.disableButton() }
          onClick={ () => this.searchAmbum(nameSinger) }
        >
          Pesquisar
        </button>
      </div>

    );
    // console.log(albuns);
    return (

      <div
        data-testid="page-search"
      >
        <Header />
        {/* <p>Resultado de álbuns de: { nameSinger }</p>  */ }

        { loading ? <p>Carregando...</p> : form }
        { foundAlbum ? (
          <p className='title-result'>
            Resultado de álbuns de:
            {' '}
            { nameSingerForScreen }
          </p>
        ) : ''}
        <div className='album-results'>
        { foundAlbum && albuns[0] !== ''
          ? albuns[0].map((item) => (
            <div key={ item.collectionId } className="card-album">
              <img src={ item.artworkUrl100 } alt="" />
              <strong><p className='artist-name'>{ item.artistName }</p></strong> 
              <p className='collection-name'>{ item.collectionName }</p>
              <h3><Link
                to={ `/album/${item.collectionId}` }
                data-testid={ `link-to-album-${item.collectionId}` }
              >
                Ver Album
              </Link>  </h3> 
            </div>
          )) : '' }
          </div>
        { noneAlbum ? <p>Nenhum álbum foi encontrado</p> : '' }

      </div>

    );
  }
}

export default Search;
