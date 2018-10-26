import React from 'react';

import MainLayout from '../components/layout/mainLayout';
import ComingSoon from '../components/view/comingsoon';

import withAuth from '../utils/withAuth';

class Dashboard extends React.Component {
  render() {
    return (
      <MainLayout view="Dashboard">
        <ComingSoon />
      </MainLayout>
    );
  }
}

export default withAuth(Dashboard);
