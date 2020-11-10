import './styles.css';
import { observe, notify } from './signals';

function Reactive(dataObj) {
  observeData(dataObj);

  return {
    data: dataObj,
    observe,
    notify
  };

  function makeReactive(obj, key) {
    let val = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        return val;
      },

      set(newValue) {
        notify(key, {
          newValue
        });
      }
    });
  }

  function observeData(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        makeReactive(obj, key);
      }
    }
  }
}

let data = {
  firstName: 'Branchito',
  lastName: 'de Munze',
  age: 45
};

const r = new Reactive(data);
r.observe('firstName', (payload) =>
  console.log('First name has changed', payload)
);
r.observe('firstName', () =>
  console.log('I am also called when firstName has been changed')
);
r.observe('age', () => console.log('Age has changed'));

r.data.firstName = 'paco';
r.data.age = 44;
