import React from 'react';
import { Switch, Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { AuthProvider, useAuth } from './hooks/useAuth';

import LandingPage from './pages/landing/landing.component';
import LoginPage from './pages/login/login.component';
import SignUpPage from './pages/signup/signup.component';
import HomePage from './pages/home/home.component';
import AccountPage from './pages/account/account.component';
import OrdersPage from './pages/orders/orders.component';
import ProductsPage from './pages/products/products.component';
import NoMatchPage from './pages/404/404.component';

import Spinner from './components/spinner/spinner.component';
import AdminLayout from './components/admin/admin.component';
import NavbarBurger from './components/navbar-burger/navbar-burger.component';
import Sidebar from './components/sidebar/sidebar.component';

import './App.scss';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const { currentUser, isLoading, signOut } = useAuth();
  const history = useHistory();

  if (isLoading) {
    return <Spinner />;
  }

  const onLogout = async () => {
    await signOut();
    history.push('/login');
  };

  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" render={() => (currentUser ? <Redirect to="/admin" /> : <LoginPage />)} />
      <Route exact path="/signup" render={() => (currentUser ? <Redirect to="/admin" /> : <SignUpPage />)} />
      <Route
        path="/logout"
        render={() => {
          onLogout();
        }}
      />
      <Route path="/admin" render={() => (currentUser ? <AdminRoutes /> : <Redirect to="/login" />)} />
      <Route path="/404" component={NoMatchPage} />
      <Redirect to="/404" />
    </Switch>
  );
};

const AdminRoutes = () => {
  let match = useRouteMatch();

  return (
    <AdminLayout>
      <NavbarBurger />
      <Sidebar />
      <Switch>
        <Route exact path={`${match.path}`} component={HomePage} />
        <Route exact path={`${match.path}/account`} component={AccountPage} />
        <Route path={`${match.path}/orders`} component={OrdersPage} />
        <Route path={`${match.path}/products`} component={ProductsPage} />
        <Redirect to="/404" />
      </Switch>
    </AdminLayout>
  );
};

export default App;
