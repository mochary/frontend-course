function loadTweets() {
    let tweetContainer = document.getElementById('news-feed-container');
    let template = document.getElementById('feed-item-template');
    for (let tweet of this.tweets) {
        let clone = template.content.cloneNode(true);
        clone.querySelector('.profile-image').setAttribute('src', tweet.profileImage);
        clone.querySelector('.user-name').innerHTML = tweet.userName;
        clone.querySelector('.feed-item-content').innerHTML = tweet.content;
        clone.querySelector('.replies').innerHTML = tweet.replies;
        clone.querySelector('.retweets').innerHTML = tweet.retweets;
        clone.querySelector('.likes').innerHTML = tweet.likes;
        tweetContainer.appendChild(clone);
    }
}

function loadUserData() {

}

window.onload = () => {
    loadUserData();
    loadTweets();
}

function handleHomeMenuItemClick() {
    document.getElementById("newsFeed").style.display = 'block';
    document.getElementById("profileFeed").style.display = 'none';
}

function handleProfileMenuItemClick() {
    document.getElementById("newsFeed").style.display = 'none';
    document.getElementById("profileFeed").style.display = 'block';

}