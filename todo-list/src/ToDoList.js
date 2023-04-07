import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

const ToDoList = () => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [shakeButton, setShakeButton] = useState(false);
  const jsonString = localStorage.getItem("TodoList");
  const data = JSON.parse(jsonString) || [];
  const [todoList, setTodoList] = useState(data);
  //empty the Todolist by emptying the todolist object and localstorage
  const emptyToDoList = () => {
    setTodoList([]);
    localStorage.setItem("TodoList", JSON.stringify([]));
  };
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo === "") {
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 500);
    } else {
      let id = nanoid();

      const newTodo = {
        id: id,
        todo: todo,
        description: description,
        date: date,
        completed: false,
      };

      const checkLocalStorage = localStorage.getItem("TodoList");
      if (checkLocalStorage) {
        let list = JSON.parse(localStorage.getItem("TodoList"));
        list.push(newTodo);
        localStorage.setItem("TodoList", JSON.stringify(list));
        setTodoList(list);
      } else {
        let list = [];
        list.push(newTodo);
        localStorage.setItem("TodoList", JSON.stringify(list));
        setTodoList(list);
      }
      setTodo("");
    }
  };

  //table code
  const todoElements = todoList.map((item) => (
    <tr key={item.id}>
      <td>{item.todo}</td>
      <td>{item.description}</td>
      <td>{item.date}</td>
    </tr>
  ));

  return (
    <div>
      <header>
        <div className="logo-container">
          <i className="fa fa-check-square"></i> ToDo List Manager
        </div>
        <nav>
          <ul className="menu">
            <li>
              <a href="#faq">Frequently Asked Questions</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="box form-container">
        <form className="custom-form" onSubmit={handleSubmit}>
          <div className="title">Enter ToDo</div>
          <input
            ref={inputRef}
            type="text"
            minLength={3}
            placeholder="Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="text"
            minLength={3}
            placeholder="Description"
            value={description}
            onChange={(f) => setDescription(f.target.value)}
          />
          <input type="date" onChange={(f) => setDate(f.target.value)} />
          <button
            className={`button ${shakeButton ? "shake" : ""}`}
            type="submit"
          >
            <i className="fa fa-plus"></i> Add ToDo
          </button>
        </form>
      </div>
      <div className="todolist-container">
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{todoElements}</tbody>
          <div className="Trash-button-container">
            <button className="trash-button" onClick={emptyToDoList}>
              <i className="fa fa-trash"></i>
              Empty ToDo List
            </button>
          </div>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
