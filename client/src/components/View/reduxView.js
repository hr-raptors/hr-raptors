import React from "react"
import { connect } from "react-redux"
import ReactDOMServer from 'react-dom/server';
import { fetchUser } from "../../actions/userActions"
import { fetchCode, addCode, clearCode } from "../../actions/codeActions"
import dragItems from '../dragItems.js'
import componentView from './componentView';


@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    code: store.code.code,
  };
})
class reduxView extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser());
  }
  //###################### HTML CODE VIEW ############
  componentWillReceiveProps(newProps) {
    console.log('ID', newProps.newComponentID)
    if (newProps.newComponentID !== this.props.newComponentID) {  
      this.props.dispatch(addCode(newProps.newComponentID, dragItems[newProps.newComponentName]));
    }
  }  
  //###################### HTML CODE VIEW ############

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  addCodeClick() {
    this.props.dispatch(addCode('3', 'hello'));
  }

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }


  render() {
    const { user, code } = this.props;
    // user = this.props.user;
    // code = this.props.code
    if (!code.length) {
      return (
        <div>
          <h1>{user.name} <small>{user.age}</small></h1>
          <button onClick={this.fetchCode.bind(this)}>load code</button>
        </div>
      );
    }

    const mappedCode = code.map((code, key) => <li key={key}>{code.text}</li>);

    return (
      <div>
        <h1>{user.name} <small>{user.age}</small></h1>
        <button onClick={this.addCodeClick.bind(this)}>add button</button>
        <button onClick={this.clearCodeClick.bind(this)}>clear code</button>
        <div>{componentView}</div>
        <componentView />
        <ul>{mappedCode}</ul>
      </div>
    );
  }
}

export default reduxView;
