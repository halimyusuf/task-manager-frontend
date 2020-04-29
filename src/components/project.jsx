import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import * as http from '../services/postsServices';
import { getDate, daysLeft } from '../utils/formatTime';
import Tasks from './tasks';
// material icon imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Project = (props) => {
  const [projects, setProject] = useState([]);
  const [modifier, setModifier] = useState(0);
  const classes = styles();
  const { user } = props;
  const getProjects = async () => {
    const user = props.param.user;
    try {
      let projects = await http.getAllProjects();
      projects = projects.data;
      if (user === 'my-projects') {
        projects = projects.filter(
          (project) => project.owner._id === props.user._id
        );
      }
      setProject(projects);
    } catch (error) {}
  };

  //  method to delete project
  const deleteProj = async (id) => {
    try {
      await http.deleteProject(id);
      const inc = modifier + 1;
      setModifier(inc);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await getProjects();
    })();
  }, [modifier]);

  return (
    <div className='all-projects'>
      {/* <h2>Wecome home</h2> */}
      {/* displays no project if no project exists */}
      {projects.length === 0 && <p>No project</p>}

      {/* render all existing projects  */}
      {projects.map((project) => {
        const startDate = getDate(project.startDate);
        const endDate = getDate(project.endDate);
        const days = daysLeft(project.startDate, project.endDate);
        return (
          <div
            className={`project ${days === 0 && `project-red`}`}
            key={project._id}
          >
            <Card className={classes.root} variant='outlined'>
              <CardContent>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  {project.name}
                </Typography>
                <Typography variant='body2' component='p'>
                  {' '}
                  From:&ensp;{startDate}&emsp; To:&ensp;
                  {endDate}
                </Typography>
                <Typography variant='h5' component='h2'>
                  benevolent
                </Typography>
                <Typography className={classes.pos} color='textSecondary'>
                  Days left: &ensp;{days}
                  <br />
                  Owner: {project.owner.name}
                </Typography>
                <Typography variant='body2' component='p'>
                  description: &nbsp; {project.description}
                </Typography>
              </CardContent>
              {user.isAdmin && (
                <CardActions>
                  <Button size='small'>
                    <Link to={`/project/${project._id}`}>
                      <i className='fa fa-pencil-square-o'></i>{' '}
                    </Link>
                  </Button>
                  <Button>
                    <i
                      onClick={() => deleteProj(project._id)}
                      className='fa fa-trash-o'
                    ></i>
                  </Button>
                </CardActions>
              )}
              <CardContent>
                <Tasks
                  user={props.user}
                  ownerId={project.owner._id}
                  id={project._id}
                />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
export default Project;
