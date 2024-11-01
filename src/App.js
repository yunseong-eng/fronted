import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import LoginForm from './components/member/LoginForm';
import BoardWriteForm from './components/board/BoardWriteForm';
import BoardList from './components/board/BoardList';

import './css/style.css';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <nav className='menunav'>
          <ul>
              <li><Link to='/'>메인화면</Link></li>
              <li><Link to='/member/loginForm'>로그인</Link></li>
              <li><Link to='/board/boardWriteForm'>글쓰기</Link></li>
              <li><Link to='/board/boardList'>목록</Link></li>
          </ul>
        </nav>  

        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path='/' element={ <Main /> } /> 
          <Route path='/member/loginForm' element={ <LoginForm /> } /> 
          <Route path='/board'>
            <Route path='boardWriteForm' element={ <BoardWriteForm /> } /> 
            <Route path='boardList' element={ <BoardList /> } /> 
          </Route>

        </Routes>  
      </>
    </BrowserRouter>
  );
};

export default App;
