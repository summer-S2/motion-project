import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor() {
    super(`
    <dialog class="dialog">
      <div class='dialog__container>
        <button class="close">&times;</button>
        <div id="dialog__body"></div>
        <button class="dialog__submit">ADD</button>
      </div>
    </dialog>
    `);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    // 다수의 이벤트가 등록되어있을때 onclick을 사용하면 기존의 이벤트를 덮어씌우는 효과가 있음. 그렇기 떄문에 컴포넌트 안에서 등록하는곳이 한군데라면 사용해도 좋지만 버튼을 다른곳에서도 사용한다면 addeventlistener를 사용하는것이 좋음.
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
