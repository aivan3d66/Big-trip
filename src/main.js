import {createEditorFormTemplate} from './view/form-edit.js';
import {createInitFormTemplate} from './view/form-create.js';
import {createMenuTemplate} from './view/site-menu.js';
import {createRouteInfoTemplate} from './view/route-info.js';
import {createTravelPriceTemplate} from './view/price.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortingTemplate} from './view/sort.js';
import {createRoutePointTemplate} from './view/route-point.js';

const POINT_ROUTE_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeaderElement = document.querySelector('.page-header');
const pageBodyElement = document.querySelector('.page-body__page-main');
const siteMenu = pageHeaderElement.querySelector('.trip-controls__navigation');
const siteFilters = pageHeaderElement.querySelector('.trip-controls__filters');
const tripMain = pageHeaderElement.querySelector('.trip-main');
const siteContent = pageBodyElement.querySelector('.trip-events');

render(tripMain, createTravelPriceTemplate(), 'afterbegin');
render(siteMenu, createMenuTemplate(), 'afterbegin');
render(tripMain, createRouteInfoTemplate(), 'afterbegin');

for (let i = 0; i < POINT_ROUTE_COUNT; i++) {
  render(siteContent, createRoutePointTemplate(), 'afterbegin');
}

render(siteContent, createEditorFormTemplate(), 'afterbegin');
render(siteContent, createInitFormTemplate(), 'beforeend');
render(siteFilters, createFiltersTemplate(), 'afterbegin');
render(siteContent, createSortingTemplate(), 'afterbegin');


