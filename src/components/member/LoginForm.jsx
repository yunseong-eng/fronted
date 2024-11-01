import axios from 'axios'; //Http 요청을 보내기 위한 axios 라이브러리
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import styles from '../../css/LoginForm.module.css';

const LoginForm = () => {
    const [id, setId] = useState(''); //아이디 입력상태
    const [pwd, setPwd] = useState(''); //비밀번호 입력상태
    const [loginMessage, setLoginMessage] = useState(''); //로그인메세지 상태

    const [idDiv, setIdDiv] = useState(''); //유효성
    const [pwdDiv, setPwdDiv] = useState('');

    const navigate = useNavigate(); //페이지이동

    const onLoginSubmit = (e) => {
        e.preventDefault(); //기본제출 동작 방지
        setIdDiv(''); //메세지 초기화
        setPwdDiv('');
        setLoginMessage('');

        //입력 유효성 검사
        if (!id) { 
            setIdDiv('아이디 입력');
        } else if (!pwd) { 
            setPwdDiv('비밀번호 입력');    
        } else {
            //로그인 요청
            axios.get(`http://localhost:8080/spring/member/login?id=${id}&pwd=${pwd}`, {withCredentials: true})
            .then(res => res.data === "success" 
                ? (alert(res.data), navigate('/')) //메인 화면으로 이동
                : setLoginMessage("아이디 또는 비밀번호가 틀렸습니다"))
            .catch(err => console.error(err));
        }
    };

    return (
        <div className={ styles.LoginForm }>
            <form onSubmit={ onLoginSubmit }>
                <table border='1'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type='text' name='id' value={ id } onChange={ e => setId(e.target.value) } />
                                <div id={ styles.idDiv }>{ idDiv }</div>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type='password' name='pwd' value={ pwd } onChange={ e => setPwd(e.target.value) } />
                                <div id={ styles.pwdDiv }>{ pwdDiv }</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align='center'>
                                <button type="submit">로그인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div className={ styles.loginMessage }>{ loginMessage }</div>
            </form>
        </div>
    );
};

export default LoginForm;
