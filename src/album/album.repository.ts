import { Injectable } from "@nestjs/common";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AlbumEntity } from "./entities/album.entity"
import { IAlbumRepository } from "./types/album-repository.interface";
import { Album } from "./types/album.interface";

@Injectable()
export class AlbumRepository implements IAlbumRepository {
  private albums: Map<string, AlbumEntity> = new Map();

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = new AlbumEntity(createAlbumDto);
    this.albums.set(album.id, album);
    return album;
  }

  async findAll(): Promise<Album[]> {
    return [...this.albums.values()];
  }

  async findById(id: string): Promise<Album | undefined> {
    return this.albums.get(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const found = this.albums.get(id);
    if (!found) return;
    Object.assign(found, updateAlbumDto);
    return found;
  }

  async removeAlbumArtist(artistId: string): Promise<void> {
    for (const [_, album] of this.albums) {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    }
  }

  async remove(id: string): Promise<boolean> {
    return this.albums.delete(id);
  }
}
