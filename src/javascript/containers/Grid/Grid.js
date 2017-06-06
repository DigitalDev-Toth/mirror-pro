import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
import Desk from '../../components/Desk/Desk';
import './Grid.style.scss';

/**
 * The Grid container.
 *
 * @class      Grid
 * @param      {object}  props   The component properties
 * @return     {node}    The grid container.
 */
export const Grid = () => {
  return (
    <div className="Grid">
      <Desk />
    </div>
  );
};

/**
 * Component properties types.
 */
Grid.propTypes = {
  deskCounter: PropTypes.number.isRequired,
};

/**
 * Component default properties.
 */
Grid.defaultProps = {};

/**
 * Bind the state to the component properties.
 *
 * @param      {object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  deskCounter: state.Status.deskCounter,
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
