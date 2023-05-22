import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActionTypes } from "../../store/auth/authReducer";
import { todoActionTypes } from "../../store/todo/todoReducer";
import TodoList from "../todo-list/TodoList";
import { Button, TextField } from "@mui/material";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todo);

  const changeInputHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: todoActionTypes.ADD_TODO, payload: value });
    setValue("");
  };

  const removeAllTodo = () => {
    dispatch({ type: todoActionTypes.DELETE_ALL_TODO });
  };

  const logoutHandler = () => {
    dispatch({ type: authActionTypes.LOGOUT });
    dispatch({ type: todoActionTypes.DELETE_ALL_TODO });
    navigate("/login");
  };

  console.log(todo.todo);

  return (
    <Container>
      <div>
        <Button variant="contained" color="error" onClick={logoutHandler}>
          Log out
        </Button>

        <TodoBlock>
          <TextField
            id="standard-basic"
            label="Add Todo"
            variant="standard"
            type="text"
            value={value}
            onChange={changeInputHandler}
          />

          <Button
            onClick={submitHandler}
            disabled={!value}
            size="small"
            variant="contained"
            color="success"
            style={{ height: "25px" }}
          >
            Add
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={removeAllTodo}
            style={{ height: "25px" }}
          >
            Delete All
          </Button>
        </TodoBlock>
        <StyledUl>
          {todo.todos.map((item) => (
            <ContainerBlock>
              <TodoList key={item.id} todo={item} />
            </ContainerBlock>
          ))}
        </StyledUl>
      </div>
    </Container>
  );
};

export default TodoForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;
  padding: 0;
`;
const ContainerBlock = styled.div``;

const TodoBlock = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
