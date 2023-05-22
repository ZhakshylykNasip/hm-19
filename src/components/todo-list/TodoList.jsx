import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { todoActionTypes } from "../../store/todo/todoReducer";
import { Button, Checkbox, TextField } from "@mui/material";

const TodoList = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();

  const changeEditValue = (e) => {
    setEditValue(e.target.value);
  };

  const deleteHandler = () => {
    dispatch({ type: todoActionTypes.DELETE_TODO, payload: todo.id });
  };

  const toggleTodoHandler = () => {
    dispatch({ type: todoActionTypes.COMPLETE_TODO, payload: todo.id });
  };

  const editTodoHandler = () => {
    dispatch({
      type: todoActionTypes.EDIT_TODO,
      id: todo.id,
      value: editValue,
    });
    setIsEditing(false);
  };

  const editHandler = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  return (
    <div>
      {isEditing ? (
        <EditBlock>
          <TextField
            id="standard-basic"
            variant="standard"
            type="text"
            value={editValue}
            onChange={changeEditValue}
          />

          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={editTodoHandler}
            style={{ height: "25px" }}
          >
            save
          </Button>
        </EditBlock>
      ) : (
        <BlockTodo>
          <div>
            <Checkbox
              defaultChecked
              size="small"
              color="success"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoHandler(todo.id)}
              style={{ marginRight: "15px" }}
            />
            <Title done={todo.completed}>{todo.title}</Title>
          </div>

          <div>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={editHandler}
              style={{ height: "25px" }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={deleteHandler}
              style={{ height: "25px" }}
            >
              Delete
            </Button>
          </div>
        </BlockTodo>
      )}
    </div>
  );
};

export default TodoList;

const Title = styled.span`
  text-decoration: ${(props) => (props.done ? "line-through" : "")};
`;

const BlockTodo = styled.div`
  width: 350px;
  height: 40px;
  background-color: #e87979;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
  font-weight: 500;
`;

const EditBlock = styled.div`
  width: 350px;
  height: 40px;
  align-items: center;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #249b2c;
  display: flex;
  justify-content: space-between;
`;
