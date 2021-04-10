import {getRandomNumber, generateForData, generateDescription, createPhotoTemplate} from '../utils';
import {POINT_TYPE, CITIES, DESCRIPTION, OFFERS} from '../const';

export const generatePoint = () => {
  return {
    pointTypes: generateForData(POINT_TYPE),
    cities: generateForData(CITIES),
    description: generateDescription(DESCRIPTION),
    offers: generateForData(OFFERS),
    photos: createPhotoTemplate(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
  };
};
