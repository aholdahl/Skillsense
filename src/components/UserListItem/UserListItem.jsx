import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import MessageDialog from '../MessageDialog/MessageDialog';

const styles = theme => ({
    root: {
        display: 'flexbox',
        flexDirection: 'column'
    },
    listItem: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        padding: '20px 20px 10px'
    },
    button: {
        margin: theme.spacing(1),
    }
});

class UserListItem extends Component {
    viewDetails = () => {
        //this dispatch for clients viewing student applications
        if (this.props.user.user_type === 'Client') {
            this.props.history.push(`/jobs/detail/applicant/${this.props.listUser.id}`);
            this.props.dispatch({
                type: 'FETCH_APPLICATION',
                //payload is job_applicant id
                payload: this.props.listUser.id
            });
        } else {
            //dispatch for any other user details
            this.props.dispatch({
                type: 'FETCH_SELECTED_USER',
                payload: this.props.listUser.id
            });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid
                container>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    align="top"
                    className={classes.listItem}>

                    {/* left side info */}
                    <Grid item xs={8} sm={12} md={8}>
                        <Typography variant="h5" color="primary">
                            {this.props.listUser.username}
                        </Typography>
                        <Typography variant="h6" color="secondary">
                            {this.props.listUser.focus_skill}
                        </Typography>
                        {this.props.hired && (<Typography variant="button" color="primary">
                            (Hired)
                    </Typography>)}
                    </Grid>

                    {/* right side info */}
                    <Grid item xs={4} sm={12} md={4} align="right">
                        {this.props.hired && (
                            <MessageDialog recipient={{
                                id: this.props.listUser.student_id,
                                username: this.props.listUser.username
                            }}
                            />)}
                        <Button
                            variant="contained"
                            color={this.props.hired ? 'secondary' : 'primary'}
                            className={classes.button}
                            onClick={() => this.viewDetails()}>
                            Details
                    </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(UserListItem)));
