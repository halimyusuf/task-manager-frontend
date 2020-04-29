import React from 'react';
import Form from './common/form';
import { getTaskSchema } from '../services/formSchema';
import * as http from '../services/postsServices';
// material icon imports
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import { List, Chip } from '@material-ui/core';
import './task.css';

class Tasks extends Form {
  state = {
    data: {
      taskDescription: '',
    },
    tasks: [],
    newTaskId: '',
    currProjectId: '',
    errors: [],
    open: false,
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

  handleClick = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
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
        <ListSubheader component='div' id='nested-list-subheader'>
          <i className='fa fa-tasks'></i> Tasks &emsp;
          {user.isAdmin && (
            <i
              onClick={() => this.handleNewTask(id)}
              className={newTaskClass}
            ></i>
          )}
        </ListSubheader>

        {tasks.length === 0 && 'No task yet'}
        {tasks.map((task) => (
          <div className='task' key={task._id}>
            <List>
              <ListItem>
                <ListItemText
                  primary={task.description}
                  secondary={
                    <Chip
                      color={`${task.done ? 'primary' : 'secondary'}`}
                      label={`${task.done ? 'Finished' : 'Pending'}`}
                      component='p'
                      size='small'
                    />
                  }
                />
              </ListItem>

              <ListItemSecondaryAction edge='end'>
                <div>
                  {user._id === owner && (
                    <button
                      onClick={() =>
                        this.handleDone(
                          task._id,
                          `${task.done ? 'undo' : 'done'}`
                        )
                      }
                    >
                      {`${task.done ? 'Undo' : 'Done'}`}
                    </button>
                  )}
                </div>

                <DeleteIcon onClick={() => this.handleTaskDelete(task._id)} />
              </ListItemSecondaryAction>
            </List>
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
