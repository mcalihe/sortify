import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../models/playlist.models';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
    private readonly httpClient = inject(HttpClient);

    public getPlaylists() {
        return this.httpClient.get<Playlist[]>('/api/playlist');
    }
}
