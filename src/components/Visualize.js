const visualizePath = (VisitedNodes) => {
  //i=1 because it is the start node
  for (let i = 0; i < VisitedNodes.length; i++) {
    const node = VisitedNodes[i];
    if (node.isStart || node.isEnd) continue;
    setTimeout(() => {
      document.getElementById(`node-${node.y}-${node.x}`).className =
        "node node-visited";
    }, 20 * i);
  }
};

const visualizeShortestPath = (shortestPathNodes) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    const node = shortestPathNodes[i];
    if (node.isStart || node.isEnd) continue;
    setTimeout(() => {
      document.getElementById(`node-${node.y}-${node.x}`).className =
        "node node-shortest-path";
    }, 10 * i);
  }
};

const visualize = (VisitedNodes, Path) => {
  visualizePath(VisitedNodes);
  setTimeout(() => {
    visualizeShortestPath(Path);
  }, 20 * VisitedNodes.length);
};

export default visualize;
