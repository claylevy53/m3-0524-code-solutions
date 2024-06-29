import './TodoList.css';

export function TodoList({ todos, toggleCompleted }) {
  return (
    <ul className="border rounded border-gray-300">
      {todos.map((todo) => (
        <TodoItem
          key={String(todo.todoId)}
          todo={todo}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, toggleCompleted }) {
  const { task, isCompleted } = todo;
  const completedClass = isCompleted ? 'is-completed' : '';
  return (
    <li className="py-3 px-8 -mb-px border border-r-0 border-l-0 border-gray-300">
      <div>
        <label className={`text-gray-700 pl-2 ${completedClass}`}>
          <input
            type="checkbox"
            checked={isCompleted}
            className="mt-1 -ml-6 mr-2"
            onChange={() => toggleCompleted(todo)}
          />
          {task}
        </label>
      </div>
    </li>
  );
}
