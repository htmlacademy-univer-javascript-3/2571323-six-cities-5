import { CommentLong, CommentShort } from '@/types/comment';
import { OfferLong, OfferShort } from '@/types/offer';

export const mockOffer: OfferLong = {
  id: '9ea856eb-17bb-49b6-9dbb-f6193af6c3c0',
  title: 'House in countryside',
  description:
    'Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.',
  type: 'house',
  price: 695,
  images: [
    'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
  ],
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
  goods: ['Washer', 'Coffee machine', 'Cable TV', 'Wi-Fi', 'Washing machine'],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl:
      'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
  },
  isPremium: false,
  isFavorite: false,
  rating: 1,
  bedrooms: 3,
  maxAdults: 2,
};

export const mockComments: CommentLong[] = [
  {
    id: 'd92bba39-e978-4ec7-8ffb-869b1fc4fa11',
    comment: 'Finally it works',
    date: '2025-01-04T01:28:45.801Z',
    rating: 5,
    user: {
      name: 'Oliver.conner',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      isPro: false,
    },
  },
  {
    id: '3961313d-21b8-4187-a785-8d01999ac0a1',
    comment: 'Test',
    date: '2025-01-04T02:13:19.585Z',
    rating: 4,
    user: {
      name: 'Oliver.conner',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      isPro: false,
    },
  },
  {
    id: 'c754d3fb-ead8-441b-a778-60229e01b9e1',
    comment: 'Amogus',
    date: '2025-01-04T02:13:24.881Z',
    rating: 4,
    user: {
      name: 'Oliver.conner',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      isPro: false,
    },
  },
  {
    id: 'a9050c76-3563-41c4-b880-f6b9274853f0',
    comment: 'Ooff',
    date: '2025-01-04T06:13:44.697Z',
    rating: 5,
    user: {
      name: 'Oliver.conner',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false,
    },
  },
  {
    id: '07a5986e-9c7e-41a1-878b-82efe6542380',
    comment:
      ' Long CommentLong CommentLong CommentLong CommentLong CommentLong CommentLong CommentLong CommentLong CommentLong Comment',
    date: '2025-01-04T07:55:56.636Z',
    rating: 4,
    user: {
      name: 'test',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
  },
  {
    id: 'e814df68-234d-4179-b647-8eff0bfcc5a9',
    comment:
      'Long Comment Long Comment Long Comment Long Comment Long Comment Long Comment Long Comment Long Comment',
    date: '2025-01-04T07:56:41.347Z',
    rating: 4,
    user: {
      name: 'test',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
  },
  {
    id: '99e0b13d-d88a-485a-b4dc-a8790a3ee22a',
    comment: 'I loved this place! (This is yet another test comment)',
    date: '2025-01-04T08:06:29.899Z',
    rating: 5,
    user: {
      name: 'test',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
  },
  {
    id: '15cc52bf-0224-4208-b5a9-3094ac06c1db',
    comment: 'Yay it worked!',
    date: '2025-01-04T08:07:07.377Z',
    rating: 1,
    user: {
      name: 'test',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
  },
  {
    id: '8f170196-b35f-468f-b08b-8633c6031258',
    comment: 'Baaaa',
    date: '2025-01-04T08:30:43.073Z',
    rating: 5,
    user: {
      name: 'test',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
  },
  {
    id: 'b3a5f62b-f7f4-4c04-a1a6-ebd08ffeb57b',
    comment: ':3',
    date: '2025-01-04T08:32:33.518Z',
    rating: 3,
    user: {
      name: 'test',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
  },
  {
    id: '1a0dd703-84d1-4048-90d1-570017c3cc45',
    comment: 'It? aaaa',
    date: '2025-01-04T08:44:56.900Z',
    rating: 4,
    user: {
      name: 'Oliver.conner',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/2.jpg',
      isPro: false,
    },
  },
];

export const mockNearbyOffers: OfferShort[] = [
  {
    id: '7631c43d-241e-420a-9980-4f45e609cdf3',
    title: 'The house among olive ',
    type: 'room',
    price: 206,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.3,
  },
  {
    id: '971db7fc-c4a5-40d5-958b-e50259fcb769',
    title: 'House in countryside',
    type: 'apartment',
    price: 207,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.9,
  },
  {
    id: '16290a2e-d9f2-44de-ba80-3417379eab72',
    title: 'The Joshua Tree House',
    type: 'apartment',
    price: 328,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.4,
  },
  {
    id: '0826f628-3999-45b9-a271-4535fee49ea0',
    title: 'House in countryside',
    type: 'room',
    price: 154,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/6.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.87561,
      longitude: 2.375499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.6,
  },
  {
    id: '21d86468-0bf0-40d8-9e63-51fac0b66d90',
    title: 'Tile House',
    type: 'room',
    price: 197,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.87961000000001,
      longitude: 2.353499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.1,
  },
  {
    id: '51551179-56d2-4a51-aca5-65a4bb97628e',
    title: 'Tile House',
    type: 'house',
    price: 794,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.364499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.9,
  },
  {
    id: 'bac59409-d9de-4df6-9b2d-19ca1d8d1857',
    title: 'Perfectly located Castro',
    type: 'house',
    price: 473,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.837610000000005,
      longitude: 2.3454990000000002,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.2,
  },
  {
    id: '1dbe96fe-04b1-496d-9c98-ab9dcaa985b7',
    title: 'The Joshua Tree House',
    type: 'hotel',
    price: 120,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.84761,
      longitude: 2.356499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3,
  },
  {
    id: '93e0fc8d-9661-4570-a3bd-a76fdc1c6b56',
    title: 'Canal View Prinsengracht',
    type: 'hotel',
    price: 396,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.862610000000004,
      longitude: 2.369499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
  },
  {
    id: '0f74f1eb-ad11-4e92-86fb-8979d22e384a',
    title: 'Canal View Prinsengracht',
    type: 'house',
    price: 215,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.83861,
      longitude: 2.350499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.7,
  },
  {
    id: '17604fa4-700c-477c-b3a8-e3d470afaa20',
    title: 'Wood and stone place',
    type: 'room',
    price: 244,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.861610000000006,
      longitude: 2.340499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.7,
  },
  {
    id: 'db22601b-7d94-454a-a1a7-618986988c52',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'apartment',
    price: 386,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.87861,
      longitude: 2.357499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.2,
  },
  {
    id: 'd3abd0af-bd41-42d8-831e-d2e3b71badd0',
    title: 'Loft Studio in the Central Area',
    type: 'room',
    price: 115,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.877610000000004,
      longitude: 2.333499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.7,
  },
  {
    id: '47fd46c2-176f-486d-875e-f2170b17e733',
    title: 'Waterfront with extraordinary view',
    type: 'house',
    price: 266,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.83961,
      longitude: 2.342499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
  },
  {
    id: '87156e7a-6bd4-462b-adf4-9e12dc4862cb',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'apartment',
    price: 234,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.865610000000004,
      longitude: 2.350499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.5,
  },
  {
    id: 'dd33c1c7-f405-4360-b18b-41d2e3c03569',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 957,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.846610000000005,
      longitude: 2.374499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.4,
  },
  {
    id: 'cd0e1e6d-6e8a-4fbf-a15f-bf8237c5b71b',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'house',
    price: 261,
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
      latitude: 48.837610000000005,
      longitude: 2.364499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.1,
  },
  {
    id: '73bdccf8-053a-45b5-8e02-085904bad062',
    title: 'Amazing and Extremely Central Flat',
    type: 'apartment',
    price: 259,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.843610000000005,
      longitude: 2.338499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.4,
  },
  {
    id: '6994f2e4-ab4a-486e-9b9d-9e79e8e8c826',
    title: 'The Joshua Tree House',
    type: 'apartment',
    price: 482,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.84461,
      longitude: 2.374499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3,
  },
];

export const mockCommentShort: CommentShort = {
  comment:
    'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4,
};

export const mockCommentLong: CommentLong = {
  id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
  date: '2019-05-08T14:13:56.569Z',
  user: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
  },
  comment:
    'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4,
};
