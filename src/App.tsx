import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'

import Layout from 'containers/Layout/Layout';

import PatientsList from 'components/PatientsList/PatientsList';


function App() {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} component={PatientsList}/> 
        </Switch>
      </Layout>
    </HashRouter>
  );
}

export default App;
