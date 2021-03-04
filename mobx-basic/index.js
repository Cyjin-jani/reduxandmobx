const { observable, autorun, runInAction, action } = require('mobx');

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});


// autorun (무언가 바뀔 때 마다 감지해주는 역할..)
autorun(() => {
  // observable을 통해 state가 바뀔 때 마다 여기 콜백함수를 실행한다.
  console.log('changed', state.compA);
  
})

// dispatch나 action 만들고 이러는거 필요 없이 바꿈...
// 아래 하나하나가 액션이 된다...
// mobx가 한방에 쭈르륵 아래와 같이 실행되는 것을 하나의 액션으로 간주함.
// state.compA = 'b';
// state.compB = 'C';
// state.compC = 'c';

// 이 액션들을 하나의 액션으로 묶을 수도 있다. 아래와 같이 runInAction을 통해.
runInAction(() => {
  state.compA = 'b';
  state.compB = 'C';
  state.compC = 'c';
});

// 아래와 같이 클래스 형태로도 쓰이는게 가능
class UserStore {
  @observable name = 'thor';
  @observable age = 26;
  @observable married = false;

  @action
  changeName(value) {
    this.name = value;
  }
}