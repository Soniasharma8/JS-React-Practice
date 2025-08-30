/*-------------------- components -------------------- */
function Header() {
  return <h2>My Website Interface.</h2>;
}
function Footer() {
  return <p>2025 All rights reserved.</p>;
}

function Welcome() {
  return (
    <div>
      <Header />
      <h1>Hello, Welcome to my world.</h1>
      <Footer />
    </div>
  );
}

export default Welcome;

/* -------------------- react class components -------------------- */

import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <h2>count: {this.state.count}</h2>
        <button onClick={this.increment}>Increase</button>
      </div>
    );
  }
}

export default Counter;
 
/* -------------------- lifcycle methods -------------------- */
import React, { Component } from "react";
class LifeCycleDemo extends Component {
  componentDidMount() {
    console.log("Component mounted");
  }

  componentDidUpdate() {
    console.log("Component updated");
  }

  componentWillUnmount() {
    console.log("Component removed");
  }

  render() {
    return <h1>Lifecycle Methods Example</h1>;
  }
}
 

/* -------------------- react props -------------------- */

function Welcome(props) {
  return (
    <h2>
      Your name is {props.name} and your age is {props.age}
    </h2>
  );
}

function App() {
  return (
    <div>
      <Welcome name="Sonia" age={22} />
      <Welcome name="Kashish" age={23} />
    </div>
  );
}

export default App;

/* -------------------- react props destructuring -------------------- */
function User({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

function App() {
  return <User name="Sonia" age={22} />;
}
export default App;
