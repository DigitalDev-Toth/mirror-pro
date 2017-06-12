export const subMenuTransform = (actions) => {
  return [
    { text: 'Zoom', click: () => transform(actions, 'zoom', 'Zoom') },
    { text: 'Pan', click: () => transform(actions, 'pan', 'Pan') },
    { text: 'Rotation', click: () => transform(actions, 'rotation', 'Rotation') },
  ];
};

export const transform = (actions, tool, toolLabel) => {
  actions.applyCurrentTool(tool);
  actions.updateCurrentTool(toolLabel);
};
