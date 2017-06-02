import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"

@connect((store) => {
  return {
    code: store.code.code,
    view: store.code.view,
  };
})
class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {
    const { view } = this.props;

    const mappedCode = view.map((code, index) =>
      <div key={index} className="codepart">
        {ReactDOMServer.renderToStaticMarkup(<div>{code.code}</div>)}
      </div>
    );

    return (
      <article className="center-content">
        <h1>Materialize Studio</h1>
        <h2>Your project code goes here</h2>
        <div className="scrollbar" id="style-1">
          {mappedCode}
        </div>
      </article>
    )
  }
}

export default Code;
