import {getRandomNumber} from '../utils';

const MIN_COUNT = 100;
const MAX_COUNT = 10000;

export const createPriceTripTemplate = () => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomNumber(MIN_COUNT, MAX_COUNT)}</span>
          </p>`;
};
