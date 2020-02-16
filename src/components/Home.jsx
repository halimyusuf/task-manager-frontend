import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import * as http from "../services/postsServices";
import Form from "./common/form";
import { getTaskSchema } from "../services/formSchema";
import { getDate, daysLeft } from "../utils/formatTime";
import authServices from "../services/authServices";

class Home extends Form {
  state = {
    data: {
      taskDescription: ""
    },
    tasks: [],
    projects: [],
    currProjectId: "",
    newTaskForm: false,
    errors: []
  };

  schema = getTaskSchema();
  async componentDidMount() {
    try {
      console.log("again");
      const projects = await http.getAllProjects();
      const tasks = await http.getTasks();
      console.log(projects.data);
      this.setState({
        projects: projects.data,
        tasks: tasks.data
      });
    } catch (error) {}
  }

  doSubmit = async () => {
    const { currProjectId: project } = this.state;
    const { taskDescription: description } = this.state.data;
    try {
      const data = { description, project };
      console.log(data);
      const response = await http.postTask(data);
      console.log("posted", response);
      this.getTasks(project);
      this.setState({
        data: { taskDescription: "" },
        newTaskForm: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  getTasks = async () => {
    try {
      const response = await http.getTasks();
      console.log("data", response);
      this.setState({
        tasks: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleNewTask = id => {
    const { currProjectId, newTaskForm } = this.state;
    console.log(id);
    let bool = newTaskForm ? false : true;
    if (currProjectId !== id) {
      this.setState({
        currProjectId: id,
        newTaskForm: bool
      });
    } else {
      this.setState({
        newTaskForm: bool
      });
    }
  };

  handleTaskInput = e => {
    const value = e.target.value;
    this.setState({
      data: { taskDescription: value }
    });
  };

  handleDone = async id => {
    try {
      await http.markDone(id);
      this.getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  handleTaskDelete = async id => {
    try {
      await http.deleteTask(id);
      this.getTasks();
    } catch (error) {}
  };

  getCurrTasksLength = length => {
    this.setState({
      currTasksCount: length
    });
  };

  renderTasks = id => {
    let { tasks, newTaskForm } = this.state;
    tasks = tasks.filter(task => task.project === id);
    return (
      <div>
        <h4>
          {/* tasks head */}
          Tasks &emsp;
          {!newTaskForm && (
            <i
              onClick={() => this.handleNewTask(id)}
              className="fa fa-plus"
            ></i>
          )}
          {newTaskForm && (
            <i
              onClick={() => this.handleNewTask(id)}
              className="fa fa-minus"
            ></i>
          )}
        </h4>
        {/* tasks head ends here */}

        {/* if no task is present */}
        {tasks.length == 0 && "No task, please add task"}

        {/* renders projects tasks */}
        {tasks.map(task => (
          <div className="task" key={task._id}>
            <p>
              {task.description} &emsp;&emsp;
              {/* if task is not done show done button and the text pending */}
              {!task.done && (
                <span>
                  <small style={{ color: "red" }}>Pending</small>
                  <button onClick={() => this.handleDone(task._id, "done")}>
                    Done
                  </button>
                </span>
              )}
              {/* if task is done show text done and button undo */}
              {task.done && (
                <span className="task-state">
                  <i className="fa fa-check">
                    <small>Done</small>
                  </i>
                  <button onClick={() => this.handleDone(task._id, "undo")}>
                    Undo
                  </button>
                </span>
              )}
              <i
                onClick={() => this.handleTaskDelete(task._id)}
                className="fa fa-trash-o"
              ></i>
            </p>
          </div>
        ))}
      </div>
    );
  };

  renderTaskForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.inputField("taskDescription", "")}
        {this.renderButton("Add")}
      </form>
    );
  };

  deleteProj = async id => {
    try {
      await http.deleteProject(id);
      this.componentDidMount();
    } catch (error) {}
  };

  render() {
    const { projects, newTaskForm } = this.state;
    return (
      <div className="all-projects">
        {/* <h2>Wecome home</h2> */}

        {projects.map(project => {
          const startDate = getDate(project.startDate);
          const endDate = getDate(project.endDate);
          const days = daysLeft(project.startDate, project.endDate);
          return (
            <div
              className={`project ${!days && `project-red`}`}
              key={project._id}
            >
              <h2> {project.name} </h2>
              <p>
                {" "}
                Start date:&ensp;{startDate[0]}&emsp; End date:&ensp;
                {endDate[0]}
              </p>
              <p>Days left: &ensp;{days}</p>
              <p>Owner: {project.owner.name} </p>
              <p>description: &nbsp; {project.description}</p>
              <Link to={`/project/${project._id}`}>
                {" "}
                <i className="fa fa-pencil-square-o"></i>{" "}
              </Link>
              <i
                onClick={() => this.deleteProj(project._id)}
                className="fa fa-trash-o"
              ></i>{" "}
              {/* Tasks */}
              {/* function to get tasks */}
              {this.renderTasks(project._id)}
              {newTaskForm && this.renderTaskForm()}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
