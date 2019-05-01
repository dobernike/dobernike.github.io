export const render = (template: string) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const mainElement: any = document.querySelector(`#main`);

export const changeScreen = (element: HTMLElement) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
