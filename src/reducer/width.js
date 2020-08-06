const { RESIZE_WINDOW } = require('../actions');

const initialState = { width: window.innerWidth };

export default function width(state = initialState, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return {
        width: action.width,
      };
    default:
      return state;
  }
}
