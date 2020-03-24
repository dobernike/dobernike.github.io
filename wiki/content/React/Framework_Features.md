# Framework Features

# Redux

## Usage with React

[https://redux.js.org/basics/usage-with-react](https://redux.js.org/basics/usage-with-react)

### Implementing Components

components/Todo.js

```js
import React from "react";
import PropTypes from "prop-types";

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
```

components/TodoList.js

```js
import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
```

components/Link.js

```js
import React from "react";
import PropTypes from "prop-types";

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
```

components/Footer.js

```js
import React from "react";
import FilterLink from "../containers/FilterLink";
import { VisibilityFilters } from "../actions";

const Footer = () => (
  <p>
    Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    {", "}
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    {", "}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default Footer;
```

### Implementing Container Components

To use connect(), you need to define a special function called mapStateToProps that describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. For example, VisibleTodoList needs to calculate todos to pass to the TodoList, so we define a function that filters the state.todos according to the state.visibilityFilter, and use it in its mapStateToProps:

```js
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
    case "SHOW_ALL":
    default:
      return todos;
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
```

In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a function called mapDispatchToProps() that receives the dispatch() method and returns callback props that you want to inject into the presentational component. For example, we want the VisibleTodoList to inject a prop called onTodoClick into the TodoList component, and we want onTodoClick to dispatch a TOGGLE_TODO action:

```js
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
```

Finally, we create the VisibleTodoList by calling connect() and passing these two functions:

```js
import { connect } from "react-redux";

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
```

Find the rest of the container components defined below:

containers/FilterLink.js

```js
import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
```

containers/VisibleTodoList.js

```js
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import TodoList from "../components/TodoList";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
```

### Implementing Other Components

containers/AddTodo.js

```js
import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
AddTodo = connect()(AddTodo);

export default AddTodo;
```

### Tying the containers together within a component

components/App.js

```js
import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
```

### Passing the Store

index.js

```js
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import todoApp from "./reducers";
import App from "./components/App";

const store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

---

## How to use Redux in ReactJS with real-life examples

[https://www.freecodecamp.org/news/how-to-use-redux-in-reactjs-with-real-life-examples-687ab4441b85/](https://www.freecodecamp.org/news/how-to-use-redux-in-reactjs-with-real-life-examples-687ab4441b85/)

### When working with Redux, you will need three main things:

- actions: these are objects that should have two properties, one describing the type of action, and one describing what should be changed in the app state.
- reducers: these are functions that implement the behavior of the actions. They change the state of the app, based on the action description and the state change description.
- store: it brings the actions and reducers together, holding and changing the state for the whole app — there is only one store.

```js
export const startAction = {
  type: "rotate",
  payload: true
};
```

```js
export default (state, action) => {
  switch (action.type) {
    case "rotate":
      return {
        rotating: action.payload
      };
    default:
      return state;
  }
};
```

```js
import { createStore } from "redux";
import rotateReducer from "reducers/rotateReducer";

function configureStore(state = { rotating: true }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
```

```js
import { connect } from "react-redux";
import { startAction } from "actions/startAction";
import { stopAction } from "actions/stopAction";

export default connect()(App);
```

### This will be done using the connect function, which accepts two parameters:

- mapStateToProps: this is used to retrieve the store state
- mapDispatchToProps: this is used to retrieve the actions and dispatch them to the store

```js
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  startAction: () => dispatch(startAction),
  stopAction: () => dispatch(stopAction)
});
```

After this, let’s add them inside our connect function like so:

```js
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

App.js

```js
import React, { Component } from "react";
// new lines from here
import { connect } from "react-redux";
import rotateAction from "actions/rotateAction";

//// new lines to here

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className={
              "App-logo" + (this.props.rotating ? "" : " App-logo-paused")
            }
            alt="logo"
            onClick={() => this.props.rotateAction(!this.props.rotating)}
          />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  rotateAction: payload => dispatch(rotateAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

---

## ReactNext 2019: A Deep Dive into React-Redux

[https://www.youtube.com/watch?v=yOZ4Ml9LlWE&feature=youtu.be](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&feature=youtu.be)
