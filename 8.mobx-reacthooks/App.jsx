import React, { useCallback } from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import useStore from './useStore';
// import { userStore, postStore } from './store'; 얘 대신, useStore를 써서 묶어줄 수 있다.

// decorator는 클래스형 컴포넌트에서만 사용가능하므로, useObserver라는 훅스를 써주어야 한다.
const App = () => {
  const { userStore, postStore } = useStore();
  // local store 라고 보면 됨.. 여기 컴포넌트에서만 쓰이는 state (사실 글로벌하게 쓰일순 있다.)
  // 어떻게 보면 작은 store라고 볼 수도 있다.
  const state = useLocalStore(() => ({
    name: '',
    password: '',
    onChangeName(e) {
      this.name = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    }
  }));

  const onClick = useCallback(() => {
    userStore.logIn({
      nickname: 'hihi',
      password: 'abcd',
    })
  }, []);

  const onLogout = useCallback(() => {
    userStore.logOut();
  }, []);

  return useObserver(() => (
    <div>
      {userStore.isLoggingIn
          ? <div>로그인 중</div>
          : userStore.data
            ? <div>{userStore.data.nickname}</div>
            : '로그인 해주세요.'}
        {!userStore.data
          ? <button onClick={onClick}>로그인</button>
          : <button onClick={onLogout}>로그아웃</button>}
        <div>{postStore.data.length}</div>
        <input value={state.name} onChange={state.onChangeName} />
        <input value={state.password} type="password" onChange={state.onChangePassword}  />
    </div>
  ));
};


export default App;