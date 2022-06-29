import './App.css';
import Layout from './components/Layout'
import { Route, Switch } from 'react-router-dom'
import Medicine from './container/Medicine';
import Patient from './container/Patient';


function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path='/medicine' exact component={Medicine} />
          <Route path='/patient' exact component={Patient} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
