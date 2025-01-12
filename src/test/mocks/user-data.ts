import { OfferShort } from '@/types/offer';
import { AuthInfo, UserLong } from '@/types/user';

export const mockCredentials: AuthInfo = {
  email: 'jhon.bob@mail.co.uk',
  password: '123a',
};

export const mockUserData: UserLong = {
  email: 'jhon.bob@mail.co.uk',
  token: 'amhvbi5ib2JAbWFpbC5jby51aw==',
  name: 'Jhon.Bob',
  avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/6.jpg',
  isPro: false,
};

export const mockFavoriteOffers: OfferShort[] = [
  {
    id: '9ea856eb-17bb-49b6-9dbb-f6193af6c3c0',
    title: 'House in countryside',
    type: 'house',
    price: 695,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 1,
  },
  {
    id: '9652c32e-cd3d-429f-8427-bbab59a35ecb',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 360,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.210402,
      longitude: 6.798314,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.5,
  },
  {
    id: '59be3757-7ddc-450d-9c00-b3f316e2dd20',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'hotel',
    price: 458,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.385540000000006,
      longitude: 4.902976,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2.7,
  },
];

export const mockFavoriteOffer: OfferShort = {
  id: '9ea856eb-17bb-49b6-9dbb-f6193af6c3c0',
  title: 'House in countryside',
  type: 'house',
  price: 695,
  previewImage: 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  isFavorite: true,
  isPremium: false,
  rating: 1,
};

export const mockNonFavoriteOffer: OfferShort = {
  id: '9ea856eb-17bb-49b6-9dbb-f6193af6c3c0',
  title: 'House in countryside',
  type: 'house',
  price: 695,
  previewImage: 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  isFavorite: false,
  isPremium: false,
  rating: 1,
};
