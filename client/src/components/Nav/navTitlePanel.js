import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  },
  header: {
    backgroundColor: '#03a9f4',
    color: 'white',
    padding: '2.5vh',
    fontSize: '1.5em',
    width: '100%',
    zIndex: '99',
  },
};

const NavTitlePanel = (props) => {
  const rootStyle = Object.assign({}, styles.root, props.style);
  const headerStyle = props.style ? styles.header : Object.assign({}, styles.header, {position: 'fixed'});

  return (
    <div style={rootStyle}>
      <div style={headerStyle}>{props.title}</div>
    </div>
  );
};

NavTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default NavTitlePanel;
