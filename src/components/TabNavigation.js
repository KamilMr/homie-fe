import {
  Link,
  Navigate,
  Route,
  Routes,
  matchPath,
  useLocation,
} from 'react-router-dom';

import {Tab, Tabs} from '@mui/material';

// import {theme} from '../helpers/theme';
import Home from './Home';
import Clients from './Clients';

// Now it works only for patterns with /:pattern/ but not with /sth:pattern/
const pathSwapper = (from, to, pathname) => {
  const res = matchPath(from, pathname);
  if (!res) return res;

  const {params} = res;
  let toPath = to;
  let editedEnd = false;

  if (toPath.slice(-1) !== '/') {
    editedEnd = true;
    toPath += '/';
  }

  for (const key in params) {
    const parts = toPath.split(`/:${key}/`);
    toPath = parts.join(`/${params[key]}/`);
  }

  if (editedEnd) {
    toPath = toPath.slice(0, -1);
  }

  return toPath;
};

const Redirect = ({from, to, ...props}) => {
  const {pathname} = useLocation();
  return <Navigate to={pathSwapper(from, to, pathname)} {...props} />;
};

const allViews = [
  {path: '/home', view: <Home />},
  {path: '/clients', view: <Clients />},
  // {path: '/docs', view: <Docs />},
  // {path: '/transactions', view: <Transactions />},
  // {path: '/transactions/log/:id/:step', view: <Log />},
];

const createTabs = arr => {
  const tR = [];
  arr.forEach(v => {
    const name = v.path.split('/')[1];
    if (!tR.includes(name)) tR.push(name);
  });
  return tR;
};

const TabNavigation = () => {
  const {pathname} = useLocation();
  const tabs = createTabs(allViews);
  const currValue = pathname.split('/')[1] || 'home';

  return (
    <div style={{marginTop: 20}}>
      <div style={styles.centered}>
        <Tabs
          value={tabs.includes(currValue) && currValue}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          style={styles.tabs}
        >
          {tabs.map(tab => (
            <Tab
              key={tab}
              label={tab}
              value={tab}
              component={Link}
              to={`/${tab}`}
            />
          ))}
        </Tabs>
      </div>
      <Routes>
        {allViews.map(v => (
          <Route key={v.path} path={v.path} element={v.view} />
        ))}
        <Route path="*" element={<Navigate to="/home" />} />
        <Route
          path="/transactions/log/"
          element={<Navigate to="/transactions/log/new" />}
        />
        <Route
          path="/transactions/log/:id/"
          element={
            <Redirect
              from="/transactions/log/:id/"
              to="/transactions/log/:id/step2"
            />
          }
        />
      </Routes>
    </div>
  );
};

const styles = {
  centered: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  tabs: {
    marginBottom: 12,
    width: 'min-content',
  },
};

export default TabNavigation;
