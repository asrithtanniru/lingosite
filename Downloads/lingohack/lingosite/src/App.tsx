import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { DashboardPage } from './pages/DashboardPage';
import { SiteEditorPage } from './pages/SiteEditorPage';
import { SettingsPage } from './pages/SettingsPage';
import { DocsPage } from './pages/DocsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
        <Route path="/dashboard/sites" element={<DashboardPage />} />
        <Route path="/dashboard/sites/:siteId/edit" element={<SiteEditorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
