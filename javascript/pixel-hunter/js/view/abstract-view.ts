const render = (html) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = html.trim();
  return wrapper;
};


export default abstract class AbstractView {
  private _element: HTMLElement;
  // constructor() {
  //   if (new.target === AbstractView) {
  //     throw new Error(`Can't instantiate AbstractView, only concrete one`);
  //   }
  // }
  abstract get template(): string
  // get template() {
  //   throw new Error(`template is requered`);
  // }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  private render(): HTMLElement {
    return render(this.template);
  }

  bind(element: HTMLElement): void {
    // bind handlers if required
  }
}
