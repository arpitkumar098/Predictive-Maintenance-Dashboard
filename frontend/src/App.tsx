// src/App.tsx
import { Route, Switch } from "wouter";
import Layout from "./components/layouts/Layout";
import DashboardPage from "./pages/Dashboard";
import MachinesPage from "./pages/Machines";
import AlertsPage from "./pages/Alerts";
import MaintenancePage from "./pages/Maintenance";
import PredictionsPage from "./pages/Predictions";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import HelpCenterPage from "./pages/HelpCenter";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/machines" component={MachinesPage} />
        <Route path="/alerts" component={AlertsPage} />
        <Route path="/maintenance" component={MaintenancePage} />
        <Route path="/predictions" component={PredictionsPage} />
        <Route path="/reports" component={ReportsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/help" component={HelpCenterPage} />
      </Switch>
    </Layout>
  );
}

export default App;