/**
 * Generate submenu with grid tools.
 *
 * @param      {Function}  args.updateDeskCounter  The update desk counter
 * @return     {Array}     The grid tools.
 */
export const subMenuGrid = ({ updateDeskCounter }) => {
  return [
    // { text: '-', click: () => updateDeskCounter({ operation: '-' }) },
    // { text: '+', click: () => updateDeskCounter({ operation: '+' }) },
    { text: '1', click: () => updateDeskCounter({ length: 1 }) },
    { text: '4', click: () => updateDeskCounter({ length: 4 }) },
    { text: '8', click: () => updateDeskCounter({ length: 8 }) },
    { text: '12', click: () => updateDeskCounter({ length: 12 }) },
  ];
};

export const generateGridLayout = () => {};
