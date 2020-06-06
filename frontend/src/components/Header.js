import React from "react";

class Header extends React.Component {
  state = {
    userInput: "",
  };
  changeInputHandler = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };
  submitHandler = (event) => {
    // event.preventDefault();
    this.props.onAdd(this.state.userInput);
  };

  render() {
    return (
      // <React.Fragment>
      <div className="Add-Task">
        {/* <form onSubmit={this.submitHandler}> */}
        <input
          type="text"
          onChange={(event) => this.changeInputHandler(event)}
          value={this.state.userInput}
          placeholder="Add tasks..."
        />
        {/* <button type="submit" >add</button> */}
        {/* <button onClick={this.props.onAdd.bind(null,this.state.userInput)}>add</button> */}
        <button
          onClick={() => {
            return this.props.onAdd(this.state.userInput);
          }}
        >
          add
        </button>
        {/* </form> */}
      </div>
      // </React.Fragment>
    );
  }
}

export default Header;
