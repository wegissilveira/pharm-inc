import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from 'containers/Layout/Layout';

import PatientsList from 'components/PatientsList/PatientsList';
// import PatientsModal from 'components/PatientModal/PatientModal';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route 
            path={`${process.env.PUBLIC_URL}/`} 
            component={PatientsList}/> 
          {/* <Route path={`${process.env.PUBLIC_URL}/patient/:id`} component={PatientsModal} />  */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
