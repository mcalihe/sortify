import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { PlaylistService } from '../../../shared/service/playlist.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'sortify-playlist-sorting',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './playlist-sorting.component.html',
    styleUrl: './playlist-sorting.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistSortingComponent implements OnInit {
    private readonly playlistService = inject(PlaylistService);

    protected readonly playlists$ = this.playlistService.getPlaylists();

    ngOnInit(): void {}
}
