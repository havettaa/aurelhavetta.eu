window.state = "initial state";

export function getState() {
  return window.state;
}
export function setState(newState) {
  window.state = newState;
}