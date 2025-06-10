import axios from 'axios';
import React, { useEffect, useState } from "react";
import { axiosAPI } from "../api/axiosAPI";

export default function Restore() {
  const [deleteMembers, setDeleteMembers] = useState([]); // 탈퇴 회원 목록
  const [deleteBoards, setDeleteBoards] = useState([]); // 삭제 게시글 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 탈퇴 회원 목록 조회
  const getDeleteMemberList = async () => {
    try {
      const resp = await axiosAPI.get("/admin/deleteMember");

      if (resp.status === 200) {
        setDeleteMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴 회원 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 탈퇴 회원 복구 요청
  const restoreMember = async(member) => {
    if(window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")){
      try {
        const resp = await axiosAPI.put("/admin/restoreMember", {memberNo : member.memberNo});

        if (resp.status === 200) {
          alert("복구 완료");
          getDeleteMemberList(); // 리렌더링
        }
      } catch (error) {
        console.log("탈퇴 회원 복구 시 에러 : ", error);
      }
    }
  }

  // 삭제 게시글 목록 조회
  const getDeleteBoardList = async () => {
    try {
      const resp = await axiosAPI.get("/admin/deleteBoard");

      if (resp.status === 200) {
        setDeleteBoards(resp.data);
      }
    } catch (error) {
      console.log("삭제된 게시글 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 삭제 게시글 복구 요청
  const restoreBoard = async(board) => {
    if(window.confirm(board.boardNo + "번 게시글을 복구 시키겠습니까?")){
      try {
        const resp = await axiosAPI.put("/admin/restoreBoard", {boardNo : board.boardNo});

        if (resp.status === 200) {
          alert("복구 완료");
          getDeleteBoardList; // 리렌더링
        }
      } catch (error) {
        console.log("삭제 게시글 복구 시 에러 : ", error);
      }
    }
  }

  // Restore 컴포넌트가 처음 렌더링 될 때
  useEffect(() => {
    getDeleteMemberList();
    getDeleteBoardList();
  }, []);

  // deleteMembers, deleteBoards 상태가 변경될 때 실행(isLoading 값 변경)
  useEffect(() => {
    if (deleteMembers != null && deleteBoards != null) {
      setIsLoading(false);
      console.log("loading", isLoading);
      console.log(deleteMembers);
      console.log(deleteBoards);
    }
  }, [deleteMembers, deleteBoards]);

  if (isLoading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="menu-box">
        <RestoreMember deleteMembers={deleteMembers} restoreMember={restoreMember}/>
        <RestoreBoard deleteBoards={deleteBoards} restoreBoard={restoreBoard}/>
      </div>
    );
  }
}

const RestoreMember = ({deleteMembers, restoreMember}) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>

      <h3>탈퇴한 회원 목록</h3>
      
      {
        deleteMembers.length === 0 ? (
          <p>탈퇴한 회원이 없습니다</p>
        ) : (
          deleteMembers.map((member, index) => {
            return (
              <ul className="ul-board" key={index}>
                <li>회원 번호 : {member.memberNo}</li>
                <li>회원 이메일 : {member.memberEmail}</li>
                <li>회원 닉네임 : {member.memberNickname}</li>
                <button className="restoreBtn" onClick={() => restoreMember(member)}>복구</button>
              </ul>
            )
          })
        )
      }
    </section>
  );
};

const RestoreBoard = ({deleteBoards, restoreBoard}) => {
  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>

      <h3>삭제된 게시글 목록</h3>
      {
        deleteBoards.length === 0 ? (
          <p>삭제된 게시글이 없습니다</p>
        ) : (
          deleteBoards.map((board, index) => {
            return (
              <ul className="ul-board" key={index}>
                <li>게시글 번호 : {board.boardNo}</li>
                <li>게시글 카테고리명 : {board.boardName}</li>
                <li>게시글 제목 : {board.boardTitle}</li>
                <li>작성자 닉네임 : {board.memberNickname}</li>
                <button className="restoreBtn" onClick={() => restoreBoard(board)}>복구</button>
              </ul>
            )
          })
        )
      }
    </section>
  );
};
