import readline from "readline";


class Graph {

    private adjacencyList: Map<string, string[]>;


    constructor() {
        this.adjacencyList = new Map();
    }


    addEdge(
        source: string,
        destination: string
    ) {

        if (!this.adjacencyList.has(source)) {
            this.adjacencyList.set(source, []);
        }

        this.adjacencyList
            .get(source)!
            .push(destination);
    }



    dfs(
        startNode: string
    ): string[] {

        const visited = new Set<string>();

        const result: string[] = [];


        this.dfsHelper(
            startNode,
            visited,
            result
        );


        return result;
    }



    private dfsHelper(
        node: string,
        visited: Set<string>,
        result: string[]
    ) {


        if (visited.has(node)) {
            return;
        }


        visited.add(node);

        result.push(node);



        const neighbours =
            this.adjacencyList.get(node) || [];



        for (const neighbour of neighbours) {

            this.dfsHelper(
                neighbour,
                visited,
                result
            );

        }

    }

}



export function runDFS() {


    const rl = readline.createInterface({

        input: process.stdin,

        output: process.stdout

    });



    const graph = new Graph();



    rl.question(
        "Enter number of edges: ",
        (answer) => {


            const edges = Number(answer);

            let count = 0;



            function readEdges() {


                if (count < edges) {


                    rl.question(
                        `Enter edge ${count + 1}: `,
                        (input) => {


                            const [from, to] =
                                input.split(" ");



                            graph.addEdge(
                                from,
                                to
                            );


                            count++;

                            readEdges();

                        }
                    );


                } 
                else {


                    rl.question(
                        "Enter starting node: ",
                        (start) => {


                            const result =
                                graph.dfs(start);



                            console.log(
                                "\nDFS Traversal:"
                            );


                            console.log(
                                result.join(" -> ")
                            );


                            rl.close();

                        }
                    );

                }

            }


            readEdges();

        }
    );

}