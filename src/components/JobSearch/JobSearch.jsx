import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    display: 'block',
    margin: theme.spacing(1),
    minWidth: 150
  },
  select: {
    minWidth: 150,
    margin: theme.spacing(1)
  }
});

class JobSearch extends Component {
  state = {
    search: {
      searchTerm: '',
      skill: 0
    },
    jobs: [
      {
        project: 'Redesign our website',
        client: `John Doe's Doughnuts`,
        location: 'Minneapolis, MN',
        budget: '$500',
        deadline: '10/25/19',
        skills: ['JavaScript', 'React', 'CSS']
      }
    ]
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ALL_JOBS'
    });
  }

  handleSearch = (searchBy, event) => {
    this.setState({
      search: {
        ...this.state.search,
        [searchBy]: event.target.value
      }
    });
  };
  render() {
    const { classes } = this.props;

    let jobList = this.state.jobs.map((job, i) => {
      return (
        <div key={i} className="list-item">
          <div>
            {/* left side info */}
            <h2>{job.project}</h2>
            <h3>{job.client}</h3>
            <h4>{job.location}</h4>
          </div>
          {/* right side info */}
          <div>
            <p>Budget: {job.budget}</p>
            <p>Deadline: {job.deadline}</p>
            {job.skills.map(skill => {
              return <h4 className="skill-tag">{skill}</h4>;
            })}
          </div>
        </div>
      );
    });

    return (
      <div className="list-display">
        <Paper className="search">
          <FormControl className={classes.formControl}>
            <FormGroup row="true" className="search">
              <TextField
                className={classes.formControl}
                onChange={e => this.handleSearch('searchTerm', e)}
                value={this.state.searchTerm}
                label="Search Jobs"
              />

              <Select
                className={classes.select}
                value={this.state.search.skill}
                onChange={e => this.handleSearch('skill', e)}
              >
                <MenuItem value={0}>Select Skill</MenuItem>
                <MenuItem value={1}>Adobe Photoshop</MenuItem>
                <MenuItem value={2}>Adobe Illustrtor</MenuItem>
                <MenuItem value={3}>Adobe XD</MenuItem>
                <MenuItem value={4}>Sketch</MenuItem>
                <MenuItem value={5}>Responsive Web Design</MenuItem>
                <MenuItem value={6}>UI/UX Design</MenuItem>
                <MenuItem value={7}>Front-End Development</MenuItem>
                <MenuItem value={8}>Back-End Development</MenuItem>
                <MenuItem value={9}>Full Stack Development</MenuItem>
                <MenuItem value={10}>Mobile AppDevelopment</MenuItem>
                <MenuItem value={11}>No SQL</MenuItem>
                <MenuItem value={12}>SQL</MenuItem>
                <MenuItem value={13}>MySQL</MenuItem>
                <MenuItem value={14}>.NET</MenuItem>
                <MenuItem value={15}>C#</MenuItem>
                <MenuItem value={16}>Java</MenuItem>
                <MenuItem value={17}>JavaScript</MenuItem>
                <MenuItem value={18}>TypeScript</MenuItem>
                <MenuItem value={19}>Webpack</MenuItem>
                <MenuItem value={20}>React</MenuItem>
                <MenuItem value={21}>Angular</MenuItem>
                <MenuItem value={22}>HTML5</MenuItem>
                <MenuItem value={23}>CSS</MenuItem>
                <MenuItem value={24}>LESS</MenuItem>
                <MenuItem value={25}>SASS</MenuItem>
                <MenuItem value={26}>Wordpress</MenuItem>
                <MenuItem value={27}>PHP</MenuItem>
                <MenuItem value={28}>QA/Testing</MenuItem>
              </Select>

              <IconButton
                className={classes.button}
                aria-label="search"
                color="primary"
              >
                <SearchIcon />
              </IconButton>
            </FormGroup>
          </FormControl>
        </Paper>

        {/* Job Search List */}
        <div className="list">{jobList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    jobs: store.allJobsReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(JobSearch));
