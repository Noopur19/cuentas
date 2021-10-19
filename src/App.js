import React from 'react'
import { Switch, Route,withRouter } from 'react-router-dom';
import { ROUTES } from 'constants/AppRoutes'
import RewardNumberPage from 'components/rewards/RewardNumber'
import { Layout } from 'components/shared/Layout'
function App() {
    return (
        <Layout className="main-layout">
            <Switch>
                <Route exact path={ ROUTES.ROOT } component={ RewardNumberPage } />
            </Switch>
        </Layout>
    );
}

export default withRouter(App);
