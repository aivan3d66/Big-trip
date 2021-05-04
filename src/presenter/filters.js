import FiltersView from '../view/filters-menu';
import {renderElement, removeView} from '../utils/ui';
import {FiltersRules} from '../app-data';
import {ViewValues} from '../const';

export default class FiltersPresenter {
  constructor({container, model}) {
    this._container = container;
    this._model = model;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChangeFromView = this._handleFilterTypeChangeFromView.bind(this);
    this._model.addObserver(this._handleModelEvent);
    this._view = null;
  }

  _handleModelEvent() {
  }

  init() {
    this.destroy();
    this._view = new FiltersView({
      filerTypes: FiltersRules.getFilters(),
      filterTypeChangeCallback: this._handleFilterTypeChangeFromView,
    });
    this._view.init(this._model.getFilterType());
    renderElement(this._container, this._view);
  }

  _handleFilterTypeChangeFromView(filterType) {
    this._model.setFilterType(ViewValues.updateType.MINOR, filterType);
  }

  destroy() {
    removeView(this._view);
    this._view = null;
  }
}