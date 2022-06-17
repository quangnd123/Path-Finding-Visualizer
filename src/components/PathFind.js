import React, { useEffect, useState } from "react";
import Node from "./Node";
import "./PathFind.css";
import Astar from "../algorithms/Astar";
import visualize from "./Visualize";
import BFS from "../algorithms/BFS";
import DFS from "../algorithms/DFS";
import Greedy from "../algorithms/Greedy";

const cols = 35;
const rows = 15;
const startNode = { row: 0, col: 0 };
const endNode = { row: rows - 1, col: cols - 1 };

class Spot {
  constructor(i, j) {
    this.x = j;
    this.y = i;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.isStart = this.x === startNode.col && this.y === startNode.row;
    this.isEnd = this.x === endNode.col && this.y === endNode.row;
    this.neighbours = [];
    this.previous = null;
    this.isWall = false;
    if (Math.random(1) < 0.2) this.isWall = true;
  }
  addNeighbours(grid) {
    if (this.y > 0) this.neighbours.push(grid[this.y - 1][this.x]);
    if (this.x < cols - 1) this.neighbours.push(grid[this.y][this.x + 1]);
    if (this.y < rows - 1) this.neighbours.push(grid[this.y + 1][this.x]);
    if (this.x > 0) this.neighbours.push(grid[this.y][this.x - 1]);
  }
}

const PathFind = () => {
  const [Grid, setGrid] = useState([]);
  const [PathAstar, setPathAstar] = useState([]);
  const [VisitedNodesAstar, setVisitedNodesAstar] = useState([]);
  const [VisitedNodesBFS, setVisitedNodesBFS] = useState([]);
  const [PathBFS, setPathBFS] = useState([]);
  const [VisitedNodesDFS, setVisitedNodesDFS] = useState([]);
  const [PathDFS, setPathDFS] = useState([]);
  const [VisitedNodesGreedy, setVisitedNodesGreedy] = useState([]);
  const [PathGreedy, setPathGreedy] = useState([]);
  useEffect(() => {
    initializeGrid();
  }, []);

  //   const buildGrid = () => {
  //     const grid = new Array(rows);
  //     // initialize every elements in the grid
  //     for (let i = 0; i < rows; i++) {
  //       grid[i] = new Array(cols);
  //       for (let j = 0; j < cols; j++) {
  //         grid[i][j] = new Spot(i, j);
  //       }
  //     }
  //     //add neighbors for each elements
  //     for (let i = 0; i < rows; i++) {
  //       for (let j = 0; j < cols; j++) {
  //         grid[i][j].addNeighbours(grid);
  //       }
  //     }
  //     grid[startNode.row][startNode.col].isWall = false;
  //     grid[startNode.row][startNode.col].isWall = false;
  //     return grid;
  //   };

  const initializeGrid = () => {
    const grid = new Array(rows);
    // initialize every elements in the grid
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    //add neighbors for each elements
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addNeighbours(grid);
      }
    }
    grid[startNode.row][startNode.col].isWall = false;
    grid[endNode.row][endNode.col].isWall = false;
    setGrid(grid);

    let returnDFS = DFS(
      grid[startNode.row][startNode.col],
      grid[endNode.row][endNode.col]
    );
    setPathDFS(returnDFS.path);
    setVisitedNodesDFS(returnDFS.closeSet);

    let returnBFS = BFS(
      grid[startNode.row][startNode.col],
      grid[endNode.row][endNode.col]
    );
    setPathBFS(returnBFS.path);
    setVisitedNodesBFS(returnBFS.closeSet);

    let returnAstar = Astar(
      grid[startNode.row][startNode.col],
      grid[endNode.row][endNode.col]
    );
    setPathAstar(returnAstar.path);
    setVisitedNodesAstar(returnAstar.closeSet);

    let returnGreedy = Greedy(
      grid[startNode.row][startNode.col],
      grid[endNode.row][endNode.col]
    );
    setPathGreedy(returnGreedy.path);
    setVisitedNodesGreedy(returnGreedy.closeSet);

    console.log(returnDFS);
  };

  const clearPath = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!Grid[i][j].isWall && !Grid[i][j].isStart && !Grid[i][j].isEnd) {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  };

  return (
    <div className="Wrapper">
      <div>
        <button onClick={() => visualize(VisitedNodesDFS, PathDFS)}>
          Visualize DFS
        </button>
        <button onClick={() => visualize(VisitedNodesBFS, PathBFS)}>
          Visualize BFS
        </button>
        <button onClick={() => visualize(VisitedNodesAstar, PathAstar)}>
          Visualize Astar
        </button>
        <button onClick={() => visualize(VisitedNodesGreedy, PathGreedy)}>
          Visualize Greedy
        </button>
        <button onClick={() => clearPath()}>Clear Path</button>
        {/* <button
          onClick={() => {
            initializeGrid();
            clearPath();
          }}
        >
          Create new maze
        </button> */}
      </div>
      <div>
        {Grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="rowWrapper">
              {row.map((col, colIndex) => {
                const { isStart, isEnd, isWall } = col;
                return (
                  <Node
                    isStart={isStart}
                    isEnd={isEnd}
                    isWall={isWall}
                    row={rowIndex}
                    col={colIndex}
                    key={colIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathFind;
