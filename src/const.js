export const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train', 'Order Uber'];
export const MIN_COUNT_DESCRIPTION = 1;
export const MAX_COUNT_DESCRIPTION = 5;
export const MIN_PRICE = 100;
export const MAX_PRICE = 1000;
export const POINT_ROUTE_COUNT = 15;
export const COLOURS = {
  BLACK: '#ffffff',
  WHITE: '#000000',
};

export const ViewValues = {
  selectors: {
    MENU: '.trip-controls__navigation',
    INFO: '.trip-main',
    FILTERS: '.trip-controls__filters',
    TRIP: '.trip-events',
    BODY_CONTAINER: '.page-main > .page-body__container',
  },
  filters: {
    EVERYTHING: 'Everything',
    FUTURE: 'Future',
    PAST: 'Past',
  },
  sortTypes: {
    DAY: 'day',
    EVENT: 'event',
    TIME: 'time',
    PRICE: 'price',
    OFFERS: 'offers',
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
  updateType: {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
  },
  uiViewType: {
    STATS: 'STATS',
    TABLE: 'TABLE',
  },
};
