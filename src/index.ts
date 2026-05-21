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
import { WordSearch } from "./wordSearch";

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

// // Create a new trie
// const trie = new Trie();

// // Insert words
// console.log("Inserting words...");
// trie.insert("car");
// trie.insert("cat");
// trie.insert("cart");
// trie.insert("dog");
// trie.insert("car");
// // Search words
// console.log("\nSearching words...");
// console.log("Search 'car':", trie.search("car")); // true
// console.log("Search 'cat':", trie.search("cat")); // true
// console.log("Search 'cart':", trie.search("cart")); // true
// console.log("Search 'ca':", trie.search("ca")); // false (not complete word)
// console.log("Search 'cow':", trie.search("cow")); // false

// // Autocomplete
// console.log("\nAutocomplete 'ca'...");
// console.log(trie.autocomplete("ca")); // should show ["car", "cat", "cart"] sorted by frequency

// console.log("\nAutocomplete 'c'...");
// console.log(trie.autocomplete("c")); // should show ["car", "cat", "cart"]

// console.log("\nAutocomplete 'd'...");
// console.log(trie.autocomplete("d")); // should show ["dog"]

// console.log("\nAutocomplete 'z'...");
// console.log(trie.autocomplete("z")); // should show []

// // Delete a word
// console.log("\nDeleting 'car'...");
// trie.delete("car");
// console.log("Search 'car':", trie.search("car")); // false now
// console.log("Autocomplete 'ca' after deleting 'car':", trie.autocomplete("ca")); // ["cat", "cart"]

// console.log("\nDeleting 'dog'...");
// trie.delete("dog");
// console.log("Search 'dog':", trie.search("dog")); // false
// console.log("Autocomplete 'd' after deleting 'dog':", trie.autocomplete("d")); // []

//<---------------------------------------------------------------------------------------------------------------->

// // Expression
// const evaluator = new AdvancedExpressionEvaluator("3 + 4 * 2 / (1 - 5)^2^3 - -2");
// console.log(evaluator.evaluate());

//<---------------------------------------------------------------------------------------------------------------->

// // URL Shortener
// const shortener = new URLShortener();
// const url1 = shortener.shorten("https://example.com/page1");
// console.log(url1);
// console.log(shortener.expand(url1));

// const url2 = shortener.shorten("https://example.com/about");
// console.log(url2);
// console.log(shortener.expand(url2));

// shortener.delete("https://example.com/page1");

// const long1 = shortener.expand(url1);
// console.log(long1); 

//<------------------------------------------------------------------------------------------------------------------>

// // Parking Lot
// ---------- Demo Runner ----------
const lot = new ParkingLot(1, 4); // 1 floor, 4 spots
const bike = new Vehicle("KA-01-BIKE1", VehicleType.BIKE);
const car = new Vehicle("KA-01-CAR1", VehicleType.CAR);
const truck = new Vehicle("KA-01-TRUCK1", VehicleType.TRUCK);

lot.displayAvailable(); // show all spots available

lot.park(bike);  // park bike
lot.park(car);   // park car
lot.park(truck); // park truck

lot.displayAvailable(); // see remaining spots

lot.remove("KA-01-BIKE1"); // remove bike
lot.displayAvailable();    // see updated spots

lot.remove("NOTFOUND");    // try removing vehicle not in lot
//<------------------------------------------------------------------------------------------------------------->

// // Splitwise
// const sw = new Splitwise();
// sw.addExpense("Alice", ["Alice", "Bob", "Charlie"], 120); // Alice paid 120 for 3
// sw.addExpense("Bob", ["Bob", "Charlie"], 60); // Bob paid 60 for 2
// sw.simplifyDebts();
// sw.showBalances();
//<----------------------------------------------------------------------------------------------------->

// Rate Limiter
// const limiter = new RateLimiter(2, 5000); // 2 requests per 5 sec

// limiter.allowRequest("Alice");
// limiter.allowRequest("Alice");
// limiter.allowRequest("Alice");

// // After 6 seconds
// setTimeout(() => {
//   limiter.allowRequest("Alice");
// }, 6000);

//<---------------------------------------------------------------------------------------------------------->

// // Task Scheduler

// // 1️⃣ Create a scheduler
// const scheduler = new TaskScheduler();

// // 2️⃣ Start the scheduler
// scheduler.start();
// console.log("Scheduler started");

// // 3️⃣ Add tasks

// // Task 1: Runs in 2 seconds, priority 1
// const task1Id = scheduler.addTask(() => {
//   console.log("Task 1 executed!");
// }, 2000, 1);

// // Task 2: Runs in 1 second, priority 2
// const task2Id = scheduler.addTask(async () => {
//   console.log("Task 2 executed!");
// }, 1000, 2);

// // Task 3: Runs in 1 second, priority 1
// const task3Id = scheduler.addTask(() => {
//   console.log("Task 3 executed!");
// }, 1000, 4);

// console.log("Tasks added:");
// console.log("Task1 ID:", task1Id);
// console.log("Task2 ID:", task2Id);
// console.log("Task3 ID:", task3Id);

// // 4️⃣ Cancel Task 1 before it runs (after 500ms)
// setTimeout(() => {
//   const canceled = scheduler.cancelTask(task1Id);
//   console.log("Task 1 canceled:", canceled);
// }, 500);

// // 5️⃣ Stop scheduler after 3 seconds
// setTimeout(() => {
//   scheduler.stop();
//   console.log("Scheduler stopped");
// }, 3000);

//<---------------------------------------------------------------------------------------------------------------->

// // Store
// type State = { count: number; message: string };

// // 1️⃣ Create the store with initial state
// const store = new Store<State>({ count: 0, message: "Hello" });

// // 2️⃣ Subscribe listeners
// const unsubscribe1 = store.subscribe(() => {
//   console.log("Listener 1:", store.getState());
// });
// store.subscribe(() => {
//   console.log("Listener 2:", store.getState());
// });

// // 3️⃣ Add middleware
// store.use((state, next) => {
//   console.log("Middleware 1 before update:", state);
//   next(state); // continue to next middleware or state update
// });

// store.use((state, next) => {
//   console.log("Middleware 2 before update:", state);
//   // Example: modify state in middleware
//   const newState = { ...state, message: state.message + "!" };
//   next(newState);
// });

// // 4️⃣ Update state
// console.log("---- First update ----");
// store.setState({ count: 1 });

// console.log("---- Second update ----");
// store.setState({ count: 5 });

// // 5️⃣ Unsubscribe the first listener
// unsubscribe1();

// // 6️⃣ Update state again
// console.log("---- Third update ----");
// store.setState({ count: 10, message: "Updated" });

//<---------------------------------------------------------------------------------------------------->

// // Web Crawler (async example)
// async function runCrawler() {
//   const crawler = new AdvancedWebCrawler(2); // depth = 2
//   await crawler.crawl("https://example.com"); // start crawling
// }

// runCrawler();

//<-------------------------------------------------------------------------------------------------------->

// Word search
// ---------- Demo ----------
const grid = [
  ['C','A','T','F'],
  ['B','G','E','S'],
  ['I','T','A','E'],
  ['S','O','N','G']
];

const ws = new WordSearch(grid);

const words = ["CAT", "SONG", "TEA", "BIT"];
for (const word of words) {
  const result = ws.search(word);
  if (result) console.log(`${word} found at positions:`, result);
  else console.log(`${word} not found`);
}