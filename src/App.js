import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ROUTES } from 'constants/AppRoutes';
import RewardNumberPage from 'components/rewards/RewardNumber';
import ProtectForm from 'components/rewards/ProtectForm';
import { PrivateRoute } from 'components/hoc/PrivateRoute';
import { Layout } from 'components/shared/Layout';
import mainTheme from 'theme/mainTheme'
function App() {
    return (
        <ThemeProvider theme={ mainTheme } >
            <Layout className="main-layout">
                <Switch>
                    <Route exact path={ ROUTES.ROOT } component={ RewardNumberPage } />
                    <PrivateRoute
                        exact
                        path={ ROUTES.PROTECT_FORM }
                        component={ ProtectForm }
                    />
                </Switch>
            </Layout>
        </ThemeProvider>
    );
}

export default withRouter(App);
