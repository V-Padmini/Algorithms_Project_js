import { SudokuSolver } from "./sudokuSolver";
import { Trie } from "./trie";
import readline from "readline";
import { ExpressionEvaluator } from "./expressionEvaluator";
import { URLShortener } from "./urlShortener";
import { Vehicle, VehicleType, ParkingLot } from "./parkingLot";
import { Splitwise } from "./splitwise";
import { RateLimiter } from "./rateLimiter";
import { TaskScheduler } from "./taskScheduler";
import { Store } from "./stateManager";
import { AdvancedWebCrawler } from "./webCrawler";
import { AStarAdvanced } from "./astarPath";

// ✅ Example usage:

// Sudoku

// const board: string[][] = [
//   ["5","3",".",".","7",".",".",".","."],
//   ["6",".",".","1","9","5",".",".","."],
//   [".","9","8",".",".",".",".","6","."],
//   ["8",".",".",".","6",".",".",".","3"],
//   ["4",".",".","8",".","3",".",".","1"],
//   ["7",".",".",".","2",".",".",".","6"],
//   [".","6",".",".",".",".","2","8","."],
//   [".",".",".","4","1","9",".",".","5"],
//   [".",".",".",".","8",".",".","7","9"]
// ];

// const solver = new SudokuSolver(board);

// if (solver.solve()) {
//   console.log("Sudoku solved:");
//   solver.printBoard();
// } else {
//   console.log("No solution exists.");
// }
//<------------------------------------------------------------------------------------------------------->
// Trie

// Create a new trie
const trie = new Trie();

// Insert words
console.log("Inserting words...");
trie.insert("car");
trie.insert("cat");
trie.insert("cart");
trie.insert("dog");
trie.insert("car");
// Search words
console.log("\nSearching words...");
console.log("Search 'car':", trie.search("car")); // true
console.log("Search 'cat':", trie.search("cat")); // true
console.log("Search 'cart':", trie.search("cart")); // true
console.log("Search 'ca':", trie.search("ca")); // false (not complete word)
console.log("Search 'cow':", trie.search("cow")); // false

// Autocomplete
console.log("\nAutocomplete 'ca'...");
console.log(trie.autocomplete("ca")); // should show ["car", "cat", "cart"] sorted by frequency

console.log("\nAutocomplete 'c'...");
console.log(trie.autocomplete("c")); // should show ["car", "cat", "cart"]

console.log("\nAutocomplete 'd'...");
console.log(trie.autocomplete("d")); // should show ["dog"]

console.log("\nAutocomplete 'z'...");
console.log(trie.autocomplete("z")); // should show []

// Delete a word
console.log("\nDeleting 'car'...");
trie.delete("car");
console.log("Search 'car':", trie.search("car")); // false now
console.log("Autocomplete 'ca' after deleting 'car':", trie.autocomplete("ca")); // ["cat", "cart"]

console.log("\nDeleting 'dog'...");
trie.delete("dog");
console.log("Search 'dog':", trie.search("dog")); // false
console.log("Autocomplete 'd' after deleting 'dog':", trie.autocomplete("d")); // []

//<---------------------------------------------------------------------------------------------------------------->

// // Expression
// const evaluator = new AdvancedExpressionEvaluator("3 + 4 * 2 / (1 - 5)^2^3 - -2");
// console.log(evaluator.evaluate());

// // URL Shortener
// const shortener = new AdvancedURLShortener();
// const url1 = shortener.shorten("https://example.com");
// console.log(url1);
// console.log(shortener.expand(url1));

// // Parking Lot
// const lot = new ParkingLot(1, 5);
// lot.park(new Vehicle("KA01CAR", VehicleType.CAR));
// lot.displayAvailable();

// // Splitwise
// const sw = new AdvancedSplitwise();
// sw.addExpense("Alice", ["Alice", "Bob"], 200);
// sw.showBalances();

// // Rate Limiter
// const limiter = new AdvancedRateLimiter(3, 5000);
// console.log(limiter.allowRequest("user1"));

// // Task Scheduler
// const scheduler = new AdvancedTaskScheduler();
// scheduler.addTask(() => console.log("Task executed"), 1000);
// scheduler.start();

// // Store
// const store = new AdvancedStore({ count: 0 });
// store.subscribe(() => console.log("State:", store.getState()));
// store.setState({ count: 1 });

// // Web Crawler (async example)
// // const crawler = new AdvancedWebCrawler();
// // crawler.crawl("https://example.com");

// // A* Pathfinding
// const astar = new AStarAdvanced(5, 5, [[1,1]]);
// console.log(astar.findPath(0,0,4,4));