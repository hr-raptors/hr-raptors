import React from 'react';
import { connect } from 'react-redux';
import { addCode, addCodeTop } from '../../actions/codeActions';
import dragItems from '../dragItems.js';


const styles = {
  bottomUp: {
    margin: '-2% 0',
  },
};

@connect((store) => {
  return {
    components: store.code.components,
  };
})
class reduxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentState.componentID !== this.props.componentState.componentID) {
      nextProps.componentState.dropTop ? this.props.dispatch(addCodeTop(nextProps.componentState.componentID, dragItems[nextProps.componentState.componentName], nextProps.componentState.isDropped, nextProps.componentState.dropTarget)) :
      this.props.dispatch(addCode(nextProps.componentState.componentID, dragItems[nextProps.componentState.componentName], nextProps.componentState.isDropped, nextProps.componentState.dropTarget));
    }
  }

  render() {
    const { components } = this.props;
    const mappedCode = components.map((code, key) => <li key={key}>{code.componentCode}</li>);

    return (
      <div style={styles.bottomUp}>
        <ul>{mappedCode}</ul>
      </div>
    );
  }
}

export default reduxView;
