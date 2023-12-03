import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";

class App {
  // page는 Composable 인터페이스를 정의하는 Component 클래스임
  private readonly page: Component & Composable;

  // 전달받은 root에 pageComponent를 만들어서 붙여줌
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent); // <ul class="page"></ul> 생성
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      "Video Title",
      "https://www.youtube.com/embed/40fWW9ty6-o"
    );
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Tilte", "Todo Item");
    this.page.addChild(todo);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("onClick", () => {
      const dialog = new InputDialog();

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });
      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가 해준다
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
    // const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    // imageBtn.addEventListener("click", () => {
    //   const dialog = new InputDialog();

    //   dialog.setOnCloseListener(() => {
    //     dialog.removeFrom(document.body);
    //   });
    //   dialog.setOnSubmitListener(() => {
    //     // 섹션을 만들어서 페이지에 추가 해준다.
    //     dialog.removeFrom(document.body);
    //   });

    //   dialog.attachTo(document.body);
    // });
  }
}

new App(document.querySelector(".document")! as HTMLElement);

// 태그 구조
/**
 * main.document
 * -> ul.page
 * -> li.pageitem
 * -> section.page-item__body , page-item__controls
 *    ->section.컨텐츠들
 */
