import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
import {
  subMenuShowHandler,
  subMenuComponent,
} from './MenuHelper';
import Button from '../../components/Button/Button';
import './Menu.scss';

/**
 * The Menu container.
 *
 * @class      Menu
 * @param      {object}  props   The component properties
 * @return     {node}    The menu container.
 */
export const Menu = (props) => {
  const { actions, subMenuName, subMenuShow } = props;

  return (
    <div className="Menu">
      <Button
        onClick={() => subMenuShowHandler(actions, 'grid', true)}
        text="Grid"
      />
      <Button
        onClick={() => subMenuShowHandler(actions, 'filtering', true)}
        text="Filtering"
      />
      {subMenuComponent(actions, subMenuName, subMenuShow)}
    </div>
  );
};

/**
 * Component default properties.
 */
Menu.defaultProps = {
  subMenuName: null,
  subMenuShow: false,
};

/**
 * Component properties types.
 */
Menu.propTypes = {
  actions: PropTypes.shape().isRequired,
  subMenuName: PropTypes.string,
  subMenuShow: PropTypes.bool.isRequired,
};

/**
 * Bind the state to the component properties.
 *
 * @param      {object}  state   The state structure to access
 */
const mapStateToProps = state => ({
  subMenuName: state.Menu.subMenuName,
  subMenuShow: state.Menu.subMenuShow,
});

/**
 * Bind dispaching actions creators to component properties.
 *
 * @param      {function}  dispatch  The dispatch to access
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
