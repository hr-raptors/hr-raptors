import React from 'react';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
        <div className="left">
        <h1>Side Bar</h1>
        </div>
      </div>
    );
  }
}

export default SideBar;
