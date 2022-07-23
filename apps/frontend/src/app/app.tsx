// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import SideNav from './components/side-nav/side-nav';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// Pages
import TestPage1 from './pages/testPage1';
import TestPage2 from './pages/testPage2';

export function App() {
  return (
    <div className="outerContainer">
      <SideNav username={'Amarabandu Rupasingheeeee'} userNum={0} />
      <div className="header">Header goes here</div>
      <div className="content">
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/page1" element={<TestPage1 />} />
          <Route path="/page2" element={<TestPage2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
