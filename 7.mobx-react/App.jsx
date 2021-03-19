import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { userStore, postStore } from './store';

// 역시 데코레이터 없이 observer로 App 클래스 전체를 감쌀 수 도 있다.
// 지금은 불안정하지만 나중에 데코레이터는 공식적으로 사용가능해질 수 있음.
// (webpack.config에 @babel/plugin-proposal-decorators와 class-properties는 꼭 필요!)
@observer
class App extends Component {

  // 이 컴포넌트에서만 쓰이는 스테이트 관리는 observable로 감싸준다. (그래야 변경이 감지됨)
  state = observable({
    name: '',
    password: '',
  });
  // 아래와 같은 경우도 가능하다. (하지만 정해진 방법대로만 사용이 가능한 게 데코레이터. 함부로 사용은 불가.)
  // action이나 observable을 사용할 수 있는게 class 컴포넌트
  // @observable state = {
  //   name: '',
  //   password: '',
  // };


  // @action onLogIn = () => {
  //   userStore.logIn({
  //     nickname: 'hihi',
  //     password: 'abcd',
  //   });
  // };

  onLogIn = () => {
    userStore.logIn({
      nickname: 'hihi',
      password: 'abcd',
    });
  };
  onLogOut = () => {
    userStore.logOut();
  };

  onChangeName = (e) => {
    // 기존의 코드
    // this.setState({
    //   name: e.target.value,
    // })
    // mobx를 쓰면 아래와 같이 사용해도 알아서 리렌더링이 잘 됨.
    this.state.name = e.target.value;
  };

  onChangePassword = (e) => {
    this.state.password = e.target.value;
  }

  render() {
    return (
      <div>
        {userStore.isLoggingIn
          ? <div>로그인 중</div>
          : userStore.data
            ? <div>{userStore.data.nickname}</div>
            : '로그인 해주세요.'}
        {!userStore.data
          ? <button onClick={this.onLogIn}>로그인</button>
          : <button onClick={this.onLogOut}>로그아웃</button>}
        <div>{postStore.data.length}</div>
        <input value={this.state.name} onChange={this.onChangeName} />
        <input value={this.state.password} type="password" onChange={this.onChangePassword}  />
      </div>
    );
  }
}

export default App;