/**
 * Handle the call of action creator for show or hide the submenu.
 *
 * @param      {object}   actions  The actions
 * @param      {String}   name     The name
 * @param      {boolean}  show     The show
 */
export const subMenuShowHandler = (actions, name, show) => {
  actions.updateSubMenuShow(name, show);
};

/**
 * Gets the sub menu items.
 *
 * @param      {object}  actions  The actions
 * @return     {object}  The sub menu items.
 */
export const getSubMenuItems = (actions) => {
  return {
    transform: require('../../helpers/TransformHelper').subMenuTransform(actions),
    presets: require('../../helpers/FilterHelper').subMenuPresets(actions),
  };
};
