import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
import './Status.style.scss';

/**
 * The Status container.
 *
 * @class      Status
 * @param      {object}  props   The component properties
 * @return     {node}    The status container.
 */
export const Status = (props) => {
  return (
    <div className="Status">
      <div className="Status-Info">
        <span className="Status-Text">Desks: {props.deskCounter}</span>
      </div>
      <div className="Status-Info">
        <span className="Status-Text">
          Tool: {props.tool}
        </span>
      </div>
      <div className="Status-Info">
        <span className="Status-Text">
          WindowLevel: {props.window.center} | {props.window.width}
        </span>
      </div>
    </div>
  );
};

/**
 * Component properties types.
 */
Status.propTypes = {
  deskCounter: PropTypes.number.isRequired,
  tool: PropTypes.string.isRequired,
  window: PropTypes.shape().isRequired,
};

/**
 * Component default properties.
 */
Status.defaultProps = {};

/**
 * Bind the state to the component properties.
 *
 * @param      {object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  deskCounter: state.Status.deskCounter,
  tool: state.Status.tool,
  window: state.Status.window,
});

/**
 * Bind dispaching actions creators to component properties.
 *
 * @param      {function}  dispatch  The dispatch to access
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
