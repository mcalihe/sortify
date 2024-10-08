package com.mcalihe.sortify.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SpotifyPlaylistsResponse {

    public String href;
    public int limit;
    public String next;
    public int offset;
    public String previous;
    public int total;
    public List<SimplifiedPlaylistObject> items;

    // Getters and Setters

    // Inner classes for SimplifiedPlaylistObject and related fields
    @Getter
    @Setter
    public static class SimplifiedPlaylistObject {

        public boolean collaborative;
        public String description;
        public ExternalUrls external_urls;
        public String href;
        public String id;
        public List<ImageObject> images;
        public String name;
        public Owner owner;
        public Boolean isPublic;
        public String snapshot_id;
        public Tracks tracks;
        public String type;
        public String uri;

        // Getters and Setters

        // External URLs class
        @Setter
        @Getter
        public static class ExternalUrls {
            public String href;
        }

        // Image Object class
        @Setter
        @Getter
        public static class ImageObject {
            public String url;
            public int height;
            public int width;
        }

        // Owner class
        @Setter
        @Getter
        public static class Owner {
            public String id;
            public String href;
            public String display_name;
        }

        // Tracks class
        @Setter
        @Getter
        public static class Tracks {
            public String href;
            public int total;
        }
    }
}
