import './App.css';
import Layout from './components/Layout'
import { Route, Switch } from 'react-router-dom'
import Medicine from './container/Medicine';
import Patient from './container/Patient';
import Doctor from './container/Doctor';


function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path='/medicine' exact component={Medicine} />
          <Route path='/patient' exact component={Patient} />
          <Route path='/doctor' exact component={Doctor} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
