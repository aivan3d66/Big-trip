import MenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import FiltersView from './view/filters';
import SortView from './view/sort';
import TripPointEditorView from './view/trip-editor-form';
import TripPointView from './view/trip-point';
import TripPointsContainerView from './view/trip-points-container';
import TripPointsContainerEmptyView from './view/trip-points-container-empty';

import {handlerTypes} from './view/handlers.js';
import {RenderPosition, getComponent, renderElement, toggleView} from './utils/ui.js';
import {generateTripPointData} from './mock/point';
import {ViewValues, POINT_ROUTE_COUNT} from './const';

const testPoints = new Array(POINT_ROUTE_COUNT).fill().map(() => generateTripPointData());

const viewItems = {
  menu: new MenuView(),
  tripInfo: new TripInfoView(testPoints),
  filters: new FiltersView(),
  sort: new SortView(),
  tripEventsList: new TripPointsContainerView(),
  tripPoints: testPoints.map((e) => new TripPointView(e)),
  noTripPoints: new TripPointsContainerEmptyView(),
};

const tripPointsEditors = new Map();
const openedTripPoints = new Set();
const keyListener = (evt) => {
  if (evt.key.toLowerCase() == 'escape') {
    for (const opened of [...openedTripPoints.values()]) {
      switchToPointViewMode(tripPointsEditors.get(opened));
    }
  }
};

const switchToPointEditMode = (tripPointViewIptr) => {
  if (!tripPointsEditors.has(tripPointViewIptr)) {
    const editor = new TripPointEditorView(tripPointViewIptr.tripPoint);
    editor.setCallback(handlerTypes.CLOSE_POINT_POPUP, callback);
    tripPointsEditors.set(tripPointViewIptr, editor);
  }
  toggleView(viewItems.tripEventsList, tripPointViewIptr, tripPointsEditors.get(tripPointViewIptr));
  openedTripPoints.add(tripPointViewIptr);
  document.addEventListener('keydown', keyListener);
};

const switchToPointViewMode = (editorIptr) => {
  for (const entry of tripPointsEditors) {
    if (entry[1] === editorIptr) {
      toggleView(viewItems.tripEventsList, editorIptr, entry[0]);
      openedTripPoints.delete(entry[0]);
      if (!openedTripPoints.size) {
        document.removeEventListener('keydown', keyListener);
      }
      return;
    }
  }
};

function callback (type, viewIptr) {
  switch (type) {
    case handlerTypes.OPEN_POINT_POPUP:
      switchToPointEditMode(viewIptr);
      break;
    case handlerTypes.CLOSE_POINT_POPUP:
      switchToPointViewMode(viewIptr);
      break;
    default:
      break;
  }
}

viewItems.tripPoints.forEach((item) => item.setCallback(handlerTypes.OPEN_POINT_POPUP, callback));

const renderApplication = () => {
  renderElement(getComponent(ViewValues.selectors.MENU), viewItems.menu);
  renderElement(getComponent(ViewValues.selectors.INFO), viewItems.tripInfo, RenderPosition.AFTERBEGIN);
  renderElement(getComponent(ViewValues.selectors.FILTERS), viewItems.filters);
  renderElement(getComponent(ViewValues.selectors.SORT), viewItems.sort);
  renderElement(getComponent(ViewValues.selectors.EVENTS), viewItems.tripEventsList);
  if (viewItems.tripPoints && viewItems.tripPoints.length) {
    viewItems.tripPoints.forEach((item) => renderElement(viewItems.tripEventsList, item));
  } else {
    renderElement(getComponent(ViewValues.selectors.EVENTS), viewItems.noTripPoints);
  }
};

renderApplication();
