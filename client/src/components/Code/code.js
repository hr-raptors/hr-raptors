import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"

@connect((store) => {
  return {
    code: store.code.code,
  };
})

class Code extends React.Component {

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {
    const { code } = this.props;

    var count = 0;
    const mappedCode = code.map((code, key) =>
      <div key={key} className="codepart">
        {count++} {ReactDOMServer.renderToStaticMarkup(<div>{code.text}</div>)}
      </div>
    );

    return (
      <article className="center-content">
        <div className="scrollbar" id="style-1">
          {mappedCode}
        </div>
      </article>
    )
  }
}

export default Code;
