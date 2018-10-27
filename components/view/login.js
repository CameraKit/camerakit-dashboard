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

class Login extends React.Component {
  state = {
    open: false,
    status: '',
    email: '',
    password: '',
  };

  login = (e) => {
    e.preventDefault();
    Auth.login(this.state.email, this.state.password).then(({ error }) => {
      if (error) {
        this.setState({ error });
      } else {
        Router.push('/dashboard');
      }
    }).catch(error => {
      this.setState({ error: error.message });
    });
  }

  register = () => {
    Router.push('/register');
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4">
          Log in to your account
        </Typography>
        <form onSubmit={this.login}>
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
          < br />
          <FormControl>
            <TextField
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              type='password'
              label='Password'
              autoComplete='current-password'
              required
            />
          </FormControl>
          <Typography>
            <Link href="/forgot">
              <a>Forgot password?</a>
            </Link>
          </Typography>
          <Button color="primary" onClick={this.register}>
            Register
          </Button>
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
        <Typography gutterBottom>
          <span>{error}</span>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Login);