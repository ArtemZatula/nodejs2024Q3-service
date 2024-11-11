import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { TrackRepository } from 'src/track/track.repository';
import { ArtistRepository } from 'src/artist/artist.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private favoriteRepository: FavoriteRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
  ) {}

  async findAll() {
    const favs = await this.favoriteRepository.findAll();

    const f = {
      albums: await Promise.all(
        favs.albums.map((albumId) => this.albumRepository.findById(albumId)),
      ),
      artists: await Promise.all(
        favs.artists.map((artistId) =>
          this.artistRepository.findById(artistId),
        ),
      ),
      tracks: await Promise.all(
        favs.tracks.map((trackId) => this.trackRepository.findById(trackId)),
      ),
    };

    return f;
  }

  async addTrackToFavs(id: string) {
    const found = await this.trackRepository.findById(id);
    if (!found) {
      throw new UnprocessableEntityException();
    }
    this.favoriteRepository.addTrackToFavs(id);
  }

  async removeTrackFromFavs(id: string) {
    this.favoriteRepository.removeTrackFromFavs(id);
  }

  async addArtistToFavs(id: string) {
    const found = await this.artistRepository.findById(id);
    if (!found) {
      throw new UnprocessableEntityException();
    }
    this.favoriteRepository.addArtistToFavs(id);
  }

  async removeArtistFromFavs(id: string) {
    this.favoriteRepository.removeArtistFromFavs(id);
  }

  async addAlbumToFavs(id: string) {
    const found = await this.albumRepository.findById(id);
    if (!found) {
      throw new UnprocessableEntityException();
    }
    this.favoriteRepository.addAlbumToFavs(id);
  }

  async removeAlbumFromFavs(id: string) {
    this.favoriteRepository.removeAlbumFromFavs(id);
  }
}
