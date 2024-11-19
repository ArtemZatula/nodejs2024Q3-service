import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';
import { Track } from 'src/track/track.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async addTrackToFavs(trackId: string) {
    const favorite = await this.getFavorite();
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} not found`,
      );
    }
    favorite.tracks.push(track);
    await this.favoriteRepository.save(favorite);
    return track;
  }

  async removeTrackFromFavs(trackId: string) {
    const favorite = await this.getFavorite();
    favorite.tracks = favorite.tracks.filter((track) => track.id !== trackId);
    return this.favoriteRepository.save(favorite);
  }

  async addArtistToFavs(artistId: string) {
    const favorite = await this.getFavorite();
    const artist = await this.artistRepository.findOneBy({ id: artistId });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} not found`,
      );
    }
    favorite.artists.push(artist);
    await this.favoriteRepository.save(favorite);
    return artist;
  }

  async removeArtistFromFavs(artistId: string) {
    const favorite = await this.getFavorite();
    favorite.artists = favorite.artists.filter(
      (artist) => artist.id !== artistId,
    );
    return this.favoriteRepository.save(favorite);
  }

  async addAlbumToFavs(albumId: string) {
    const favorite = await this.getFavorite();
    const album = await this.albumRepository.findOneBy({ id: albumId });
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} not found`,
      );
    }
    favorite.albums.push(album);
    await this.favoriteRepository.save(favorite);
    return album;
  }

  async removeAlbumFromFavs(albumId: string) {
    const favorite = await this.getFavorite();
    favorite.albums = favorite.albums.filter((album) => album.id !== albumId);
    return this.favoriteRepository.save(favorite);
  }

  async findAll() {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favorite) {
      return { artists: [], albums: [], tracks: [] };
    }

    return {
      artists: favorite.artists,
      albums: favorite.albums,
      tracks: favorite.tracks,
    };
  }

  private async getFavorite(): Promise<Favorite> {
    let favorite = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: ['artists', 'albums', 'tracks'],
    });
    if (!favorite) {
      favorite = this.favoriteRepository.create();
      return this.favoriteRepository.save(favorite);
    }
    return favorite;
  }
}
