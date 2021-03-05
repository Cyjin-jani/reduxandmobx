const { observable, autorun, runInAction, action, reaction } = require('mobx');

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});

//리덕스와 다른 점은, mobx에서는 state가 여러개여도 상관없다!!
// 아래와 같이 필요에 따라서 state를 구분해서 사용할 수 있음.
const userState = observable({
  isLoggedIn: true,
  data: null,
});

const postState = observable([]);

postState.push({id: 1, content: '안녕하세요/'});
userState.data = {
  id: 1,
  nickname: 'helloooooo'
}


// autorun (무언가 바뀔 때 마다 감지해주는 역할..)
autorun(() => {
  // observable을 통해 state가 바뀔 때 마다 여기 콜백함수를 실행한다.
  console.log('changed', state.compA);
  
})

//reaction (얘도 autorun처럼 감지기 역할...)
// 첫번째 인자의 콜백함수에서 지정된 state의 값이 바뀌는 경우에만 실행이 된다!
// 즉, 아래와 같은 예시라면, autorun은 state의 어떤 값이 바뀌든지 실행이 되지만, reaction은 첫번째 인자값의 state값이 바뀌는 경우에만 실행!
reaction(() => {
  return state.compB;
}, () => {
  console.log(state.compB, "리액션 바뀌어써");
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
  state.compB = 25;
  state.compC = 'c';
});

runInAction(() => {
  state.compA = 'd'
})

// 위의 runInAction과 다르게, 그냥 action도 있음!
// runInAction은 바로 실행되는데, action은 변수에 할당할 수가 있어서, 나중에 원하는 타이밍에 액션 실행이 가능!
// 마치 함수처럼 만들어두고, 나중에 실행가능함.
const changeThings = action(() => {
  state.compA = 'bbb';
  state.compB = 250;
  state.compC = 'cccc';
});

// 필요할떄 아래와 같이 사용함!
changeThings();

// 아래와 같이 클래스 형태로도 쓰이는게 가능
// class UserStore {
//   @observable name = 'thor';
//   @observable age = 26;
//   @observable married = false;

//   @action
//   changeName(value) {
//     this.name = value;
//   }
// }