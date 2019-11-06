import store from "../../store";
import { FetchUser } from "../../actions/getUserAction";
window.store = store;
window.GetUser = FetchUser;