export const render = (template) => {
  const wrapper = document.createElement(`div`);
  // wrapper.innerHTML = template.trim();
  wrapper.innerHTML = template;
  return wrapper;
};

export const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  // element.forEach((it) => {
  mainElement.appendChild(element);
  // });

};

