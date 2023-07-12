import React, { useState, useContext } from 'react';
import Header from '../other/Header';
import TaskList from '../TaskList/TaskList';
import TaskListNumbers from '../other/TaskListNumbers';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = (props) => {
  const userData = useContext(AuthContext);
  const currentUser = userData[0].find((e) => e.firstName === props.data.firstName);
  const [taskStats, setTaskStats] = useState({
    active: props.data.taskCounts.active,
    newTask: props.data.taskCounts.newTask,
    complete: props.data.taskCounts.complete,
    failed: props.data.taskCounts.failed,
  });

  const updateTaskStats = (type, task) => {
    setTaskStats((prevStats) => {
      const updatedStats = { ...prevStats };
      switch (type) {
        case 'complete':
          console.log('HandleComplete running :)');
          updatedStats.complete += 1;
          updatedStats.active -= 1;
          currentUser.taskCounts.complete = updatedStats.complete;
          currentUser.taskCounts.active = updatedStats.active;
          if (task) {
            task.complete = true;
            task.active = false;
          }
          break;
        case 'failed':
          console.log('HandleFailed running :)');
          updatedStats.failed += 1;
          updatedStats.active -= 1;
          currentUser.taskCounts.failed = updatedStats.failed;
          currentUser.taskCounts.active = updatedStats.active;
          if (task) {
            task.failed = true;
            task.active = false;
          }
          break;
        case 'reject':
          console.log('HandleReject running :)');
          updatedStats.newTask -= 1;
          currentUser.taskCounts.newTask = updatedStats.newTask;
          if (task) {
            task.newTask = false;
          }
          break;
        case 'accept':
          console.log('HandleAccept running :)');
          updatedStats.active += 1;
          updatedStats.newTask -= 1;
          currentUser.taskCounts.active = updatedStats.active;
          currentUser.taskCounts.newTask = updatedStats.newTask;
          if (task) {
            task.active = true;
            task.newTask = false;
          }
          break;
        default:
          break;
      }
      // Persist the updated data in localStorage
      localStorage.setItem('employees', JSON.stringify(userData[0]));
      return updatedStats;
    });
  };

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header changeUser={props.changeUser} data={props.data} />
      <TaskListNumbers taskStats={taskStats} />
      <TaskList data={props.data} updateTaskStats={updateTaskStats} />
    </div>
  );
};

export default EmployeeDashboard;
