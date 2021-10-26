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

function App() {
    return (
        <Layout className="main-layout">
            <Switch>
                <Route exact path={ ROUTES.ROOT } component={ RewardNumberPage } />
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
<<<<<<< HEAD
                <PrivateRoute
                    exact
                    path={ ROUTES.TRANSACTION_HISTORY_DETAILS }
                    component={ TransactionHistoryDetails }
=======
                <Route exact
                    path={ ROUTES.LANDING_PAGE }
                    component={ LandingPage }
>>>>>>> 2450a04... working transaction details screen
                />
            </Switch>
        </Layout>

    );
}

export default withRouter(App);
