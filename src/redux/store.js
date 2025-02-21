import { legacy_createStore as createStore } from "redux";
import { reducer } from "./reducer";
const myStore = createStore(reducer);
export default myStore;
