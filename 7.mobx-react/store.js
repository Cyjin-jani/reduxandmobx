const { observable } = require('mobx');

const userStore = observable({
  isLoggingIn: false,
  data: null,
  // 아래는 action부분이라고 보면 됨. state의 값을 변경하는..
  logIn(data) {
    this.isLoggingIn = true;
    // 아래와 같이 비동기 사용이 편하게 가능하다!! thunk, saga 같은게 필요없음.
    // axios등도 물론 여기서 사용 가능하다.
    setTimeout(() => {
      this.data = data;
      this.isLoggingIn = false;
      //리덕스에 비해 편한점. (유저 스토어에서 액션을 통해 유저 관련 state만 바꾸는 것이 아니라, post스토어의 상태도 변경이 가능!)
      postStore.data.push(1); 
    }, 2000);
  },
  logOut() {
    this.data = null;
  },
});

const postStore = observable({
  data: [],
  addPost(data) {
    this.data.push(data);
  },
});

export { userStore, postStore };