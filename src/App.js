import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ROUTES } from 'constants/AppRoutes';
import RewardNumberPage from 'components/rewards/RewardNumber';
import ProtectForm from 'components/rewards/ProtectForm';
import { PrivateRoute } from 'components/hoc/PrivateRoute';
import { Layout } from 'components/shared/Layout';
import RewardsStep from 'components/rewards';
import LandingPage  from 'components/landingPage';
import TransactionHistory from 'components/transactionDetails/transactionHistory';
import TransactionHistoryDetails from 'components/transactionDetails/transactionHistory/view';
import ErrorPage from 'components/ErrorPage'
import Success from 'components/success/index';

function App() {
    return (
        <Layout className="main-layout">
            <Switch>
                <PrivateRoute exact path={ ROUTES.ROOT } component={ RewardNumberPage } />
                <PrivateRoute
                    exact
                    path={ ROUTES.PROTECT_FORM }
                    component={ ProtectForm }
                />
                <PrivateRoute
                    exact
                    path={ ROUTES.RECEIVER_DETAILS }
                    component={ RewardsStep }
                />
                <PrivateRoute
                    exact
                    path={ ROUTES.TRANSACTION_HISTORY }
                    component={ TransactionHistory }
                />
                <PrivateRoute
                    exact
                    path={ ROUTES.TRANSACTION_HISTORY_DETAILS }
                    component={ TransactionHistoryDetails }
                />
                <Route exact
                    path={ ROUTES.LANDING_PAGE }
                    component={ LandingPage }
                />
                <PrivateRoute exact
                    path={ ROUTES.SUCCESS_PAGE }
                    component={ Success }
                />
                <Route exact
                    path={ ROUTES.ERROR_PAGE }
                    component={ ErrorPage }
                />
            </Switch>
        </Layout>

    );
}

export default withRouter(App);
