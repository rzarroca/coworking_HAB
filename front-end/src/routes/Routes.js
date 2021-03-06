import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import NoMatch from '../pages/NoMatch/NoMatch';
import CircularSuspense from '../components/CircularSuspense/CircularSuspense';

const Home = lazy(() => import('../pages/Home/Home'));

const User = lazy(() => import('../pages/User/User'));
const UserRegistration = lazy(() =>
    import('../pages/UserRegistration/UserRegistration')
);
const MyCoworking = lazy(() => import('../pages/MyCoworking/MyCoworking'));

const Admin = lazy(() => import('../pages/Admin/Admin'));
const AdminRegistration = lazy(() =>
    import('../pages/AdminRegistration/AdminRegistration')
);
const MyCenter = lazy(() => import('../pages/MyCenter/MyCenter'));

const Space = lazy(() => import('../pages/Space/Space'));
const SearchSpaces = lazy(() => import('../pages/SearchSpace/SearchSpace'));

const Center = lazy(() => import('../pages/Center/Center'));
const SearchCenter = lazy(() => import('../pages/SearchCenter/SearchCenter'));

const routes = [
    {
        path: '/',
        Page: Home,
        typeRequired: '',
    },
    {
        path: '/users/register',
        Page: UserRegistration,
        typeRequired: '',
    },
    {
        path: '/users',
        Page: User,
        typeRequired: 'usuario',
    },
    {
        path: '/mycoworking',
        Page: MyCoworking,
        typeRequired: 'usuario',
    },
    {
        path: '/admins/register',
        Page: AdminRegistration,
        typeRequired: '',
    },
    {
        path: '/admins',
        Page: Admin,
        typeRequired: 'administrador',
    },
    {
        path: '/mycenter/',
        Page: MyCenter,
        typeRequired: 'administrador',
    },
    {
        path: '/search/space',
        Page: SearchSpaces,
        typeRequired: '',
    },
    {
        path: '/space/:spaceId',
        Page: Space,
        typeRequired: '',
    },
    {
        path: '/search/center',
        Page: SearchCenter,
        typeRequired: '',
    },
    {
        path: '/center/:centerId',
        Page: Center,
        typeRequired: '',
    },
];

export default function Routes() {
    return (
        <Switch>
            {routes.map((route) => {
                if (route.typeRequired === '') {
                    return (
                        <Route exact path={route.path} key={route.path}>
                            <CircularSuspense className="mainSection">
                                <route.Page className="mainSection" />
                            </CircularSuspense>
                        </Route>
                    );
                } else {
                    return (
                        <PrivateRoute
                            path={route.path}
                            key={route.path}
                            typeRequired={route.typeRequired}
                        >
                            <CircularSuspense className="mainSection">
                                <route.Page className="mainSection" />
                            </CircularSuspense>
                        </PrivateRoute>
                    );
                }
            })}
            <Route>
                <NoMatch className="mainSection" />
            </Route>
        </Switch>
    );
}
