import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';

/**
 * The Menu container.
 *
 * @class      Menu
 * @param      {Object}  props   The component properties
 * @return     {Node}    The menu container.
 */
export const Menu = (props) => {
  return (
    <div>
      <div>Menu {props.counter}</div>
    </div>
  );
};

/**
 * Component default properties.
 */
Menu.defaultProps = {
  counter: 1,
};

/**
 * Component properties types.
 */
Menu.propTypes = {
  counter: PropTypes.number,
};

/**
 * Bind the state to the component properties.
 *
 * @param      {Object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  counter: state.Menu.counter,
});

/**
 * Bind dispaching actions creators to component properties.
 *
 * @param      {Function}  dispatch  The dispatch to access
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
