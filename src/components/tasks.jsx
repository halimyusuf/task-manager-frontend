import React, { useEffect, useState } from 'react';
import Form from './common/form';
import { getTaskSchema } from '../services/formSchema';
import * as http from '../services/postsServices';

class Tasks extends Form {
  state = {
    data: {
      taskDescription: '',
    },
    tasks: [],
    newTaskId: '',
    currProjectId: '',
    errors: [],
  };

  schema = getTaskSchema();

  componentDidMount = () => {
    this.getTasks();
  };

  getTasks = async () => {
    try {
      const response = await http.getTasks();
      this.setState({
        tasks: response.data,
      });
    } catch (error) {}
  };

  handleNewTask = (id) => {
    const { newTaskForm } = this.state;
    const { currProjectId } = this.props;
    let bool = newTaskForm ? false : true;
    if (currProjectId !== id) {
      this.setState({
        currProjectId: id,
        newTaskForm: bool,
      });
    } else {
      this.setState({
        newTaskForm: bool,
      });
    }
    // this.renderTasks();
  };

  handleDone = async (id) => {
    try {
      await http.markDone(id);
      this.componentDidMount();
    } catch (error) {}
  };

  handleTaskDelete = async (id) => {
    try {
      await http.deleteTask(id);
      this.componentDidMount();
    } catch (error) {}
  };

  renderTaskForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.inputField('taskDescription', '')}
        {this.renderButton('Add')}
      </form>
    );
  };

  doSubmit = async () => {
    const { currProjectId: project } = this.state;
    const { taskDescription: description } = this.state.data;
    try {
      const data = { description, project };
      await http.postTask(data);
      this.getTasks(project);
      this.setState({
        data: { taskDescription: '' },
        newTaskForm: false,
      });
    } catch (error) {}
  };

  // method to handle task condition, i.e either task is pending or task done
  handleTaskCondition(task, owner) {
    const { user } = this.props;
    {
      /* if task is not done show done button and the text pending */
    }
    return (
      <React.Fragment>
        {/* displays "pending" and "done" button if task has not been done yet */}
        {!task.done && (
          <span>
            <small style={{ color: 'red' }}>Pending</small>
            {user._id === owner && (
              <button onClick={() => this.handleDone(task._id, 'done')}>
                Done
              </button>
            )}
          </span>
        )}
        {/*display "done" and "undo" button is task is done */}
        {task.done && (
          <span className='task-state'>
            <i className='fa fa-check'>
              <small>Done</small>
            </i>
            {user._id === owner && (
              <button onClick={() => this.handleDone(task._id, 'undo')}>
                Undo
              </button>
            )}
          </span>
        )}
      </React.Fragment>
    );
  }

  // method to display all tasks
  renderTasks = (id, owner) => {
    let { tasks, newTaskForm, currProjectId } = this.state;
    const { user } = this.props;
    // filters all tasks for a particular project
    tasks = tasks.filter((task) => task.project === id);
    let newTaskClass = 'fa fa-';
    newTaskClass += newTaskForm ? 'minus' : 'plus';
    return (
      <div>
        <h4>
          {/* tasks head */}
          <i className='fa fa-tasks'></i> Tasks &emsp;
          {/* display plus or minus sign if user is an admin depending on the className */}
          {user.isAdmin && (
            <i
              onClick={() => this.handleNewTask(id)}
              className={newTaskClass}
            ></i>
          )}
        </h4>

        {/* tasks head ends here */}

        {/* if no task is present display the text no task yet*/}
        {tasks.length === 0 && 'No task yet'}

        {/* renders projects tasks */}
        {tasks.map((task) => (
          <div className='task' key={task._id}>
            <p>
              {task.description} &emsp;&emsp;
              {/* handle tasks condition */}
              {this.handleTaskCondition(task, owner)}
              {user.isAdmin && (
                <i
                  onClick={() => this.handleTaskDelete(task._id)}
                  className='fa fa-trash-o'
                ></i>
              )}
            </p>
          </div>
        ))}
        {/* displays tasks form if project id equals task id and condition to display new form is true */}
        {newTaskForm && currProjectId === id && this.renderTaskForm()}
      </div>
    );
  };

  render() {
    const { id, ownerId } = this.props;
    return <React.Fragment>{this.renderTasks(id, ownerId)}</React.Fragment>;
  }
}

export default Tasks;
