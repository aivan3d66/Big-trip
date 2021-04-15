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
    this.pointTypes_ = ViewValues.pointTypes.map((value) => createPointType(value.name, value.isInMotion));
    this.filters_ = ViewValues.filters;
    this.sortTypes_ = ViewValues.sortTypes;
    this.cityListObject_ = {};
    this.cityList_ = [];
  }

  get pointTypes() {
    return this.pointTypes_;
  }

  get filters() {
    return this.filters_;
  }

  get sortTypes() {
    return this.sortTypes_;
  }

  get cityList() {
    return this.cityList_;
  }
  getPointTypeByTypeName(type) {
    return this.pointTypes_.find((value) => value.type === type);
  }

  getPointTypeByTitle(title) {
    return this.pointTypes_.find((value) => value.title === title);
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
      this.cityListObject_[`${name}`] = {
        description,
        pictures,
      };
      const city = this.cityList_.find((value) => value.name === name);
      if (city) {
        this.cityList_[this.cityList_.indexOf(city)] = {name, description, pictures};
      } else {
        this.cityList_.push({name, description, pictures});
      }

    }
  }

  getCity(name) {
    return `${name}` in this.cityListObject_ ? this.cityListObject_[`${name}`] : undefined;
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
