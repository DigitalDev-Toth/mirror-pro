import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';

/**
 * The Navigation container.
 *
 * @class      Navigation
 * @param      {object}  props   The component properties
 * @return     {node}    The navigation container.
 */
export const Navigation = (props) => {
  return (
    <div>
      <div>{`${props.a}${props.b}`}</div>
    </div>
  );
};

/**
 * Component default properties.
 */
Navigation.propTypes = {
  a: PropTypes.string,
  b: PropTypes.string,
};

/**
 * Component properties types.
 */
Navigation.defaultProps = {
  a: '',
  b: '',
};

/**
 * Bind the state to the component properties.
 *
 * @param      {object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  counter: state.Navigation.counter,
});

/**
 * Bind dispaching actions creators to component properties.
 *
 * @param      {function}  dispatch  The dispatch to access
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
