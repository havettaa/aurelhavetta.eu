let state = "initial val";

export const store = { objState: state, obj: { refState: state } };

export function getState() {
  console.warn(`getState: ${state}`)
  return state;
}
export function setState(newState) {
  state = newState;
  console.error(`setState: ${state}`)
}