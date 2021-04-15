import AbstractViewElement from './view-element';
import {appData} from '../app-data';

const createSortTemplate = (title = '', checked) => {
  return `<div class="trip-sort__item  trip-sort__item--${title.toLowerCase()}">
            <input id="sort-${title.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title.toLowerCase()}" ${checked ? 'checked' : ''}>
            <label class="trip-sort__btn" for="sort-${title.toLowerCase()}">${title}</label>
          </div>`;
};

const createSortTemplates = () => {
  return appData.sortTypes.map((title, index) => { return createSortTemplate(title, !index); }).join('');
};

export default class Sort extends AbstractViewElement {
  constructor() {
    super();
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              ${createSortTemplates()}
            </form>`;
  }
}

