import {ViewValues} from './const';

const createPointType = (title, isInMotion = true) => {
  return {
    title,
    type: title.toLowerCase(),
    offers: [],
    isInMotion,
  };
};

class AppData {
  constructor() {
    this._pointTypes = ViewValues.pointTypes.map((value) => createPointType(value.name, value.isInMotion));
    this._filters = ViewValues.filters;
    this._sortTypes = ViewValues.sortTypes;
    this._cityListObject = {};
    this._cityList = [];
  }

  get pointTypes() {
    return this._pointTypes;
  }

  get filters() {
    return this._filters;
  }

  get sortTypes() {
    return this._sortTypes;
  }

  get cityList() {
    return this._cityList;
  }
  getPointTypeByTypeName(type) {
    return this._pointTypes.find((value) => value.type === type);
  }

  getPointTypeByTitle(title) {
    return this._pointTypes.find((value) => value.title === title);
  }

  setOffersByTypeName(type, offers) {
    const offerType = this.getPointTypeByTypeName(type);
    if (offerType) {
      offerType.offers = [...offers];
    }
  }

  setOffersByTypeTitle(title, offers) {
    const offerTitle = this.getPointTypeByTitle(title);
    if (offerTitle) {
      offerTitle.offers = [...offers];
    }
  }

  getOffersByTypeName(type) {
    const {
      offers = [],
    } = this.getPointTypeByTypeName(type);
    return offers;
  }

  getOffersByTitle(title) {
    const {
      offers = [],
    } = this.getPointTypeByTitle(title);
    return offers;
  }

  addCity({name, description = '', pictures = []} = {}) {
    if (name) {
      this._cityListObject[`${name}`] = {
        description,
        pictures,
      };
      const city = this._cityList.find((value) => value.name === name);
      if (city) {
        this._cityList[this._cityList.indexOf(city)] = {name, description, pictures};
      } else {
        this._cityList.push({name, description, pictures});
      }

    }
  }

  getCity(name) {
    return `${name}` in this._cityListObject ? this._cityListObject[`${name}`] : undefined;
  }

  getCityPictures(name) {
    const {
      pictures = [],
    } = this.getCity(name);
    return pictures;
  }

  getCityDescription(name) {
    const {
      description = [],
    } = this.getCity(name);
    return description;
  }
}

export const appData = new AppData();
