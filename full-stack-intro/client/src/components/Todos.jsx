import { useEffect, useState } from 'react';
import { PageTitle } from './PageTitle';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // Implement useEffect to fetch all todos
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, []);

  // Implement addTodo to add a new todo
  async function addTodo(newTodo) {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    } catch (error) {
      setError(error);
    }
  }

  // Implement toggleCompleted to toggle the completed state of a todo
  async function toggleCompleted(todo) {
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      const response = await fetch(`/api/todos/${todo.todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedTodoFromServer = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.todoId === updatedTodoFromServer.todoId ? updatedTodoFromServer : t
        )
      );
    } catch (error) {
      setError(error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  return (
    <div className="container">
      <div className="flex">
        <div className="px-4">
          <PageTitle text="Todo App" />
          <TodoForm onSubmit={addTodo} />
          <TodoList todos={todos} toggleCompleted={toggleCompleted} />
        </div>
      </div>
    </div>
  );
}

// ----------- HINTS!!!!!!!!! ------------
/* useEffect:
 *  Use fetch to send a GET request to `/api/todos`.
 *  Once the response JSON is received and parsed,
 *  update state with the received todos.
 *  Handle errors correctly and set `error` to any error or error status code.
 *  Set `isLoading` to false when all network activity is finished.
 */

/* addTodo:
 *  Use fetch to send a POST request to `/api/todos`.
 *  Once the response JSON is received and parsed,
 *    - set the Todos to a _new_ array with the added Todo concatenated
 *    - handle errors appropriately (as mentioned above)
 *
 *  DO NOT MUTATE the original state array, nor any objects within it.
 *  Reminder: A React component will re-render if one of its state setters
 *  is called, but only if the new value is different than the old value.
 *  With arrays and objects, the new value will be different _only if_ a
 *  new array or object instance is created. That is why mutating the original
 *  state array _will not_ trigger a re-render.
 *  See https://react.dev/learn/updating-arrays-in-state for more info.
 *
 *  TIP: When calling fetch, be sure to SERIALIZE the todo object in the body
 *       with JSON.stringify() and specify the "Content-Type" header as "application/json"
 *  TIP: Use Array.prototype.concat to create a new array containing the contents
 *       of the old array, plus the object returned by the server.
 *       Alternatively, use the spread operator: `[...oldArray, addedItem]`
 */

/* toggleCompleted:
 *  Toggle the todo's "isCompleted" status.
 *  Use fetch to send a PUT request to `/api/todos/${todoId}` with the modified `todo`
 *  in the body.
 *  Once the response JSON is received and parsed,
 *    - create a shallow copy of the todos array from state
 *    - replace the old todo with the todo received from the server
 *    - handle errors appropriately (as mentioned above)
 *
 *  NOTE: "toggle" means to flip back and forth, so clicking a todo
 *  in the list repeatedly should "toggle" its isCompleted status back and forth.
 *
 *  DO NOT MUTATE the original state array, nor any objects within it. See above.
 *
 *  TIP: When calling fetch, be sure to SERIALIZE the todo object in the body
 *       with JSON.stringify() and specify the "Content-Type" header as "application/json"
 *  TIP: `Array.map` is a convenient way to make a copy of an array -- compare
 *       the Todo IDs and return the existing Todo if it is not the one that was
 *       just updated, and return the updated array if it is.
 */
