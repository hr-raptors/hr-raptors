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
  addCode: (id, componentCode, isDropped, dropTarget) => {
    return {
      type: 'ADD_CODE',
      payload: {
        id,
        componentCode,
        isDropped,
        dropTarget,
      },
    };
  },
  addCodeTop: (id, componentCode, isDropped, dropTarget) => {
    return {
      type: 'ADD_CODE_TOP',
      payload: {
        id,
        componentCode,
        isDropped,
        dropTarget,
      },
    };
  },
  clearCode: () => {
    return {
      type: 'CLEAR_CODE',
      payload: {},
    };
  },
};
