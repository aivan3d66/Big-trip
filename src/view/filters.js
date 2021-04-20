import AbstractViewElement from './abstract-view-element';
import {appData} from '../app-data';

const createFilter = (title, checked) => {
  const idMix = title.toLowerCase();
  return `<div class="trip-filters__filter">
            <input id="filter-${idMix}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${idMix}" ${checked ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${idMix}">${title}</label>
          </div>`;
};

const createFilters = () => {
  return appData.filters.map((filter, item) => createFilter(filter, !item)).join('');
};

export default class Filters extends AbstractViewElement {
  constructor() {
    super();
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
              ${createFilters()}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
  }
}
