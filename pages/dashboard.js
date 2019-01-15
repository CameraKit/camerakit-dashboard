import React from 'react';

import MainLayout from '../components/layout/mainLayout';
import KeyTest from '../components/view/keytest';

import withAuth from '../utils/withAuth';

class Dashboard extends React.Component {
  render() {
    return (
      <MainLayout view="Dashboard">
        <KeyTest />
      </MainLayout>
    );
  }
}

export default withAuth(Dashboard);
