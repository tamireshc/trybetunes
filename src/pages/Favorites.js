import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
      hasCheckTrue:true,

    };
  }

  componentDidMount() {
    this.getFavoriteSongsFunction();
  }

  getFavoriteSongsFunction = async () => {
    this.setState({ loading: true },
      async () => {
        const favorites = await getFavoriteSongs();
        console.log(favorites);
        await this.setState({
          favoriteSongs: favorites,
          loading: false,
        });
      });
  }

  removeSongsFunction = (song) => {
    const { favoriteSongs } = this.state;
    console.log(song);
    this.setState({ loading: true },
      async () => {
        await removeSong(song);
        const attFavSongs = favoriteSongs.filter((item) => item.trackId !== song.trackId);
        await this.setState({
          favoriteSongs: attFavSongs,
          loading: false,
        });
      });
  }

  render() {
    const { favoriteSongs, loading, hasCheckTrue } = this.state;
    // const favorite = [ ...favoriteSongs ];

    return (
      <div
        data-testid="page-favorites"
      >
        <Header />
        { loading && <Loading /> }
        <section className='favorites-container'>
        { favoriteSongs.map((item) => (<MusicCard
          key={ item.trackId }
          imageAlbum ={item.artworkUrl100}
          trackName={ item.trackName }
          previewUrl={ item.previewUrl }
          trackId={ item.trackId }
          favMusic={ () => this.removeSongsFunction(item) }
          check={ hasCheckTrue }
        />)) }
        </section>
      </div>

    );
  }
}

export default Favorites;
