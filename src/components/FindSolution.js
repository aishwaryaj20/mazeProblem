import { useState } from "react";
import "./styles.css";
const FindSolution = () => {

  const wait = (ms) => new Promise((res, rej) => setTimeout(res, ms));
  const N = 5; //size of matrix
  const initSol = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];   //static matrix for input
  const [solution, setSolution] = useState([...initSol]);  //useState to save state and carry solution

  const _maze = [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1]
  ];  //actual matrix

  const solveMaze =  () => {
    if (findPath(_maze, 0, 0, solution) === false) {
      alert("Path not found!");
      return;
    }

    setSolution([...solution]);
    alert("Path  found!");
    return true;
  };

  //if x, y is valid index for N*N maze
  const isSafe = (maze, x, y) => {
    return x >= 0 && x < N && y >= 0 && y < N && maze[x][y] === 1;
  };   
  

  const findPath = async (maze, x, y, solution) => {
    await wait(100);
    setSolution([...solution]);  //for one by one block jump after one second

    if (isSafe(maze, x, y)) {
      // return if its already in solution
      if (solution[x][y] === 1) return false;

      // mark x,y as current path
      solution[x][y] = 1;

      // return if goal
      if (
        x === N - 1 &&
        y === N - 1 &&
        maze[x][y] === 1 &&
        solution[x][y] === 1
      ) {
        return true;
      }

      // move right path
      if (await findPath(maze, x + 1, y, solution)) return true;

      // if can't move right move down path
      if (await findPath(maze, x, y + 1, solution)) return true;

      // if moving right can't give path come back
      if (await findPath(maze, x - 1, y, solution)) return true;

      // if moving down can't give path come back
      if (await findPath(maze, x, y - 1, solution)) return true;

      solution[x][y] = 0;
      return false;
    }

    //for directions

    return false;
  };

  const mazeCell = () =>
    _maze.map(function (aray, i) {
      return aray.map((v, j) => (
        <div key={`${i}${j}`} className={`rect ${v === 1 ? "" : "blocker"}`} />  //for highlighting blue box
      ));
    });

  const solEle = () =>
    solution.map(function (aray, i) {
      return aray.map((v, j) => (
        <div key={`${i}${j}`} className={`rect ${v === 1 ? "" : "blockerCell"}`} /> //for highlighting blue box
      ));
    });

  return (
    <div>
      <h3 className="prob"> problem </h3>
      <div className="maze">{mazeCell()}</div>
      <div className="start-btn" onClick={solveMaze} >
        Find Path
      </div>
      <h3 className="prob">solution</h3>
      <div className="maze">{solEle()}</div>
    </div>
  );
};

export default FindSolution