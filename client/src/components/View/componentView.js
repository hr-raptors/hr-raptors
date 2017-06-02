import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

const squareTarget = {
  drop(props, monitor) {
    const componentKey = monitor.getItem();
    console.log(componentKey);
    console.log('DROPPED', props);
    props.handleDroppedComponent(componentKey);
    return componentKey;
  }
};

let collect = function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

class ComponentView extends React.Component {
  renderOverlay(color) {
    return (
      <div style={{
        height: '1.5em',
        width: '100%',
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>
        {isOver && this.renderOverlay('red')}
        {!isOver && this.renderOverlay('blue')}
      </div>
    );
  }
}
export default DropTarget(ItemTypes.COMPONENT, squareTarget, collect)(ComponentView);
