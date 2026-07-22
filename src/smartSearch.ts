import readline from "readline";


// ================= Trie Node =================


class TrieNode {


    children: Map<string, TrieNode>;

    isWord: boolean;

    frequency: number;

    word: string;



    constructor() {

        this.children = new Map();

        this.isWord = false;

        this.frequency = 0;

        this.word = "";

    }

}



// ================= Trie =================


class Trie {


    root: TrieNode;



    constructor(){

        this.root = new TrieNode();

    }



    insert(word:string){


        let current = this.root;



        for(const char of word.toLowerCase()){


            if(!current.children.has(char)){


                current.children.set(
                    char,
                    new TrieNode()
                );

            }



            current =
            current.children.get(char)!;

        }



        current.isWord = true;

        current.word = word;

        current.frequency++;

    }






    searchPrefix(prefix:string){


        let current = this.root;



        for(const char of prefix.toLowerCase()){


            if(!current.children.has(char)){


                return null;

            }



            current =
            current.children.get(char)!;

        }



        return current;

    }






    collectWords(
        node:TrieNode,
        result:TrieNode[]
    ){


        if(node.isWord){

            result.push(node);

        }



        for(const child of node.children.values()){


            this.collectWords(
                child,
                result
            );

        }

    }






    autocomplete(prefix:string){


        const node =
        this.searchPrefix(prefix);



        if(!node){

            return [];

        }



        const result:TrieNode[]=[];



        this.collectWords(
            node,
            result
        );



        return result.sort(

            (a,b)=>
            b.frequency-a.frequency

        );

    }






    getAllWords(){


        const result:TrieNode[]=[];



        this.collectWords(
            this.root,
            result
        );



        return result;

    }


}






// ================= Levenshtein Distance =================


function editDistance(

    word1:string,

    word2:string

):number{


    const m = word1.length;

    const n = word2.length;



    const dp:number[][] =

    Array.from(

        {
            length:m+1
        },

        ()=>new Array(n+1).fill(0)

    );





    for(let i=0;i<=m;i++){

        dp[i][0]=i;

    }




    for(let j=0;j<=n;j++){

        dp[0][j]=j;

    }







    for(let i=1;i<=m;i++){


        for(let j=1;j<=n;j++){



            if(word1[i-1] === word2[j-1]){


                dp[i][j] =
                dp[i-1][j-1];


            }
            else{


                dp[i][j] = Math.min(


                    // Insert

                    dp[i][j-1]+1,


                    // Delete

                    dp[i-1][j]+1,


                    // Replace

                    dp[i-1][j-1]+1


                );


            }

        }

    }




    return dp[m][n];

}








// ================= Smart Search =================


function smartSearch(

    input:string,

    trie:Trie

){



    // Step 1: Trie autocomplete

    const suggestions =
    trie.autocomplete(input);





    if(suggestions.length > 0){



        return suggestions.map(item=>({


            word:item.word,

            frequency:item.frequency,

            similarity:100


        }));


    }







    // Step 2: Spell correction


    console.log(

        "\nNo exact match found. Checking spelling..."

    );





    const words =
    trie.getAllWords();






    const matches = words.map(item=>{



        const distance =

        editDistance(

            input.toLowerCase(),

            item.word.toLowerCase()

        );





        const similarity =


        Math.round(


            (

                1 -

                distance /

                Math.max(

                    input.length,

                    item.word.length

                )

            )

            *

            100


        );






        return {


            word:item.word,

            frequency:item.frequency,

            distance,

            similarity


        };


    });







    // Remove unrelated suggestions


    return matches

        .filter(

            item => item.similarity >= 50

        )

        .sort(

            (a,b)=>

            b.similarity-a.similarity

        )

        .slice(0,5);



}








// ================= Main Runner =================


export function runSmartSearch(){



    const trie = new Trie();





    // Search Database


    const words=[



        "javascript",

        "javascript",

        "javascript",



        "java",

        "java",



        "java programming",



        "python",

        "python",



        "python tutorial",



        "typescript",



        "algorithm",



        "database",



        "developer",

        "developer",



        "development",



        "cat",



        "dog",



        "duck"


    ];






    words.forEach(word=>{


        trie.insert(word);


    });







    const rl = readline.createInterface({



        input:process.stdin,

        output:process.stdout



    });








    rl.question(

        "Enter search text: ",

        (input)=>{



            const result =

            smartSearch(

                input,

                trie

            );






            console.log(

                "\n------ Search Results ------"

            );







            if(result.length === 0){



                console.log(

                    "No suggestions found"

                );


            }

            else{



                result.forEach(

                    (item:any,index:number)=>{



                    console.log(

`${index+1}. ${item.word}

Frequency: ${item.frequency}

Similarity: ${item.similarity}%`

                    );


                });


            }






            rl.close();


        }

    );

}