import React from 'react';
import {Provider} from 'react-redux'
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {createStore} from 'redux';
import 'regenerator-runtime/runtime';
import './styles.css';
import Page from './constants/Page';
import Status from './constants/Status';
import Navigation from './containers/Navigation';
import Pages from './containers/Pages';
import {rootReducer} from './reducers';
import products from './api/products';
import Api from './api';
import {loadProductsRequest, loadProductsSuccess} from "./actionCreators";

const productsAllIds = products.map(p => p.id);
const productsById = products.reduce(
    (result, product) => ({...result, [product.id]: product}),
    {}
);

const preloadedState = {
    page: Page.menu,
    products: {
        allIds: productsAllIds,
        byId: productsById,
        status: Status.loaded
    }
};

const api = new Api({baseUrl: 'http://sampleserviceurl?foo=bar'});

const store = createStore(rootReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <h1>Sushi &amp; Rolls</h1>
                    <Navigation page={Page.menu}/>
                    <Pages page={Page.menu}/>
                </div>
            </Provider>
        );
    }

    componentDidMount() {
        const action = loadProductsRequest;
        store.dispatch(action);
        this.store = api.fetchProducts()
            .them(products => {
                store.dispatch(loadProductsSuccess(products))
            })
            .catch((error) => {
                console.log(error)
            })
    }


}

App.propTypes = {};

ReactDom.render(<App/>, document.getElementById('app'));
