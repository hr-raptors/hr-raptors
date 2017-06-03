import axios from 'axios';

module.exports = {
  fetchCode: () => {
    return function(dispatch) {
      dispatch({type: 'FETCH_CODE'});

      axios.get('http://127.0.0.1:3000/api/code')
      .then((response) => {
        console.log(response.data);
        dispatch({type: 'FETCH_CODE_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'FETCH_CODE_REJECTED', payload: err});
      });
    };
  },
  addCode: (id, text) => {
    return {
      type: 'ADD_CODE',
      payload: {
        id,
        text
      },
    };
  },
  clearCode: () => {
    return {
      type: 'CLEAR_CODE',
      payload: {},
    };
  },
  fetchDefaultView: (view) => {
    return {
      type: 'FETCH_DEFAULT_VIEW',
      payload: { view },
    };
  },
  updateAll: (all) => {
    return {
      type: 'UPDATE_ALL',
      payload: { all }
    };
  },
  changeDropComponent: (view, index) => {
    return {
      type: 'CHANGE_DROP_COMPONENT',
      payload: { view, index },
    };
  },
  incrementIndex: (index) => {
    return {
      type: 'INCREMENT_INDEX',
      payload: { index },
    };
  },

};
