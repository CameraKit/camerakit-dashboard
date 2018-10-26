import React from 'react';
import MainLayout from '../components/layout/mainLayout';
import ComingSoon from '../components/view/comingsoon';

import withAuth from '../utils/withAuth';

class Settings extends React.Component {
  render() {
    return (
      <MainLayout view="Settings">
        <ComingSoon />
      </MainLayout>
    );
  }
}

export default withAuth(Settings);
