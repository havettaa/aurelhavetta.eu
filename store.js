let _notificationCallbacks = [];

let _objState = { myString: "InitialValue"};
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

  _notificationCallbacks.forEach(func => window.requestAnimationFrame(func));
}


export function storeAddNotificationFunc(func) {
  console.info(`storeAddNotificationFunc`);
  _notificationCallbacks.push(func);
}
