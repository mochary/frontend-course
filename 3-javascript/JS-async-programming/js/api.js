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
                }, 2000);
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
                let updatedTweetsData = tweetsData === null ?
                    [{id: 0, tweet }] :
                    [...tweetsData, {id: tweetsData.length, tweet}]
                localStorage.setItem('tweets', JSON.stringify(updatedTweetsData));

                // Note: simulating delay
                setTimeout(function() {
                    resolve('success');
                }, 2000);
            }
            catch (err) {
                reject(err);
            }
        })
    }
}
