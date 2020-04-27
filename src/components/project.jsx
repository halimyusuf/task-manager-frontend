import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as http from '../services/postsServices';
import { getDate, daysLeft } from '../utils/formatTime';
import Tasks from './tasks';

class Project extends Component {
  state = {
    projects: [],
  };

  async componentDidMount() {
    this.getProjects();
  }

  //   method to get projects
  getProjects = async () => {
    const user = this.props.param.user;
    try {
      let projects = await http.getAllProjects();
      projects = projects.data;
      if (user === 'my-projects') {
        projects = projects.filter(
          (project) => project.owner._id === this.props.user._id
        );
      }
      this.setState({
        projects: projects,
      });
    } catch (error) {}
  };

  //  method to delete project
  deleteProj = async (id) => {
    try {
      await http.deleteProject(id);
      this.getProjects();
    } catch (error) {}
  };

  render() {
    const { projects } = this.state;
    const { user } = this.props;
    return (
      <div className='all-projects'>
        {/* <h2>Wecome home</h2> */}
        {/* displays no project if no project exists */}
        {projects.length === 0 && <p>No project</p>}

        {/* render all existing projects */}
        {projects.map((project) => {
          {
            /* get start and end date in dd/mm/yyyy format */
          }
          const startDate = getDate(project.startDate);
          const endDate = getDate(project.endDate);
          {
            /* gets the days btw current date and end date */
          }
          const days = daysLeft(project.startDate, project.endDate);
          return (
            <React.Fragment>
              {/* the classNmae "project-red" marks the div left border red if days left is zero */}
              <div
                className={`project ${days === 0 && `project-red`}`}
                key={project._id}
              >
                {/* displays project details */}
                <h2> {project.name} </h2>
                <p>
                  {' '}
                  Start date:&ensp;{startDate}&emsp; End date:&ensp;
                  {endDate}
                </p>
                <p>Days left: &ensp;{days}</p>
                <p>Owner: {project.owner.name} </p>
                <p>description: &nbsp; {project.description}</p>

                {/* if user is an admin display edit and delete button*/}
                {user.isAdmin && (
                  <React.Fragment>
                    <Link to={`/project/${project._id}`}>
                      {' '}
                      <i className='fa fa-pencil-square-o'></i>{' '}
                    </Link>
                    <i
                      onClick={() => this.deleteProj(project._id)}
                      className='fa fa-trash-o'
                    ></i>
                  </React.Fragment>
                )}

                {/* Component to get Tasks */}
                <Tasks
                  user={this.props.user}
                  ownerId={project.owner._id}
                  id={project._id}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
export default Project;
