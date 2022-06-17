function Greedy(startNode, endNode) {
  let openSet = []; // to be visited
  let closeSet = []; // already visited
  let path = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    //find the one with the least f
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].h < openSet[leastIndex].h) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];

    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return { path, closeSet };
    }
    // remove current from openSet
    openSet = openSet.filter((elt) => elt !== current);

    closeSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (
        !closeSet.includes(neighbour) &&
        !openSet.includes(neighbour) &&
        !neighbour.isWall
      ) {
        neighbour.h = heuristic(neighbour, endNode);
        neighbour.previous = current;
        openSet.push(neighbour);
      }
    }
  }
  return { path, closeSet, error: "No Path Found" };
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export default Greedy;
