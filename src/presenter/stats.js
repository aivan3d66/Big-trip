import StatisticsView from '../view/stats';
import {renderElement, removeView } from '../utils/ui';
import {TimeUtils} from '../utils/time';
import {ViewValues} from '../const';

export default class StatisticsPresenter {
  constructor({container, model}) {
    this._container = container;
    this._model = model;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._model.addObserver(this._handleModelEvent);
    this._view = null;
  }

  _handleModelEvent() {
    this.init();
  }

  setVisible(isVisible) {
    if (isVisible) {
      this._view.getElement().classList.remove('visually-hidden');
    } else {
      this._view.getElement().classList.add('visually-hidden');
    }
  }

  _createSortedObject(obj) {
    const sortedArray = Object.entries(obj).sort((o1, o2) => o2[1] - o1[1]).map((el) => {return {[el[0]]: el[1]};});
    return Object.assign({}, ...sortedArray);
  }

  init() {
    this.destroy();
    this._view = new StatisticsView();
    renderElement(this._container, this._view);
    const typeChart = {};
    const moneyChart = {};
    const timeChart = {};

    ViewValues.pointTypes.forEach((pType) => {
      typeChart[pType.name.toUpperCase()] = this._model.getTripPoints().reduce((cnt, tripPoint) => {
        return cnt + (tripPoint.type.toUpperCase() === pType.name.toUpperCase() ? 1 : 0);
      }, 0);
      moneyChart[pType.name.toUpperCase()] = this._model.getTripPoints().reduce((cnt, tripPoint) => {
        return cnt + (tripPoint.type.toUpperCase() === pType.name.toUpperCase() ? tripPoint.base_price : 0);
      }, 0);
      timeChart[pType.name.toUpperCase()] = this._model.getTripPoints().reduce((cnt, tripPoint) => {
        return cnt + (tripPoint.type.toUpperCase() === pType.name.toUpperCase() ? TimeUtils.getDurationInMilliseconds(tripPoint.date_from, tripPoint.date_to) : 0);
      }, 0);
    });
    this._view.createMoneyChart(this._createSortedObject(moneyChart));
    this._view.createTypeChart(this._createSortedObject(typeChart));
    this._view.createTimeChart(this._createSortedObject(timeChart));
  }

  destroy() {
    removeView(this._view);
    this._view = null;
  }
}