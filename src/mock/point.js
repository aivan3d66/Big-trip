import {appData} from '../app-data';
import {
  OFFERS,
  MIN_COUNT_DESCRIPTION,
  MAX_COUNT_DESCRIPTION,
  MIN_PRICE,
  MAX_PRICE
} from '../const';

export const getRandomInteger = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

const getRandomNumber = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(min + (Math.random() * (max - min)));
};

const generatePointType = () => {
  return appData.pointTypes[getRandomNumber(appData.pointTypes.length)];
};

const generateCity = () => {
  return appData.cityList[getRandomNumber(appData.cityList.length)];
};

const generateOffers = (pointType) => {
  const opts = [];
  const offers = appData.getOffersByTypeName(pointType);
  const offset = getRandomNumber(0, offers.length);
  const size = getRandomNumber(0, offers.length);
  for (let i = 0; i < size; i++) {
    opts.push(offers[(offset + i) % offers.length]);
  }
  return opts;
};

const generateDescription = () => {
  const templates = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'.split(/\.\s/gm);
  let result = '';
  const size = templates.length;
  for (let i = 0; i < getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION); i++) {
    const num = getRandomNumber(0, size);
    result += templates[num % templates.length] + '. ';
    templates.splice(num % templates.length);
  }
  return result;
};

const createPhotoTemplate = () => {
  const arrayPhoto = [];
  for (let i = 0; i < getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION); i++) {
    arrayPhoto.push({
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION),
    });
  }
  return arrayPhoto;
};

let pointId = 0;
const generatePointId = () => {
  return pointId++;
};

let lastDate = null;
const generateDate = (maxDiffInDays = 1) => {
  if (lastDate === null) {
    lastDate = new Date();
  }
  lastDate = new Date(lastDate.getTime() + (getRandomNumber(1800, maxDiffInDays * 24 * 3600 * 1000)));
  return lastDate.toISOString();
};

const generateFavorite = () => {
  return Math.random() > 0.5;
};

(() => {
  for (const tripPointType of appData.pointTypes) {
    const offers = [];
    for (let i = 0; i < getRandomNumber(2, 6); i++) {
      offers.push({
        title: getRandomInteger(OFFERS),
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      });
    }
    appData.setOffersByTypeName(tripPointType.type, offers);
  }
})();

(() => {
  const cities = [
    'Amsterdan',
    'Chamonis',
    'Geneva',
    'Cairo',
    'Dublin',
    'Minsk',
    'Geneva',
    'Moscow',
    'Dubai',
    'New-York',
    'Warshaw',
    'Kiev',
  ];
  for (const city of cities) {
    appData.addCity({
      name: city,
      description: generateDescription(),
      pictures: createPhotoTemplate(),
    });
  }
})();

export const generateTripPointData = () => {
  const type = generatePointType().type;
  return {
    id: generatePointId(),
    type,
    destination: generateCity(),
    offers: generateOffers(type),
    base_price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    date_from: generateDate(5),
    date_to: generateDate(2),
    isFavorite: generateFavorite(),
  };
};
