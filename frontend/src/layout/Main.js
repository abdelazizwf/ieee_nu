import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import History from './History';
import Staff from './Staff';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetFPassword from './ResetFPassword';
import * as authActions from '../redux/actions/auth';
import * as productsActions from '../redux/actions/products';
import * as cartsActions from '../redux/actions/carts';
import * as ordersActions from '../redux/actions/orders';
import * as historyActions from '../redux/actions/history';
import * as categoriesActions from '../redux/actions/categories';


const mapStateToProps = (state) => ({
    authState: state.authState,
    productState: state.productState,
    orderState: state.orderState,
    categoryState: state.categoryState,
    cartState: state.cartState,
    historyState: state.historyState
});

const mapDispatchToProps = (dispatch) => ({
    register: (credentials) => { dispatch(authActions.register(credentials)); },
    login: (credentials) => { dispatch(authActions.login(credentials)); },
    logout: () => { dispatch(authActions.logout()); },
    getCategories: () => { dispatch(categoriesActions.getCategories()); },
    getProducts: (qParams = {}) => { dispatch(productsActions.getProducts(qParams)); },
    getOrders: () => { dispatch(ordersActions.getOrders()); },
    placeOrder: () => { dispatch(ordersActions.placeOrder()); },
    getHistory: () => { dispatch(historyActions.getHistory()); },
    getCarts: () => { dispatch(cartsActions.getCarts()); },
    addCart: (cart) => { dispatch(cartsActions.addCart(cart)); },
    updateCart: (cart, count) => { dispatch(cartsActions.updateCart(cart, count)); },
    deleteCart: (cart) => { dispatch(cartsActions.deleteCart(cart)); },
});

class Main extends Component {

    componentDidMount() {
        this.props.getCategories();
        this.props.getProducts();

        if (this.props.authState.isAuthenticated) {
            this.props.getCarts();
            this.props.getOrders();
            this.props.getHistory();
        }
    }

    render() {

        const pushHome = () => { this.props.history.push("/home") };
        const pushTo = (addr) => { this.props.history.push(addr) };

        const logoutView = () => {
            if (this.props.authState.isAuthenticated) {
                cartsActions.deleteCarts();
                this.props.logout();
            }
            return <Redirect to="/home" />;
        };

        const allProps = {
            ...this.props,
            pushHome: pushHome,
            pushTo: pushTo,
            deleteCarts: cartsActions.deleteCarts,
        }

        const mustAuth = (component) => {
            if (this.props.authState.isAuthenticated) {
                return component;
            } else {
                return <Redirect to={{ pathname: "/login", state: { message: "You have to log in first to use this!" } }} />;
            }

        }
        const mustStaff = (component) => {
            if (this.props.authState.isAuthenticated && this.props.authState.user.isStaff === 'True') {
                return component;
            } else {
                return <Redirect to={{ pathname: "/login", state: { message: "You must be a staff user!" } }} />;
            }

        }

        const mustNotAuth = (component) => {
            if (!this.props.authState.isAuthenticated) {
                return component;
            } else {
                return <Redirect to="/home" />;
            }
        }

        return (
            <div>
                <Header {...allProps} />
                <div style={{ minHeight: '100vh' }}>
                    <Switch>
                        <Route exact path="/home" component={() => <Home {...allProps} />} />
                        <Route exact path="/cart" component={() => mustAuth(<Cart {...allProps} />)} />
                        <Route exact path="/orders" component={() => mustAuth(<Orders {...allProps} />)} />
                        <Route exact path="/history" component={() => mustAuth(<History {...allProps} />)} />
                        <Route exact path="/staff" component={() => mustStaff(<Staff {...allProps} />)} />
                        <Route exact path="/login" component={(props) => mustNotAuth(<Login {...allProps} {...props} />)} />
                        <Route exact path="/register" component={() => mustNotAuth(<Register {...allProps} />)} />
                        <Route exact path="/password/reset" component={() => mustNotAuth(<ForgotPassword {...allProps} />)} />
                        <Route exact path="/password/reset/confirm" component={() => mustNotAuth(<ResetFPassword {...allProps} />)} />
                        <Route exact path="/logout" component={logoutView} />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </div>
                <Footer {...allProps} />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));