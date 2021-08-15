import React from 'react';
import './tailwind.output.css';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { StudyLoginScreen } from './pages/study-login';
import { AuthCompleteScreen } from './pages/auth-complete';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <StudyLoginScreen />
        </Route>
        <Route path="/auth/fitbit">
          <AuthCompleteScreen />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
