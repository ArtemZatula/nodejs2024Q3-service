import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteRepository {
  private favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll() {
    return this.favs;
  }

  async addTrackToFavs(id: string) {
    this.favs.tracks.push(id);
  }

  async removeTrackFromFavs(id: string) {
    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);
  }

  async addArtistToFavs(id: string) {
    this.favs.artists.push(id);
  }

  async removeArtistFromFavs(id: string) {
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);
  }

  async addAlbumToFavs(id: string) {
    this.favs.albums.push(id);
  }

  async removeAlbumFromFavs(id: string) {
    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);
  }
}
