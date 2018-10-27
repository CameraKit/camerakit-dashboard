import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from '../components/layout/mainLayout';
import Sponsor from '../components/view/sponsor';
import withAuth from '../utils/withAuth';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Sponsorship extends React.Component {
  render() {
    const { authenticated } = this.props;
    return (
      <MainLayout view="Sponsorship">
        <Sponsor authenticated={authenticated} />
      </MainLayout>
    );
  }
}

export default withStyles(styles)(withAuth(Sponsorship));
