import React from 'react';
import { connect } from 'react-redux';

import { fetchDefaultView, changeDropComponent, incrementIndex } from "../../actions/codeActions"

import ReduxView from './reduxView';
import ComponentView from './componentView';
import componentData from '../dragItems';

@connect((store) => {
  return {
    view: store.code.view,
    index: store.code.index,
  };
})
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDefault:
        {
          code: null,
          componentView: (
            <div className="col s12">
              <ComponentView handleDroppedComponent={this.handleDroppedComponent.bind(this)} />
            </div>),
          isDropped: false,
        },
    };
  }

  componentDidMount() {
    if (this.props.view.length === 0) {
      this.props.dispatch(fetchDefaultView(this.state.viewDefault));
    }
  }

  handleDroppedComponent(componentKey) {
    var key = componentKey.component;
    this.props.view[this.props.index] = Object.assign({}, this.props.view[this.props.index], {isDropped: true, code: componentData[key]});
    this.props.view[this.props.index + 1] = this.state.viewDefault;
    this.props.dispatch(changeDropComponent(this.props.view));
    this.props.dispatch(incrementIndex(this.props.index + 1));
  }

  render() {
    const { view } = this.props;

    return (
      <article className="center-content">
        <h1>{this.props.index}</h1>
        {view.map((item, index) =>
          <div className="row" key={index}>
            {!item.isDropped ?
              item.componentView :
              item.code
            }
          </div>
        )}
        <ReduxView />
      </article>
    );
  }
}

export default View;
