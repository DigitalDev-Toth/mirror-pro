import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../../actions/actions';
import { subMenuShowHandler, getSubMenuItems } from './MenuHelper';
import SubMenu from '../../components/SubMenu/SubMenu';
import Button from '../../components/Button/Button';
import './Menu.style.scss';

/**
 * The Menu container.
 *
 * @class      Menu
 * @param      {object}  props   The component properties
 * @return     {node}    The menu container.
 */
export const Menu = (props) => {
  const { actions, subMenuName, subMenuShow } = props;
  const subMenuItems = getSubMenuItems(actions, subMenuName);

  if (subMenuShow && subMenuItems[subMenuName]) {
    return (
      <div className="Menu">
        <SubMenu
          close={() => subMenuShowHandler(actions, subMenuName, false)}
          items={subMenuItems[subMenuName]}
          name={subMenuName}
        />
      </div>
    );
  }

  return (
    <div className="Menu">
      {/* <Button
        click={() => subMenuShowHandler(actions, 'grid', true)}
        text="Grid"
      /> */}
      <Button
        click={() => subMenuShowHandler(actions, 'presets', true)}
        text="Presets"
      />
      <Button
        click={() => {}}
        text="Slices"
      />
    </div>
  );
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
 * Component default properties.
 */
Menu.defaultProps = {
  subMenuName: null,
  subMenuShow: false,
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
