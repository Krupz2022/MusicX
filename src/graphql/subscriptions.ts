/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAlbumCategory = /* GraphQL */ `
  subscription OnCreateAlbumCategory(
    $filter: ModelSubscriptionAlbumCategoryFilterInput
  ) {
    onCreateAlbumCategory(filter: $filter) {
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
export const onUpdateAlbumCategory = /* GraphQL */ `
  subscription OnUpdateAlbumCategory(
    $filter: ModelSubscriptionAlbumCategoryFilterInput
  ) {
    onUpdateAlbumCategory(filter: $filter) {
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
export const onDeleteAlbumCategory = /* GraphQL */ `
  subscription OnDeleteAlbumCategory(
    $filter: ModelSubscriptionAlbumCategoryFilterInput
  ) {
    onDeleteAlbumCategory(filter: $filter) {
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
export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onCreateAlbum(filter: $filter) {
      albumCategoryId
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        nextToken
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
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onUpdateAlbum(filter: $filter) {
      albumCategoryId
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        nextToken
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
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onDeleteAlbum(filter: $filter) {
      albumCategoryId
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        nextToken
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong($filter: ModelSubscriptionSongFilterInput) {
    onCreateSong(filter: $filter) {
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
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong($filter: ModelSubscriptionSongFilterInput) {
    onUpdateSong(filter: $filter) {
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
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong($filter: ModelSubscriptionSongFilterInput) {
    onDeleteSong(filter: $filter) {
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
