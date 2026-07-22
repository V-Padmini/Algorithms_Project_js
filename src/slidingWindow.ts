import readline from "readline";


export function runSlidingWindow() {


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });



    rl.question(
        "Enter numbers separated by space: ",
        (input) => {


            const arr =
                input
                .split(" ")
                .map(Number);



            rl.question(
                "Enter window size: ",
                (windowInput) => {


                    const k =
                        Number(windowInput);



                    const result =
                        maxSlidingWindow(
                            arr,
                            k
                        );


                    console.log("\nMaximum Sum:", result.maxSum);

                    console.log(
                        "Best Window:",
                        result.window
                    );


                    rl.close();

                }
            );


        }
    );

}





function maxSlidingWindow(
    arr:number[],
    k:number
) {


    let windowSum = 0;


    // Calculate first window

    for(
        let i = 0;
        i < k;
        i++
    ){

        windowSum += arr[i];

    }



    let maxSum =
        windowSum;


    let startIndex = 0;



    // Slide the window

    for(
        let i = k;
        i < arr.length;
        i++
    ){


        windowSum += arr[i];


        windowSum -= arr[i-k];



        if(windowSum > maxSum){

            maxSum =
                windowSum;


            startIndex =
                i-k+1;

        }

    }



    return {

        maxSum,

        window:
            arr.slice(
                startIndex,
                startIndex+k
            )

    };


}