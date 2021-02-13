
// Callback example
// ---------------------
const getBeef = (callback) => {
    // Do some logic
    // End logic
    callback('Great Beef');
}

const cookBeef = (beef, callback) => {
    // Do some logic
    // End logic
    callback(`Cooked ${beef}`);
}

// const getBuns = (cookedBeef, callback) => {
//     // Do some logic
//     // End logic
//     callback(`Warm Buns ${cookedBeef}`);
// }

function callServerTakesTimeExample(cookedBeef, callback) {
    setTimeout(function() {
        alert('Called server took time');
        let serverResult = 'server result';
        callback(`${serverResult}`);
    }, 5000);

}

const getBuns = (cookedBeef, callback) => {
    callServerTakesTimeExample(cookedBeef, callback);
}


const putBeefBetweenBuns = (beef, buns, callback) => {
    // do some logic
    // End logic
    callback(`${beef} ${buns} burger is ready callback`);
}

const makeBurgerCallBack = nextStep => {
    getBeef(function (beef) {
        cookBeef(beef, function (cookedBeef) {
            getBuns(cookedBeef, function (buns) {
                putBeefBetweenBuns(buns, beef, function (burger) {
                    nextStep(burger)
                })
            })
        })
    })
}

// callback hell example - need many nested try-catch, flow very hard to follow
// const makeBurgerCallBack = nextStep => {
//     try {
//         callServer();
//         getBeef(function (beef) {
//             cookBeef(beef, function (cookedBeef) {
//                 try {
//                     getBuns(cookedBeef, function (buns) {
//                         getBeefBetweenBuns(buns, beef, function (burger) {
//                             nextStep(burger)
//                         })
//                     })
//                 } catch (err) {
//                     // handle
//                 }
//             })
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }

makeBurgerCallBack((burger) => {
    console.log(`callback ${burger}`);
})



// Promise example
// ---------------------
function goToTheButcher() {
    setTimeout(function() {
        alert('I went to the butcher');
    }, 3000);
}

const getBeefP = () => {
    // Do some logic
    // End logic
    return new Promise(resolve => {
        resolve('Great Beef');
    })
}

const cookBeefP = (beef) => {
    // Do some logic
    // End logic
    return new Promise(resolve => {
        resolve(`Cooked ${beef}`);
    })
}

const getBunsP = (cookedBeef) => {
    // Do some logic
    // End logic
    return new Promise(resolve => {
        resolve(`Warm buns ${cookedBeef}`);
    })
}

const putBeefBetweenBunsP = (food) => {
    // Do some logic
    // End logic
    return new Promise(resolve => {
        resolve(`${food} burger is ready`);
    })
}

const makeBurgerPromise = () => {
    getBeefP()
        .then(result => {
            return cookBeefP(result);
        })
        .then(result => {
            return getBunsP(result);
        })
        .then(result => {
            // setTimeout(function() {
            //
            // }, 3000);
            return putBeefBetweenBunsP(result);
        })
        .then(result => {
            console.log(`Promise Burger!!! ${result}`);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
}

makeBurgerPromise();



// Promise all example
// ---------------------
const makeBurgerPromiseAll = () => {
    Promise.all([getBeefP, cookBeefP, getBunsP, putBeefBetweenBunsP])
        .then(values => {
            // run some code here
        })
}



// Async example
// ---------------------
const makeBurgerAsyncAwait = async () => {
    try {
        const beef = await getBeefP();
        const cookedBeef = await cookBeefP(beef);
        const bunsWithBeef = await getBunsP(cookedBeef);
        const readyBurger = await putBeefBetweenBunsP(bunsWithBeef);
        console.log(`Async Await ${readyBurger}`);
    }
    catch (err) {
        console.log(err)
    }
}

makeBurgerAsyncAwait();


// fetch & axios example
// ---------------------
const getUserDataAxios = async () => {
    let userData = await axios('./data/userData.json');
    console.log(userData.data);
}

const getUserDataFetch = async () => {
    fetch('./data/userData.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}


// Custom promise example
// ---------------------
// class TweetAPI {
//     static getTweets = () => {
//         return new Promise((resolve, reject) => {
//             try {
//                 let tweetsData = localStorage.getItem('tweets');
//                 resolve(JSON.parse(tweetsData));
//             }
//             catch (err) {
//                 reject(err);
//             }
//         })
//     }
// }
