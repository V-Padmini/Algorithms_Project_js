import readline from "readline";


export function runBFSShortestPath(){


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


    displayGraph():void{


        console.log("\nGraph Representation\n");



        for(
            const [node, neighbours]
            of this.adjacencyList
        ){


            console.log(
                `${node} -> ${neighbours.join(",")}`
            );


        }


    }



    bfsShortestPath(
        start:string,
        destination:string
    ):string[]{



        const queue:string[]=[];


        const visited =
            new Set<string>();



        const parent =
            new Map<string,string>();




        queue.push(start);


        visited.add(start);


        parent.set(start,"");




        while(queue.length > 0){



            const current =
                queue.shift()!;




            if(current === destination){

                break;

            }




            const neighbours =
                this.adjacencyList
                .get(current) || [];





            for(
                const neighbour
                of neighbours
            ){



                if(!visited.has(neighbour)){


                    visited.add(neighbour);


                    queue.push(neighbour);



                    parent.set(
                        neighbour,
                        current
                    );


                }


            }


        }





        if(!parent.has(destination)){


            return [];


        }





        const path:string[]=[];


        let current =
            destination;



        while(current !== ""){


            path.push(current);


            current =
                parent.get(current)!;


        }



        return path.reverse();



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



                graph.displayGraph();




                rl.question(
                    "\nEnter starting node: ",
                    (start:string)=>{



                        rl.question(
                            "Enter destination node: ",
                            (destination:string)=>{



                                const path =
                                    graph.bfsShortestPath(
                                        start,
                                        destination
                                    );



                                console.log(
                                    "\nShortest Path:"
                                );




                                if(path.length===0){


                                    console.log(
                                        "No path exists"
                                    );


                                }
                                else{


                                    console.log(
                                        path.join(" -> ")
                                    );


                                }



                                rl.close();


                            }
                        );



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