import readline from "readline";

export function runBFS(){

    const rl = readline.createInterface({

        input: process.stdin,

        output: process.stdout

    });

    class Graph {

        private adjacencyList:
            Map<string,string[]>;

        constructor(){

            this.adjacencyList =
                new Map<string,string[]>();

        }

        addEdge(
            node1:string,
            node2:string
        ):void{


            if(!this.adjacencyList.has(node1)){

                this.adjacencyList.set(node1,[]);

            }


            if(!this.adjacencyList.has(node2)){

                this.adjacencyList.set(node2,[]);

            }

            // Undirected graph

            this.adjacencyList
                .get(node1)!
                .push(node2);


            this.adjacencyList
                .get(node2)!
                .push(node1);


        }


        bfs(startNode:string):string[]{

            const queue:string[]=[];

            const visited =
                new Set<string>();

            const result:string[]=[];


            queue.push(startNode);

            visited.add(startNode);


            while(queue.length>0){



                const currentNode =
                    queue.shift()!;

                result.push(currentNode);


                const neighbours =
                    this.adjacencyList
                    .get(currentNode) || [];

                for(
                    const neighbour
                    of neighbours
                ){

                    if(!visited.has(neighbour)){


                        visited.add(neighbour);


                        queue.push(neighbour);


                    }


                }


            }



            return result;


        }


    }


    const graph = new Graph();

    rl.question(
        "Enter number of edges: ",
        (answer:string)=>{


            const edges =
                Number(answer);

            let count=1;


            function readEdges(){



                if(count > edges){



                    rl.question(
                        "Enter starting node: ",
                        (start:string)=>{


                            const result =
                                graph.bfs(start);



                            console.log(
                                "\nBFS Traversal:"
                            );


                            console.log(
                                result.join(" -> ")
                            );


                            rl.close();


                        }
                    );


                    return;

                }




                rl.question(
                    `Enter edge ${count}: `,
                    (edge:string)=>{


                        const nodes =
                            edge.split(" ");



                        graph.addEdge(
                            nodes[0],
                            nodes[1]
                        );


                        count++;


                        readEdges();


                    }
                );


            }



            readEdges();



        }
    );

}