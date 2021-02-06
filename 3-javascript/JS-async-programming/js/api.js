
// TODO: While the data did not get to the screen need to show a basic loading gif/image/text

class TweetAPI {
    static getTweets = () => {
        return new Promise((resolve, reject) => {
            try {
                let tweetsData = JSON.parse(localStorage.getItem('tweets'));

                // Note: simulating delay
                // TODO: is this the correct way to add delay to a promise?
                // TODO: will the catch below handle an error created inside the timeout?
                setTimeout(function() {
                    resolve(tweetsData);
                }, 1000);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static addTweet = (tweet) => {
        return new Promise((resolve, reject) => {
            try {
                let tweetsData = JSON.parse(localStorage.getItem('tweets'));
                let newTweetId = tweetsData === null ? 0 : tweetsData.length;
                let updatedTweetsData = tweetsData === null ?
                    [{id: newTweetId, tweet }] :
                    [...tweetsData, {id: newTweetId, tweet}]
                localStorage.setItem('tweets', JSON.stringify(updatedTweetsData));

                // Note: simulating delay
                setTimeout(function() {
                    resolve(newTweetId);
                }, 1000);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static updateTweet = (id, fieldsToUpdate) => {
        return new Promise( (resolve, reject) => {
            try {
                let tweetsData = JSON.parse(localStorage.getItem('tweets'));
                let tweetToUpdate = tweetsData[id].tweet;
                tweetsData[id].tweet = Object.assign(tweetToUpdate, fieldsToUpdate);
                localStorage.setItem('tweets', JSON.stringify(tweetsData));
                // Note: simulating delay
                setTimeout(function() {
                    resolve(id);
                }, 1000);

            }
            catch (err) {
                reject(err);
            }
        })
    }
}
