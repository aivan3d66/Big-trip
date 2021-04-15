import AbstractViewElement from './view-element';

export default class TripPointsContainer extends AbstractViewElement {
  constructor() {
    super();
  }

  getTemplate() {
    return '<ul class="trip-events__list"></ul>';
  }
}
