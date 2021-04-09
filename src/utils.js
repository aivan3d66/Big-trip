export const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateForData = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

export const generateDescription = (array) => {
  const randomIndex = getRandomNumber(0, (array.length - 1) / 2);
  let result = '';
  for (let i = 0; i <= randomIndex; i++) {
    result += array[i];
  }
  return result;
};

export const createPhotoTemplate = () => {
  const arrayPhoto = [];
  for (let i = 0; i < getRandomNumber(1,5); i++) {
    const photos = 'http://picsum.photos/248/152?r=' + i;
    arrayPhoto.push(photos);
  }
  return `${arrayPhoto.map((photo, i) => {
    return`<img class="event__photo" src="${photo}" alt="photo-${i}">`;
  }).join('')}`;
};

export const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};
