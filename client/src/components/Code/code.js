import React from 'react';

import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"

import CodeBoilerPlate from './codeBoilerPlate'

@connect((store) => {
  return {
    components: store.code.components,
  };
})
class Code extends React.Component {

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {

    const { components } = this.props;

    const mappedCode = components.map((code, index) =>
      <div key={index} className="codepart">
        {code.componentCode}
      </div>
    );

    return (
       <article className="center-content code-view">
        <div className="code-view display-linebreak" >
          <CodeBoilerPlate code={mappedCode} />
        </div>
      </article>
    )
  }
}

export default Code;
