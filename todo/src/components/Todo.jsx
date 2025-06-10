import { useEffect, useRef, useState } from "react";
import { axiosAPI } from "../api/axiosAPI";

const Todo = () => {

  const [todoList, setTodoList] = useState([]);

  const inputRef = useRef();

  const [inputValue, setInputValue] = useState("");

  const selectTodoList = async() => {
    try {
      const resp = await axiosAPI.get("/todo/list");

      if(resp.status === 200) {
        setTodoList(resp.data);
      }

    } catch (error) {
      console.log("조회 중 오류 발생");
    }
  }



  const handleComplete = async(todo) => {
    try {
      const resp = await axiosAPI.post("/todo/complete", {todoNo : todo.todoNo, todoComplete : todo.todoComplete});
      
      if (resp.status === 200) {
        selectTodoList();
      }
    } catch (error) {
      console.log("완료 변경 시 오류 발생", error);
    }
  };

  const handleAddTodo = async(inputValue) => {
    try {
      const resp = await axiosAPI.post("/todo/add", {todoDetail : inputValue});
      
      if(resp.status === 200);
        selectTodoList();
    } catch (error) {
      console.log("추가 시 오류 발생", error);
    }

  }

  const handleDelete = async(todo) => {
    try {
      const resp = await axiosAPI.post("/todo/delete", {todoNo : todo.todoNo});
      
      if(resp.status === 200);
        selectTodoList();
    } catch (error) {
      console.log("삭제 시 오류 발생", error);
    }
  }

  const List = ({todoList}) => {
    return (
      <div className="list">
          <ul>
            {todoList.map((todo, index) => {
              return (
                <li key={index}>
                  <span style={{ textDecoration: todo.todoComplete === 1 ? "line-through" : "none" }}>
                    {todo.todoDetail}
                  </span>
                  <button onClick={() => {handleComplete(todo)}}>
                    {todo.todoComplete === 1 ? "미완료" : "완료"}
                  </button>
                  <button onClick={() => {handleDelete(todo)}}>
                    삭제
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
    )
  }

  useEffect (() => {
    selectTodoList();
  }, []);

  return (
    <>
      <div className="input">
        <input type="text" value={inputValue} ref={inputRef} onChange={(e) => {setInputValue(e.target.value)}}/>
        <button onClick={() => handleAddTodo(inputValue)}>추가하기</button>
      </div>

      <List todoList={todoList}/>
    </>
  )
}


export default Todo;