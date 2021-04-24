import AbstractViewElement from '../view/abstract-view-element';

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const checkForAbstractViewElement = (iptr) => {
  return iptr instanceof AbstractViewElement ? iptr.getElement() : iptr;
};

export const renderElement = (container, element, place = RenderPosition.BEFOREEND) => {
  container = checkForAbstractViewElement(container);
  element = checkForAbstractViewElement(element);
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const getComponent = (selector) => {
  return document.querySelector(selector);
};

export const toggleView = (container, from, to) => {
  container = checkForAbstractViewElement(container);
  from = checkForAbstractViewElement(from);
  to = checkForAbstractViewElement(to);
  if (container && to && container.contains(from)) {
    container.replaceChild(to, from);
  }
};

export const removeView = (component) => {
  if (!(component instanceof AbstractViewElement)) {
    throw new Error('Can remove only ViewElement');
  }
  component.getElement().remove();
  component.removeElement();
};