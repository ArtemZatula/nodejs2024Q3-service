import { CreateAlbumDto } from "../dto/create-album.dto";
import { UpdateAlbumDto } from "../dto/update-album.dto";
import { Album } from "./album.interface";

export interface IAlbumRepository {
  findAll(): Promise<Album[]>;
  findById(id: string): Promise<Album | undefined>;
  create(createAlbumDto: CreateAlbumDto): Promise<Album>;
  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album>;
  remove(id: string): Promise<boolean>;
} 
