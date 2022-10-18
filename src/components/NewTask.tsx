import React, { ChangeEvent, useState } from "react";
import "./NewTask.css";
import { addTask, showOnDate, showAll } from "../store/tasksSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");
  let currentDate = new Date().toISOString().split("T")[0];
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    debugger;
    if (!newTask || !taskDate) {
      alert("Enter task and date");
    } else if (newTask && taskDate >= currentDate) {
      dispatch(addTask({ text: newTask, date: taskDate }));
      setNewTask("");
      setTaskDate("");
    } else if (taskDate < currentDate) {
      alert("Do not enter past dates!");
      setNewTask("");
      setTaskDate("");
    }
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    if (date >= currentDate) {
      dispatch(showOnDate(date));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleTaskDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(event.target.value);
  };

  const onShowAll = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(showAll());
  };

  return (
    <form>
      <div id="calendar-div">
        <input
          type="date"
          id="calendar"
          onChange={handleDate}
          value={selectedDate || ""}
        />
        <button type="submit" onClick={onShowAll} id="show-btn">
          Show All Tasks
        </button>
      </div>
      <div id="new-task-form">
        <label htmlFor="new-task" id="new-task-label">
          Input Task
        </label>
        <input
          type="text"
          value={newTask}
          id="new-task"
          onChange={handleChange}
        />
      </div>
      <input
        type="date"
        id="task-date"
        onChange={handleTaskDateChange}
        value={taskDate}
      />
      <button type="submit" id="submit-btn" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
};

export default NewTask;
