import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      firstItemMusicsState: '',
      loading: false,
      favoriteSongs: [],
      hasCheckTrue: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    // console.log(id);
    this.getMusicFunction(id);
    this.getFavoriteSonsFunction();
  }

  getFavoriteSonsFunction = () => {
    this.setState(
      { loading: true },
      async () => {
        const fav = await getFavoriteSongs();
        // console.log(fav);
        this.setState({
          favoriteSongs: fav,
          loading: false,
        });
      },
    );
  }

  getMusicFunction = async (id) => {
    const musicsFound = await getMusics(id);
    // const test = musicsFound.filter((item) => !item.amgArtistId)
    // console.log(test)
    // musicsFound.shift();
    const converter = [...musicsFound];
    const infos = converter.shift();
    this.setState({
      musics: [...musicsFound],
      firstItemMusicsState: infos,
    });
  }

  favMusic = (song) => {
    const { favoriteSongs } = this.state;
    this.setState(
      { loading: true },
      async () => {
        if (favoriteSongs.some(((item) => item.trackName === song.trackName))) {
          await removeSong(song);
          console.log(song);
          const filtr = favoriteSongs.filter((item) => item.trackName !== song.trackName);
          this.setState({
            loading: false,
            favoriteSongs: filtr,
          });
          console.log('remove');
        } else {
          await addSong(song);
          console.log(song);
          this.setState({
            loading: false,
            favoriteSongs: [...favoriteSongs, song],
          });
          console.log('add');
        }
      },

    );
    return true;
  }

  render() {
    const { musics, firstItemMusicsState,
      loading, favoriteSongs, hasCheckTrue } = this.state;
    const musicas = [...musics];
    musicas.shift();

    // https://pt.stackoverflow.com/questions/413553/comparar-dois-arrays-de-objetos-e-remover-a-diferen%C3%A7a-no-javascript
    // usado para retirar musicas favoritadas de outros  artistas diferentes ao exibir a as favoritas
    // dentro do album

    const musicsNofav = musicas.filter((item) => (
      favoriteSongs.filter((song) => song.trackId === item.trackId)).length);

    return (
      <div
        data-testid="page-album"
      >
        <Header />
        <div>
          { musics
            && (
              <div>
                <p data-testid="artist-name">{ firstItemMusicsState.artistName }</p>
                <p data-testid="album-name">{ firstItemMusicsState.collectionName }</p>

              </div>

            ) }
          { loading && <p>Carregando...</p> }

          { musicsNofav.map((item) => (<MusicCard
            key={ item.trackId }
            trackName={ item.trackName }
            previewUrl={ item.previewUrl }
            trackId={ item.trackId }
            favMusic={ () => this.favMusic(item) }
            check={ hasCheckTrue }
          // onChange={ () => this.changeCheckers(item) }
          />)) }

          {/* musicas.filter((item) => {
            for (const i of favoriteSongs) {
              if (i.trackId === item.trackId) {
                return false;
              }
            }
            return true;
          }) */}

          {/* const r = array.filter((elem) => !anotherArray.find(({ id }) => elem.id === id) && elem.sub); */ }

          {/* https://stackoverflow.com/questions/53603040/filter-array-of-objects-by-another-array-of-objects
Referencia de filtro para irar itens iquais entre arrays de objetos utilizada */}

          { musicas.filter((i) => !favoriteSongs.find(({ trackId }) => (
            i.trackId === trackId
          ))).map((item) => (
            <MusicCard
              key={ item.trackId }
              trackName={ item.trackName }
              previewUrl={ item.previewUrl }
              trackId={ item.trackId }
              favMusic={ () => this.favMusic(item) }
            />)) }

        </div>

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

};

export default Album;
