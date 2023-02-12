import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from 'containers/Layout/Layout'

import PatientsList from 'components/PatientsList/PatientsList'


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} component={PatientsList}/> 
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
