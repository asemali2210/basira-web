import auth from "./auth.json";
import common from "./common.json";
import home from "./home.json";
import sidebar from "./sidebar.json";
import dashboard from "./dashboard.json";

export default {
  auth,
  common,
  home,
  sidebar,
  ...dashboard,
};
