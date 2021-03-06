import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { userStore, postStore } from './store';

@observer
class App extends Component {

  // 이 컴포넌트에서만 쓰이는 스테이트 관리는 observable로 감싸준다. (그래야 변경이 감지됨)
  state = observable({
    name: '',
    password: '',
  });

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