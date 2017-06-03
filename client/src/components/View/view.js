import React from 'react';
import { connect } from "react-redux"
import { fetchUser } from "../../actions/userActions"
import { clearCode } from "../../actions/codeActions"

import ReduxView from './reduxView';
import DropTarget from './dropTarget';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
  };
})
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: null,
      componentID: 0,
      dropTarget: (
        <div className="col s12">
          <DropTarget handleDroppedComponent={this.handleDroppedComponent.bind(this)} />
        </div>),
      isDropped: false,
      dropTop: false,
    };
    this.handleDroppedComponent = this.handleDroppedComponent.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }

  handleDroppedComponent(droppedInItem) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
      dropTop: false,
    });
  }

  handleDroppedComponentTop(droppedInItem) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
      dropTop: true,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <article className="center-content">
        <h1>{user.name} <small>{user.age}</small></h1>
        <button onClick={this.clearCodeClick.bind(this)}>clear code</button>

        <DropTarget handleDrop={this.handleDroppedComponentTop.bind(this)}/>
        <ReduxView componentState={this.state} />
        <DropTarget handleDrop={this.handleDroppedComponent.bind(this)}/>

      </article>
    );
  }
}

export default View;
