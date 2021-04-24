import TripPointEditorView from '../view/trip-editor-form';
import TripPointView from '../view/trip-point';
import {handlerTypes} from '../view/handlers';
import {renderElement, toggleView, removeView} from '../utils/ui';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  constructor({containerForTripPoints, editClickCallback, closeClickCallback, updateDataCallback} = {}) {
    this._container = containerForTripPoints;
    this._tripPointData = null;
    this._tripPointView = null;
    this._tripPointEditView = null;
    this._closePointEditForm = this._closePointEditForm.bind(this);
    this._openPointEditForm = this._openPointEditForm.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
    this._callbacks = {
      editClickCallback,
      closeClickCallback,
      updateDataCallback,
    };
    this._mode = Mode.DEFAULT;
  }

  init(tripPointData) {
    this._tripPointData = tripPointData;

    const prevPointView = this._tripPointView;
    const prevEditPointView = this._tripPointEditView;

    this._tripPointView = new TripPointView(tripPointData);
    this._tripPointView.addEventListener(handlerTypes.OPEN_POINT_POPUP, this._openPointEditForm);
    this._tripPointView.addEventListener(handlerTypes.FAVORITE_CLICK, this._favoriteClick);

    this._tripPointEditView = new TripPointEditorView(tripPointData);
    this._tripPointEditView.addEventListener(handlerTypes.CLOSE_POINT_POPUP, this._closePointEditForm);

    if (!prevPointView || !prevEditPointView) {
      renderElement(this._container, this._tripPointView);
      return;
    }
    toggleView(this._container, prevPointView, this._tripPointView);
    toggleView(this._container, prevEditPointView, this._tripPointEditView);
    removeView(prevPointView);
    removeView(prevEditPointView);
  }

  setEditModeEnabled(enabled) {
    const from = enabled ? this._tripPointView : this._tripPointEditView;
    const to = enabled ? this._tripPointEditView : this._tripPointView;
    toggleView(this._container, from, to);
  }
  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePointEditForm();
    }
  }

  _closePointEditForm() {
    if (this._callbacks.closeClickCallback) {
      this._callbacks.closeClickCallback(this);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _openPointEditForm() {
    if (this._callbacks.editClickCallback) {
      this._callbacks.editClickCallback(this);
      document.addEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _favoriteClick() {
    this._commitUpdate({isFavorite: !this._tripPointData.isFavorite});
  }

  _commitUpdate(updatedObjectPart) {
    if (this._callbacks.updateDataCallback) {
      this._callbacks.updateDataCallback(this, Object.assign({}, this._tripPointData, updatedObjectPart));
    }
  }

  destroy() {
    removeView(this._tripPointView);
    removeView(this._tripPointEditView);
  }

  get tripPointData() {
    return this._tripPointData;
  }
}
