import React, { Component } from "react";
import axios from "axios";

class ToDoCRUD extends Component {
  state = {
    userInput: "",
    todos: [],
  };
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/").then((response) => {
      console.log(response.data);
      this.setState({
        todos: [...response.data],
      });
    });
  }

  componentDidUpdate() {
    //   axios.get('http://127.0.0.1:8000/api/')
    //   .then( (resp) => {
    //       console.log(resp.data);
    //       this.setState({
    //           todos: [...resp.data],
    //       })
    //   })
    console.log()
  }

  todoAddTaskHandler = () => {
    axios
      .post(`http://127.0.0.1:8000/api/`, { name: this.state.userInput })
      .then((response) => {
        console.log(response);
        this.setState((state, props) => {
          return {
            todos: [...state.todos, response.data],
          };
        });
      });
  };
  todoDeleteTaskHandler = (pk) => {
    axios
      .delete(`http://127.0.0.1:8000/api/${pk}`, { data: pk })
      .then((response) => {
        console.log(response);
        const updatedTodos = this.state.todos.filter((task) => {
          return task.id !== pk;
        });
        console.log(this.state.todos , updatedTodos);
        this.setState({
          todos: updatedTodos,
        });
      });
  };
  changeUserInputState = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };

  render() {
    let tasks = <p>Loading..</p>;
    if (this.state.todos.length > 0) {
      tasks = this.state.todos.map((item) => {
        return (
          <div key={item.id}>
            {item.name}
            <button onClick={() => this.todoDeleteTaskHandler(item.id)}>
              x
            </button>
          </div>
        );
      });
    }

    return (
      <div>
        <div className="Add-Task">
          <input
            type="text"
            onChange={(event) => this.changeUserInputState(event)}
            value={this.state.userInput}
            placeholder="Add tasks..."
          />
          <button onClick={this.todoAddTaskHandler}>Add Task</button>
        </div>

        <div className="Show-Tasks">{tasks}</div>
      </div>
    );
  }
}

export default ToDoCRUD;
