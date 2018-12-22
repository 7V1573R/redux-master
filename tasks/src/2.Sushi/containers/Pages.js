import React from 'react';
import { connect } from 'react-redux';
import Page from '../components/Pages';

export default connect(
    (state, props) => ({
        page: state.page
    })
)(Page);