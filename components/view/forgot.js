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
  };

  reset = (e) => {
    e.preventDefault();
    this.state.status = 'Reset link sent';
  }

  render() {
    const { classes } = this.props;
    const { error, status } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4">
          Reset password
        </Typography>
        <form onSubmit={this.reset}>
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
          <br/>
          <Button type="submit" color="primary">
            Send reset link
          </Button>
        </form>
        <Typography gutterBottom>
          <span>{status}</span>
          <span>{error}</span>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Login);