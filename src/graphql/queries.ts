/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAlbumCategory = /* GraphQL */ `
  query GetAlbumCategory($id: ID!) {
    getAlbumCategory(id: $id) {
      id
      title
      albums {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAlbumCategories = /* GraphQL */ `
  query ListAlbumCategories(
    $filter: ModelAlbumCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlbumCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        albums {
          nextToken
          items{
            id
            imageUri
            name
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAlbum = /* GraphQL */ `
  query GetAlbum($id: ID!) {
    getAlbum(id: $id) {
      albumCategoryId
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        nextToken
        items{
          albumId
         artist
         id
         imageUri
         title
        uri
        }
        
      }
      albumCategory {
        id
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      albumAlbumCategoryId
    }
  }
`;
export const listAlbums = /* GraphQL */ `
  query ListAlbums(
    $filter: ModelAlbumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        albumCategoryId
        id
        name
        by
        numberOfLikes
        imageUri
        artistsHeadline
        createdAt
        updatedAt
        albumAlbumCategoryId
      }
      nextToken
    }
  }
`;
export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      albumId
      id
      imageUri
      uri
      title
      artist
      album {
        albumCategoryId
        id
        name
        by
        numberOfLikes
        imageUri
        artistsHeadline
        createdAt
        updatedAt
        albumAlbumCategoryId
      }
      createdAt
      updatedAt
      songAlbumId
    }
  }
`;
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        albumId
        id
        imageUri
        uri
        title
        artist
        createdAt
        updatedAt
        songAlbumId
      }
      nextToken
    }
  }
`;
export const albumsByAlbumCategoryId = /* GraphQL */ `
  query AlbumsByAlbumCategoryId(
    $albumCategoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAlbumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    albumsByAlbumCategoryId(
      albumCategoryId: $albumCategoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        albumCategoryId
        id
        name
        by
        numberOfLikes
        imageUri
        artistsHeadline
        createdAt
        updatedAt
        albumAlbumCategoryId
      }
      nextToken
    }
  }
`;
export const songsByAlbumId = /* GraphQL */ `
  query SongsByAlbumId(
    $albumId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    songsByAlbumId(
      albumId: $albumId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        albumId
        id
        imageUri
        uri
        title
        artist
        createdAt
        updatedAt
        songAlbumId
      }
      nextToken
    }
  }
`;
