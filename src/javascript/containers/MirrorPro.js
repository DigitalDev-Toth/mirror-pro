import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { API } from '../api/api';
import actionCreators from '../actions/actions';
import PrimaryMenu from '../components/Menu/PrimaryMenu';
import SecondaryMenu from '../components/Menu/SecondaryMenu';
import Desk from '../components/Desk/Desk';

/**
 * Class for mirror pro.
 *
 * @class      MirrorPro (name)
 */
export const MirrorPro = (props) => {
  return (
    <div>
      <div>WOOOOOLAaaassssAAA---ññññOOOOO {props.counter}</div>
      <PrimaryMenu />
      <SecondaryMenu />
      <Desk />
    </div>
  );
};

MirrorPro.defaultProps = { counter: 1 };

/**
 * @description React's defnitions of properties types.
 * @type {Object}
 */
MirrorPro.propTypes = { counter: PropTypes.number };

/**
 * @name mapStateToProps
 * @description
 *
 * Bind to the container's context the las state of the Resux's store.
 *
 * @param  {Object} state The last state of the Redux's store
 * @return {Object}       The component's properties.
 */
const mapStateToProps = state => ({
  counter: state.MirrorPro.counter,
});

/**
 * @name mapDispatchToProps
 * @description
 *
 * Bind to the container's context all dispatching actions creators.
 *
 * @param  {Function} dispatch The Redux's dispatcher
 * @return {Object}            The Redux's actions binded
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MirrorPro);
