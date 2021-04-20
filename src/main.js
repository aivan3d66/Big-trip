import MenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import FiltersView from './view/filters';
import TripPresenter from './presenter/trip';
import {RenderPosition, getComponent, renderElement} from './utils/ui.js';
import {generateTripPointData} from './mock/point';
import {ViewValues, POINT_ROUTE_COUNT} from './const';

const testPoints = new Array(POINT_ROUTE_COUNT).fill().map(() => generateTripPointData());

const viewItems = {
  menu: new MenuView(),
  tripInfo: new TripInfoView(testPoints),
  filters: new FiltersView(),
  tripPresenter: new TripPresenter(getComponent(ViewValues.selectors.TRIP)),
};

const renderApp = () => {
  renderElement(getComponent(ViewValues.selectors.MENU), viewItems.menu);
  renderElement(getComponent(ViewValues.selectors.INFO), viewItems.tripInfo, RenderPosition.AFTERBEGIN);
  renderElement(getComponent(ViewValues.selectors.FILTERS), viewItems.filters);
  viewItems.tripPresenter.init(testPoints);
};

renderApp();
