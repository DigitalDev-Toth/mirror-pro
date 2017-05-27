import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
// import { API } from '../../api/api';
import Desk from '../../components/Desk/Desk';

/**
 * The Grid container.
 *
 * @class      Grid
 * @param      {object}  props   The component properties
 * @return     {node}    The grid container.
 */
export const Grid = (props) => {
  return (
    <div className="Grid">
      Grid {props.counter}
      <Desk />
    </div>
  );
};

/**
 * Component default properties.
 */
Grid.defaultProps = {
  counter: 1,
};

/**
 * Component properties types.
 */
Grid.propTypes = {
  counter: PropTypes.number,
};

/**
 * Bind the state to the component properties.
 *
 * @param      {object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  counter: state.Grid.counter,
});

/**
 * Bind dispaching actions creators to component properties.
 *
 * @param      {function}  dispatch  The dispatch to access
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
