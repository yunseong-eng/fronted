import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../css/BoardWriteForm.module.css';

const BoardWriteForm = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const [subjectDiv, setSubjectDiv] = useState('');
    const [contentDiv, setContentDiv] = useState('');

    const navigate = useNavigate();

    const onBoardWriteSubmit = (e) => {
        e.preventDefault();

        setSubjectDiv('');
        setContentDiv('');

        if (!subject) {
            setSubjectDiv('제목 입력');
        }
        else if (!content) {
            setContentDiv('내용 입력');
        }else{
            axios.post(
                    'http://localhost:8080/spring/board/boardWrite',
                     null, 
                     { 
                        params : {subject: subject , content: content },
                        withCredentials: true
                    })
                .then(res => {
                    alert('글쓰기 완료')
                    navigate('/board/boardList');
                    });
        } 
    }

    const onReset = () => {
        setSubject(''); //제목 초기화
        setContent(''); //내용 초기화
        setSubjectDiv(''); //메세지 초기화
        setContentDiv('');
    };

    return (
        <div className={styles.BoardWriteForm}>
            <form onSubmit={onBoardWriteSubmit}>
                <table className={styles.formTable}>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th><label htmlFor='subject'>제목</label></th>
                            <td>
                                <input type="text"
                                       id="subject"
                                       value={subject}
                                       size={50}
                                       onChange={(e) => setSubject(e.target.value)}
                                />
                                <div className={styles.errorDiv}>{subjectDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <th><label htmlFor="content">내용</label></th>
                            <td>
                                <textarea id="content"
                                          value={content}
                                          rows={10}
                                          cols={50}
                                          onChange={(e) => setContent(e.target.value)}
                                />
                                <div className={styles.errorDiv}>{contentDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align='center'>
                                <button type="submit">글쓰기</button>
                                <button type="button" onClick={onReset}>초기화</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default BoardWriteForm;
