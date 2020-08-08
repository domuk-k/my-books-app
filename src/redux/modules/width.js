const RESIZE_WINDOW = 'RESIZE_WINDOW';

export const resize = width => ({ type: RESIZE_WINDOW, width });

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
