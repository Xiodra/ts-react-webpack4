import * as React from 'react'
import Loadable from 'react-loadable'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import PageLoading from './../components/PageLoading'
import Error from './../components/Error'

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ './../views/Home'),
    loading: PageLoading
})
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ './../views/Login'),
    loading: PageLoading
})

// 权限控制
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            true ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
)

const AppRouter = () => (
    <Router>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route component={Error} />
        </Switch>
    </Router>
)

export default AppRouter
