import MenuView from './view/menu';
import StatisticsPresenter from './presenter/stats';
import HeaderPresenter from './presenter/header';
import FiltersPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points';
import FiltersModel from './model/filters';
import {getComponent, renderElement} from './utils/ui';
import {generateTripPointData} from './mock/trip-point';
import {ViewValues, POINT_ROUTE_COUNT} from './const';

const models = {
  points: new PointsModel(),
  filters: new FiltersModel(),
};

models.points.setTripPoints(new Array(POINT_ROUTE_COUNT).fill().map(() => generateTripPointData()));

const menuCallback = (uiType) => {
  viewItems.menu.setUiViewType(uiType);
  viewItems.statisticsPresenter.setVisible(uiType === ViewValues.uiViewType.STATS);
  viewItems.tripPresenter.setVisible(uiType === ViewValues.uiViewType.TABLE);
};

const viewItems = {
  menu: new MenuView(menuCallback),
  headerPresenter: new HeaderPresenter({
    container: getComponent(ViewValues.selectors.INFO),
    model: models.points,
  }),
  filtersPresenter: new FiltersPresenter({
    container: getComponent(ViewValues.selectors.FILTERS),
    model: models.filters,
  }),
  statisticsPresenter: new StatisticsPresenter({
    container: getComponent(ViewValues.selectors.BODY_CONTAINER),
    model: models.points,
  }),
  tripPresenter: new TripPresenter({
    container: getComponent(ViewValues.selectors.TRIP),
    tripPointsModel: models.points,
    filtersModel: models.filters,
    switchToTableModeCallback: () => {
      menuCallback(ViewValues.uiViewType.TABLE);
    },
  }),
};

const renderApp = () => {
  renderElement(getComponent(ViewValues.selectors.MENU), viewItems.menu);
  viewItems.menu.init();
  viewItems.headerPresenter.init();
  viewItems.filtersPresenter.init();
  viewItems.statisticsPresenter.init();
  viewItems.tripPresenter.init();
  menuCallback(ViewValues.uiViewType.TABLE);
};

renderApp();

getComponent(ViewValues.selectors.INFO).querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
  viewItems.tripPresenter.setAddNewPointMode(true);
});
