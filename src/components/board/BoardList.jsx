import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from '../../css/BoardList.module.css';

const BoardList = () => {
    const [list, setList] = useState([]); //게시글 리스트 상태

    useEffect(() => {
        axios.get('http://localhost:8080/spring/board/boardList')
             .then(res => {
                console.log(res.data);
                setList(res.data); //가져온 데이터를 상태에 저장
            })
    }, []);

    return (
        <div className= { styles.BoardList }>
            <h2>게시판 리스트</h2>
            <table border={1} frame='hsides' rules='rows'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(board => <tr key={ board.seq }>
                            <td>{ board.seq }</td>
                            <td>{ board.subject }</td>
                            <td>{ board.id }</td>
                            <td>{ board.hit }</td>
                            <td>{ board.logtime }</td>
                        </tr>)
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
};

export default BoardList;