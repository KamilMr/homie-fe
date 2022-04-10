import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import Clients from './components/Clients';
import TabNavigation from './components/TabNavigation';

const MainAppFrame = ({component}) => (
  <div style={styles.mainAppFrame}>
    <AppBar />
    <div style={styles.insideFrame}>{component}</div>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/*"
        element={<MainAppFrame component={<TabNavigation />} />}
      />
    </Routes>
  </Router>
);

const styles = {
  mainAppFrame: {
    minHeight: '100vh',
  },
  insideFrame: {
    maxWidth: 1000,
    margin: 'auto',
    padding: 12,
  },
};

export default App;
