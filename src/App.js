import React from 'react'
import { Switch, Route,withRouter } from 'react-router-dom';
import { ROUTES } from 'constants/AppRoutes'
import RewardNumberPage from 'components/rewards/RewardNumber'
import ProtectForm from 'components/rewards/ProtectForm'
import { PrivateRoute } from 'components/hoc/PrivateRoute'
import { Layout } from 'components/shared/Layout'
function App() {
    return (
        <Layout className="main-layout">
            <Switch>
                <Route exact path={ ROUTES.ROOT } component={ RewardNumberPage } />
                <PrivateRoute exact path={ ROUTES.PROTECT_FORM } component={ ProtectForm } />

            </Switch>
        </Layout>
    );
}

export default withRouter(App);
