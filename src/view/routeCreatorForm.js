import {OFFERS, POINT_TYPE} from '../const';

export const createEventTypeTemplate = () => {
  return `${POINT_TYPE.map((point) => {
    return `<div class="event__type-item">
              <input id="event-type-${POINT_TYPE}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${point.toLowerCase()}">
              <label class="event__type-label  event__type-label--${POINT_TYPE}" for="event-type-${POINT_TYPE}">${point.toLowerCase()}</label>
            </div>`;
  }).join('')}`;
};

export const createOffersTemplate = () => {
  return `${OFFERS.map((item) => {
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${POINT_TYPE}" type="checkbox" name="event-offer-${POINT_TYPE}" ${item.checked}>
              <label class="event__offer-label" for="event-offer-${POINT_TYPE}">
                <span class="event__offer-title">${item.name}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${item.price}</span>
              </label>
            </div>`;
  }).join('')}`;
};

export const createInitFormTemplate = (isCreating) => {
  const {description, photos, cities, pointTypes} = isCreating;

  return ` <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointTypes.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeTemplate()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointTypes.toLowerCase()}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cities}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="${cities}"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${createOffersTemplate()}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                          ${photos}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
};
