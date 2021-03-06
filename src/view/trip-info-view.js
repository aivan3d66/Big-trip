import AbstractViewElement from './abstract-view-element.js';
import TripPointType from '../app-structures/trip-point-type.js';
import {TimeUtils} from '../utils/time.js';
import {AppConstants} from '../const.js';

const createDateLimits = (from, to) => {
  let inner = '';
  if (from && to) {
    const dateLimits = TimeUtils.getDuration(from, to);
    inner = `${dateLimits[0]}&nbsp;&mdash;&nbsp;${dateLimits[1]}`;
  } else if (from) {
    inner = TimeUtils.convertToMMMDD(from);
  }
  return `<p class="trip-info__dates">${inner}</p>`;
};

const createMainInfo = (tripPointsArray = []) => {
  let cities = tripPointsArray.reduce((acc, tripPoint) => {
    if (acc.length === 0 || acc[acc.length - 1] !== tripPoint.destination.name) {
      acc.push(tripPoint.destination.name);
    }
    return acc;
  }, []);
  if (cities.length > AppConstants.limit.MAX_CITY_COUNT_IN_HEADER) {
    cities = [cities[0], '...', cities[cities.length - 1]];
  }
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${cities.join(' &mdash; ')}</h1>
            ${tripPointsArray.length ? createDateLimits(tripPointsArray[0].dateFrom, tripPointsArray[tripPointsArray.length - 1].dateTo) : ''}
          </div>`;
};

const createTotalCost = (value) => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${value}</span>
          </p>`;
};

export default class TripInfoView extends AbstractViewElement {
  constructor(tripPointsArray = []) {
    super();
    this._tripPointsArray = tripPointsArray;
  }

  getTemplate() {
    const totalCost = this._tripPointsArray.reduce((acc, tp) => (acc + TripPointType.getPointCost(tp)), 0);
    return `<section class="trip-main__trip-info  trip-info">
            ${createMainInfo(this._tripPointsArray)}
            ${createTotalCost(totalCost)}
          </section>`;
  }
}
