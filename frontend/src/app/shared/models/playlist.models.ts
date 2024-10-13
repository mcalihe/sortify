export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    isPublic: boolean | null;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

interface ExternalUrls {
    href: string | null;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Owner {
    id: string;
    href: string;
    display_name: string;
}

interface Tracks {
    href: string;
    total: number;
}
