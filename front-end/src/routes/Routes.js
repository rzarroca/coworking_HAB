import { lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import NoMatch from '../pages/NoMatch/NoMatch';

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
        <>
            {routes.map((route) => {
                if (route.typeRequired === '') {
                    return (
                        <Route exact path={route.path} key={route.path}>
                                <route.Page className="mainSection" />
                        </Route>
                    );
                } else {
                    return (
                        <PrivateRoute
                            path={route.path}
                            key={route.path}
                            typeRequired={route.typeRequired}
                        >
                                <route.Page className="mainSection" />
                        </PrivateRoute>
                    );
                }
            })}
            <Route exact path='/404'>
                <NoMatch className="mainSection" />
            </Route>
            <Redirect from='*' to="/404" />
        </>
    );
}
