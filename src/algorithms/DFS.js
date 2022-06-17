let closeSet = []; // already visited
let path = [];

export default function DFS(startNode, endNode) {
  recursive(startNode, endNode);
  return { path, closeSet };
}

function recursive(startNode, endNode) {
  closeSet.push(startNode);

  if (startNode === endNode) {
    path.push(endNode);
    return true;
  }
  for (let i = 0; i < startNode.neighbours.length; i++) {
    let neighbour = startNode.neighbours[i];
    if (
      !closeSet.includes(neighbour) &&
      !neighbour.isWall &&
      recursive(neighbour, endNode)
    ) {
      path.push(startNode);
      return true;
    }
  }
  return false;
}
