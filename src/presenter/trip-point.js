import TripPointEditorView from '../view/trip-point-editor.js';
import TripPointView from '../view/trip-point.js';
import { ViewEvents } from '../view/view-events.js';
import { renderElement, toggleView, removeView } from '../utils/ui.js';
import { ViewValues } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  constructor({containerForTripPoints, model, openEditFormCallback, closeEditFormCallback} = {}) {
    this._container = containerForTripPoints;
    this._tripPointData = null;
    this._tripPointView = null;
    this._tripPointEditView = null;
    this._openEditFormCallback = openEditFormCallback;
    this._closeEditFormCallback = closeEditFormCallback;
    this._handleOpenEditFormButtonClick = this._handleOpenEditFormButtonClick.bind(this);
    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this);
    this._handleCloseEditFormButtonClick = this._handleCloseEditFormButtonClick.bind(this);
    this._handleSavePointChangesButtonClick = this._handleSavePointChangesButtonClick.bind(this);
    this._handleDeletePointButtonClick = this._handleDeletePointButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._mode = Mode.DEFAULT;
    this._model = model;
  }
  init(tripPointData) {
    this._tripPointData = tripPointData;

    const prevPointView = this._tripPointView;
    const prevEditPointView = this._tripPointEditView;

    this._tripPointView = new TripPointView(tripPointData);
    this._tripPointView.setEventListener(ViewEvents.uid.OPEN_POINT_POPUP, this._handleOpenEditFormButtonClick);
    this._tripPointView.setEventListener(ViewEvents.uid.FAVORITE_CLICK, this._handleFavoriteButtonClick);

    this._tripPointEditView = new TripPointEditorView(tripPointData);
    this._tripPointEditView.setEventListener(ViewEvents.uid.CLOSE_POINT_POPUP, this._handleCloseEditFormButtonClick);
    this._tripPointEditView.setEventListener(ViewEvents.uid.SAVE_POINT, this._handleSavePointChangesButtonClick);
    this._tripPointEditView.setEventListener(ViewEvents.uid.DELETE_POINT, this._handleDeletePointButtonClick);

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
    if (!enabled) {
      this._tripPointEditView.tripPoint = this._tripPointData;
    }
  }
  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handleCloseEditFormButtonClick();
    }
  }
  _handleCloseEditFormButtonClick() {
    if (this._closeEditFormCallback) {
      this._closeEditFormCallback(this);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenEditFormButtonClick() {
    if (this._openEditFormCallback) {
      this._openEditFormCallback(this);
      document.addEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleFavoriteButtonClick() {
    this._commitUpdate({isFavorite: !this._tripPointData.isFavorite});
  }

  _handleSavePointChangesButtonClick() {
    this._commitUpdate(this._tripPointEditView.tripPoint);
    this.setEditModeEnabled(false);
  }

  _handleDeletePointButtonClick() {
    this._model.deleteTripPoint(ViewValues.updateType.MAJOR, this._tripPointData);
  }

  _commitUpdate(updatedObjectPart) {
    this._model.updateTripPoint(ViewValues.updateType.PATCH, Object.assign({}, this._tripPointData, updatedObjectPart));
  }

  destroy() {
    removeView(this._tripPointView);
    removeView(this._tripPointEditView);
  }

  get tripPointData() {
    return this._tripPointData;
  }
}
