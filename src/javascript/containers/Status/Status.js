import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
// import { API } from '../../api/api';

/**
 * The Status container.
 *
 * @class      Status
 * @param      {Object}  props   The component properties
 * @return     {Node}    The status container.
 */
export const Status = (props) => {
  return (
    <div>
      <div>Status {props.counter}</div>
    </div>
  );
};

/**
 * Component default properties.
 */
Status.defaultProps = {
  counter: 1,
};

/**
 * Component properties types.
 */
Status.propTypes = {
  counter: PropTypes.number,
};

/**
 * Bind the state to the component properties.
 *
 * @param      {Object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  counter: state.Status.counter,
});

/**
 * Bind dispaching actions creators to component properties.
 *
 * @param      {Function}  dispatch  The dispatch to access
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
