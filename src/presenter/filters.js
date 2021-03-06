import AbstractPresenter from './abstract-presenter.js';
import FiltersView from '../view/filters-view.js';
import {removeView} from '../utils/ui.js';
import {AppConstants} from '../const.js';

export default class FiltersPresenter extends AbstractPresenter {
  constructor({container, filtersModel, tripPointsModel, filtersIface}) {
    super(container);
    this._filtersModel = filtersModel;
    this._tripPointsModel = tripPointsModel;
    this._filtersIface = filtersIface;
    this._handleFiltersModelEvent = this._handleFiltersModelEvent.bind(this);
    this._handleTripPointsModelEvent = this._handleTripPointsModelEvent.bind(this);
    this._filtersModel.addObserver(this._handleFiltersModelEvent);
    this._tripPointsModel.addObserver(this._handleTripPointsModelEvent);
    this._handleFilterTypeChangeFromView = this._handleFilterTypeChangeFromView.bind(this);
    this._view = null;
  }

  init() {
    if (this.isLoading()) {
      return;
    }
    this.destroy();
    this._view = new FiltersView({
      filters: this._filtersIface.getFilters().map((filterName) => {
        return {
          type: filterName,
          isActive: this._tripPointsModel.getTripPoints().filter(this._filtersIface.getFilterFunction(filterName)).length !== 0,
        };}),
      filterTypeChangeCallback: this._handleFilterTypeChangeFromView,
    });
    this._view.init(this._filtersModel.getFilterType());
    this._renderView(this._view);
  }

  destroy() {
    if (!this._view) {
      return;
    }
    removeView(this._view);
    this._view.removeElement();
    this._view = null;
  }

  _handleFiltersModelEvent(evt) {
    if (evt.type === AppConstants.updateType.INIT_ERROR) {
      return;
    }
    if (evt.type === AppConstants.updateType.INIT) {
      this.setLoading(false);
    }
  }

  _handleTripPointsModelEvent(evt) {
    if (evt.type !== AppConstants.updateType.MINOR && evt.type !== AppConstants.updateType.MAJOR) {
      return;
    }
    this.init();
  }

  _handleFilterTypeChangeFromView(filterType) {
    this._filtersModel.setFilterType(AppConstants.updateType.MINOR, filterType);
  }
}
