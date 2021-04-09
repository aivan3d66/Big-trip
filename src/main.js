import {createFiltersTemplate} from './view/filters';
import {createInitFormTemplate} from './view/routeCreatorForm';
// import {createEditorFormTemplate} from './view/routeEditorForm';
import {createMenuTemplate} from './view/siteMenu';
import {createPointTripTemplate} from './view/routePoint';
import {createSortTemplate} from './view/sort';
import {createInfoTripTemplate} from './view/routeInfo';
import {generatePoint} from './mock/point';
import {renderTemplate} from './utils';

const POINT_ROUTE_COUNT = 3;
const points = new Array(POINT_ROUTE_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.trip-main');
const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

renderTemplate(siteHeaderElement, createInfoTripTemplate(), 'afterbegin');
renderTemplate(siteNavElement, createMenuTemplate());
renderTemplate(siteFilterElement, createFiltersTemplate());
renderTemplate(siteMainElement, createSortTemplate());
// renderTemplate(siteMainElement, createEditorFormTemplate(points[0]));
renderTemplate(siteMainElement, createInitFormTemplate(points[0]));

for (let i = 0; i < POINT_ROUTE_COUNT; i++) {
  renderTemplate(siteMainElement, createPointTripTemplate(points[i]));
}
