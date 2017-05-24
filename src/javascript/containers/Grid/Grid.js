import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
// import { API } from '../../api/api';
import Desk from '../../components/Desk/Desk';

export const Grid = (props) => {
  return (
    <div className="Grid">
      Grid {props.counter}
      <Desk />
    </div>
  );
};

/**
 * @description Component default properties.
 * @type {Object}
 */
Grid.defaultProps = {
  counter: 1,
};

/**
 * @description Component properties types.
 * @type {Object}
 */
Grid.propTypes = {
  counter: PropTypes.number,
};

/**
 * @name mapStateToProps
 * @description
 *
 * Bind the store to component properties.
 *
 * @param  {Object} state The store values
 * @return {Object}       The component property.
 */
const mapStateToProps = state => ({
  counter: state.Grid.counter,
});

/**
 * @name mapDispatchToProps
 * @description
 *
 * Bind all dispatching actions creators to component properties.
 *
 * @param  {Function} dispatch The dispaching actions creators
 * @return {Object}            The component property.
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
