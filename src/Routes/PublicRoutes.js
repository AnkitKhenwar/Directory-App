import { HOME, USER_DETAIL } from "./Routes";
import Directory from "../View/Directory/Directory";
import UserDetail from "../View/UserDetail/UserDetail";

export const publicRoute = [
  {
    path: HOME,
    component: <Directory />,
  },
  {
    path: USER_DETAIL,
    component: <UserDetail />,
  },
];
