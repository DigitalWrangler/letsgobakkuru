const path = require("path");

const loginXhtmlPath = path.join(
  __dirname,
  "../public/screens/login/login.xhtml",
);
const userVisitsXhtmlPath = path.join(
  __dirname,
  "../public/screens/user_visits/user_visits.xhtml",
);
const dashboardXhtmlPath = path.join(
  __dirname,
  "../public/screens/dashboard/dashboard.xhtml",
);
const collectionXhtmlPath = path.join(
  __dirname,
  "../public/screens/collection/collection.xhtml",
);

module.exports = {
  loginXhtmlPath,
  userVisitsXhtmlPath,
  dashboardXhtmlPath,
  collectionXhtmlPath,
};
