import { Component } from "./components/component.js";
import {
  InputDialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};
class App {
  // page는 Composable 인터페이스를 정의하는 Component 클래스임
  private readonly page: Component & Composable;

  // 전달받은 root에 pageComponent를 만들어서 붙여줌
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent); // <ul class="page"></ul> 생성
    this.page.attachTo(appRoot);

    this.bindElementDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  private bindElementDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가 해준다
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);

// 태그 구조
/**
 * main.document
 * -> ul.page
 * -> li.pageitem
 * -> section.page-item__body , page-item__controls
 *    ->section.컨텐츠들
 */

// 리팩토링 전
// class App {
//   // page는 Composable 인터페이스를 정의하는 Component 클래스임
//   private readonly page: Component & Composable;

//   // 전달받은 root에 pageComponent를 만들어서 붙여줌
//   constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
//     this.page = new PageComponent(PageItemComponent); // <ul class="page"></ul> 생성
//     this.page.attachTo(appRoot);

//     const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
//     imageBtn.addEventListener("click", () => {
//       const dialog = new InputDialog();
//       const mediaSection = new MediaSectionInput();
//       dialog.addChild(mediaSection);
//       dialog.attachTo(dialogRoot);

//       dialog.setOnCloseListener(() => {
//         dialog.removeFrom(dialogRoot);
//       });
//       dialog.setOnSubmitListener(() => {
//         // 섹션을 만들어서 페이지에 추가 해준다
//         const image = new ImageComponent(mediaSection.title, mediaSection.url);
//         this.page.addChild(image);
//         dialog.removeFrom(dialogRoot);
//       });
//     });

//     const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
//     videoBtn.addEventListener("click", () => {
//       const dialog = new InputDialog();
//       const mediaSection = new MediaSectionInput();
//       dialog.addChild(mediaSection);
//       dialog.attachTo(dialogRoot);

//       dialog.setOnCloseListener(() => {
//         dialog.removeFrom(dialogRoot);
//       });
//       dialog.setOnSubmitListener(() => {
//         // 섹션을 만들어서 페이지에 추가 해준다
//         const video = new VideoComponent(mediaSection.title, mediaSection.url);
//         this.page.addChild(video);
//         dialog.removeFrom(dialogRoot);
//       });
//     });

//     const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
//     noteBtn.addEventListener("click", () => {
//       const dialog = new InputDialog();
//       const textSection = new TextSectionInput();
//       dialog.addChild(textSection);
//       dialog.attachTo(dialogRoot);

//       dialog.setOnCloseListener(() => {
//         dialog.removeFrom(dialogRoot);
//       });
//       dialog.setOnSubmitListener(() => {
//         // 섹션을 만들어서 페이지에 추가 해준다
//         const note = new NoteComponent(textSection.title, textSection.body);
//         this.page.addChild(note);
//         dialog.removeFrom(dialogRoot);
//       });
//     });

//     const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
//     todoBtn.addEventListener("click", () => {
//       const dialog = new InputDialog();
//       const textSection = new TextSectionInput();
//       dialog.addChild(textSection);
//       dialog.attachTo(dialogRoot);

//       dialog.setOnCloseListener(() => {
//         dialog.removeFrom(dialogRoot);
//       });
//       dialog.setOnSubmitListener(() => {
//         // 섹션을 만들어서 페이지에 추가 해준다
//         const todo = new TodoComponent(textSection.title, textSection.body);
//         this.page.addChild(todo);
//         dialog.removeFrom(dialogRoot);
//       });
//     });
//   }
// }
