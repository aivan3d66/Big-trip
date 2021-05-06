export const HOURS_COUNT = 24;
export const MINUTES_COUNT = 60;
export const MAX_STATUS_RANGE = 299;
export const MIN_STATUS_RANGE = 200;
export const MIN_BAR_LENGTH = 50;
export const BAR_THICKNESS = 44;
export const FONT_SIZE = 13;
export const TITLE_FONT_SIZE = 23;
export const PADDING_SIZE = 5;
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
  loadStates: {
    LOADING: 'LOADING',
    LOAD_DONE: 'LOAD_DONE',
    ERROR: 'ERROR',
  },
  pointTypes: [
    {
      name: 'Taxi',
      isInMotion: true,
    },
    {
      name: 'Bus',
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
    INIT: 'INIT',
    INIT_ERROR: 'INIT_ERROR',
    ERROR: 'ERROR',
  },
  uiViewType: {
    STATS: 'STATS',
    TABLE: 'TABLE',
  },
  uiNumbers: {
    MAX_CITY_COUNT_IN_HEADER: 3,
  },
};
