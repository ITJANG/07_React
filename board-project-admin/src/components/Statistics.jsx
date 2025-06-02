import { useEffect, useState } from "react";
import { axiosAPI } from "../api/axiosAPI";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // 최대 조회수 게시글 조회
  const getMaxReadCount = async () => {
    try {
      const resp = await axiosAPI.get("/admin/maxReadCount");
      console.log(resp.data);
      if (resp.status === 200) {
        setReadCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 조회수 게시글 조회 중 예외 발생 : ", error);
    }
  };
  // 최대 좋아요수 게시글 조회
  const getMaxLikeCount = async () => {
    try {
      const resp = await axiosAPI.get("/admin/maxLikeCount");
      console.log(resp.data);
      if (resp.status === 200) {
        setLikeCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 좋아요수 게시글 조회 중 예외 발생 : ", error);
    }
  };
  // 최대 댓글수 게시글 조회
  const getMaxCommentCount = async () => {
    try {
      const resp = await axiosAPI.get("/admin/maxCommentCount");
      console.log(resp.data);
      if (resp.status === 200) {
        setCommentCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 댓글수 게시글 조회 중 예외 발생 : ", error);
    }
  };


  const [newMemberData, setNewMemberData] = useState([]);
  // 신규 회원 조회
  const getNewMemberData = async () => {
    try {
      const resp = await axiosAPI.get("/admin/newMember");
      console.log(resp.data);
      if (resp.status == 200) {
        setNewMemberData(resp.data);
      }
    } catch (error) {
      console.log("신규 회원 조회 중 예외 발생", error);
    }
  };

  // 컴포넌트가 처음 마운트 될 때 1번만 실행
  // -> Statistics 컴포넌트가 화면에 마운트 될 때 서버로 세가지 데이터 요청, 응답 받아야함
  useEffect(() => {
    getNewMemberData();
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
  }, []);

  // readCountData, likeCountData, commentCountData에 변화가 감지될 때
  // isLoding 을 false로 변경
  useEffect(() => {
    if (
      (newMemberData != null) &
      (readCountData != null) &
      (likeCountData != null) &
      (commentCountData != null)
    )
      setIsLoading(false);
  }, [newMemberData, readCountData, likeCountData, commentCountData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <section className="statistics-section">
          <h2>신규 가입 회원 ({newMemberData.length})</h2>
          <h4>[7일 이내 가입 회원]</h4>
          <tr>
            <thead>
              <td>회원번호</td>
              <td>이메일</td>
              <td>닉네임</td>
              <td>가입일</td>
            </thead>
          </tr>
          <tbody>
            {newMemberData.map((member) => (
              <tr key={member.memberNo}>
                <td>{member.memberNo}</td>
                <td>{member.memberEmail}</td>
                <td>{member.memberNickname}</td>
                <td>{member.enrollDate}</td>
              </tr>
            ))}
          </tbody>
        </section>

        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종류 : {readCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{readCountData.boardNo} /{" "}
            {readCountData.boardTitle}
          </p>
          <p>게시글 조회수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickName}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 좋아요 많은 게시글</h2>
          <p>게시판 종류 : {likeCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{likeCountData.boardNo} /{" "}
            {likeCountData.boardTitle}
          </p>
          <p>게시글 조회수 : {likeCountData.likeCount}</p>
          <p>작성자 닉네임 : {likeCountData.memberNickName}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
          <p>게시판 종류 : {commentCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{commentCountData.boardNo} /{" "}
            {commentCountData.boardTitle}
          </p>
          <p>게시글 조회수 : {commentCountData.commentCount}</p>
          <p>작성자 닉네임 : {commentCountData.memberNickName}</p>
        </section>
      </div>
    );
  }
}
