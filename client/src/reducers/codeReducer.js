import React from 'react';

export default function reducer(state = {
  components: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
  case 'FETCH_CODE': {
    return Object.assign({}, state, {fetching: true});
  }
  case 'FETCH_CODE_REJECTED': {
    return Object.assign({}, state, {fetching: false, error: action.payload});
  }
  case 'FETCH_CODE_FULFILLED': {
    return Object.assign({}, state, {fetching: false, fetched: true, code: action.payload});
  }
  case 'ADD_CODE': {
    return Object.assign({}, state, {components: state.components.concat(action.payload)});
  }
  case 'ADD_CODE_TOP': {
    return Object.assign({}, state, {components: [action.payload].concat(state.components)});
  }
  case 'CLEAR_CODE': {
    return Object.assign({}, state, {components: [] });
  }
  }

  return state;
}
