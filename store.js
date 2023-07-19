let _objState = { myString: "str"};
let _mylist = [];
let _mytext = "";
let state = { mylist: _mylist, mytext: _mytext, objState: _objState, obj: { refState: _objState } };

export const store = state;

export function getStateText() {
  console.info(`getState: ${JSON.stringify(state)}`)
  return state.mytext;
}
export function setStateText(newState) {
  state.mytext = newState;
  _objState.myString = newState;

  console.warn(`setState: ${JSON.stringify(state)}`)
}