export const subMenuPresets = (actions) => {
  return [
    { text: 'Bone', click: () => windowing(actions, 300, 1500) },
    { text: 'Abdomen', click: () => windowing(actions, 60, 400) },
    { text: 'Angio', click: () => windowing(actions, 300, 600) },
    { text: 'Brain', click: () => windowing(actions, 40, 80) },
    { text: 'Chest', click: () => windowing(actions, 40, 400) },
    { text: 'Lungs', click: () => windowing(actions, -400, 1500) },
  ];
};

export const windowing = (actions, center, width) => {
  actions.applyWindowLevel(center, width);
  actions.updateWindowLevel(center, width);
};
