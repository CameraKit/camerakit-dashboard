import React from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';

const layoutStyle = {
  display: 'flex',
  padding: '0px',
  margin: '0px',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
};

const wrapperStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
};

const contentStyle = {
  height: '100%',
};

const MainLayout = ({ view, children }) => (
  <div style={layoutStyle}>
    <Sidebar />
    <div style={wrapperStyle}>
      <Topbar view={view} />
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  </div>
);

export default MainLayout;
