export default function BFS(startNode, endNode) {
  let openSet = []; // to be visited
  let closeSet = []; // already visited
  let path = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let current = openSet[0];
    closeSet.push(current);
    openSet.shift();

    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }

      return { path, closeSet };
    }

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (
        !closeSet.includes(neighbour) &&
        !openSet.includes(neighbour) &&
        !neighbour.isWall
      ) {
        neighbour.previous = current;
        openSet.push(neighbour);
      }
    }
  }

  return { path, closeSet, error: "No Path Found" };
}
