import React from 'react';

const topbarStyle = {
  height: '50px',
  backgroundColor: '#eee',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '2em',
};

class Topbar extends React.Component {
  render() {
    const { view } = this.props;
    return (
      <div style={topbarStyle}>
        <span style={titleStyle}>{view}</span>
      </div>
    );
  }
}

export default Topbar;
