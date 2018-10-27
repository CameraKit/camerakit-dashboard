/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import AuthService from '/utils/auth';
import Router from 'next/router';

const Auth = new AuthService();
const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Register extends React.Component {
  state = {
    open: false,
    status: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
  };

  register = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, company } = this.state;
    Auth.register({ email, password, firstName, lastName, company }).then((user) => {
      if (!user) {
        this.setState({ error: 'Could not register.' });
      } else {
        Auth.login(this.state.email, this.state.password).then(({ error }) => {
          if (error) {
            Router.push('/login');
          } else {
            Router.push('/dashboard');
          }
        }).catch((error, other) => {
          this.setState({ error: error.message });
        });
      }
    }).catch(error => {
      console.log(error);
      this.setState({ error: error.message });
    });
  }

  render() {
    const { classes } = this.props;
    const { status, error } = this.state;

    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.register}>
              <Typography variant="h4" >
                Register an account
              </Typography>
              <FormControl margin="normal">
                <TextField
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type='email'
                  label='Email address'
                  autoComplete='username'
                  required
                />
              </FormControl>
              < br/>
              <FormControl margin="normal">
                <TextField
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  type='password'
                  label='Password'
                  autoComplete='current-password'
                  required
                />
              </FormControl>
              < br/>
              <FormControl margin="normal">
                <TextField
                  value={this.state.firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                  type='text'
                  label='First name'
                />
              </FormControl>
              < br/>
              <FormControl margin="normal">
                <TextField
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  type='text'
                  label='Last name'
                />
              </FormControl>
              < br/>
              <FormControl margin="normal">
                <TextField
                  value={this.state.company}
                  onChange={e => this.setState({ company: e.target.value })}
                  type='text'
                  label='Company'
                />
              </FormControl>
              < br/>
              <Button color="primary" type="submit">
                Register
              </Button>
              <Typography gutterBottom>
                <span>{status}</span>
                <span>{error}</span>
              </Typography>
            </form>
      </div>
    );
  }
}

export default withStyles(styles)(Register);