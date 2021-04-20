export const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train', 'Order Uber'];
export const MIN_COUNT_DESCRIPTION = 1;
export const MAX_COUNT_DESCRIPTION = 5;
export const MIN_PRICE = 100;
export const MAX_PRICE = 1000;
export const POINT_ROUTE_COUNT = 15;

export const ViewValues = {
  selectors: {
    MENU: '.trip-controls__navigation',
    INFO: '.trip-main',
    FILTERS: '.trip-controls__filters',
    TRIP: '.trip-events',
  },
  filters: [
    'Everything',
    'Future',
    'Past',
  ],
  sortTypes: {
    day: 'day',
    event: 'event',
    time: 'time',
    price: 'price',
    offers: 'offers',
  },
  pointTypes: [
    {
      name: 'Taxi',
      isInMotion: true,
    },
    {
      name: 'Train',
      isInMotion: true,
    },
    {
      name: 'Ship',
      isInMotion: true,
    },
    {
      name: 'Transport',
      isInMotion: true,
    },
    {
      name: 'Drive',
      isInMotion: true,
    },
    {
      name: 'Flight',
      isInMotion: true,
    },
    {
      name: 'Check-in',
      isInMotion: false,
    },
    {
      name: 'Sightseeing',
      isInMotion: false,
    },
    {
      name: 'Restaurant',
      isInMotion: false,
    },
  ],
};
