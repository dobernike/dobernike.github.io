/* eslint-disable object-curly-spacing */
import { Result } from "./quest";


// const whenTextQuestLoaded = fetch(`https://es.dump.academy/text-quest/quest`);


//  whenTextQuestLoaded.
//   then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else if (response.status === 404) {
//       return [];
//     }
//     throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
//   }).
//   then((data) => console.log(data)).
//   catch((err) => console.log(err));


export default {
  'level-0': {
    text: `Вас зовут Луиджи Марио, вы водопроводчик, но сейчас перед вами стоит очень важная миссия — спасти принцессу
  Грибного Королевства Тоадстул Пич. Её похитил злой повелитель черепах Боузер и вы отправились в Грибное Королевство,
  чтобы победить Боузера и освободить принцессу. Вы отправляетесь в первый замок, но, чтобы в него попасть нужно
  преодолеть несколько препятствий. Вы стоите посреди на одной из равнин Грибного Королевства и видите как на вас
  стремительно несется хмурый гриб вашего роста. Нужно срочно что-то предпринять`,
    answers: [
      {
        action: `left`,
        title: `Вы побежите влево, от гриба`,
        result: Result.DIE
      },
      {
        action: `right`,
        title: `Вы побежите вправо, прямо на гриб`,
        result: Result.DIE
      },
      {
        action: `jump`,
        title: `Вы прыгните вверх`,
        result: Result.NEXT_LEVEL
      }
    ]
  },

  'level-1': {
    text: `Теперь, когда угроза быть убитым грибом миновала, вы можете спокойно оглядеться по сторонам. Вы видите что над вами прямо в двумерном небе висят кирпичные блоки, которые перемещаются с непонятными металлическими конструкциями. Что вы предпримете?`,
    answers: [
      {
        action: `left`,
        title: `Вы побежите влево`,
        result: Result.DIE
      },
      {
        action: `right`,
        title: `Вы побежите вправо`,
        result: Result.DIE
      },
      {
        action: `jump`,
        title: `Как что, конечно же подпрыгну и со всей силы ударюсь головой о железяку!`,
        result: Result.NEXT_LEVEL
      }
    ]
  },

  'level-2': {
    text: `Вы проходите немного вперед и снова видите над головой кирпичную кладку. Вы хотите проверить свои новые силы и со всего размаху бьетесь об нее головой. На этот раз кирпичи разлетаются во все стороны. Вы начинаете радостно прыгать и разносить головой все кирпичи, но случайно ударяетесь о еще одну металлическую штуку и видите как из нее вырастает цветок. Ваши действия?`,
    answers: [
      {
        action: `left`,
        title: `Вы побежите влево`,
        result: Result.DIE
      },
      {
        action: `right`,
        title: `Вы побежите вправо`,
        result: Result.DIE
      },
      {
        action: `1`,
        title: `Конечно же съесть его!`,
        result: Result.WIN
      }
    ]
  }
};
