import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, favMusic, check } = this.props;
    return (
      <div className='music-card-infos'>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="fav"
            onClick={ favMusic }
            defaultChecked={ check }
          // onChange={ onChange }
          />
        </label>

      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favMusic: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};

export default MusicCard;

// if(musics.some((item => item.trackId ===song.trackId)){

// }
