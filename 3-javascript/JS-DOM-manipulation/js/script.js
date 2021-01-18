
function loadTweet(data, template, container) {
    let clone = template.content.cloneNode(true);
    clone.querySelector('.profile-image').setAttribute('src', data.profileImage);
    clone.querySelector('.user-name').innerHTML = data.userName;
    clone.querySelector('.feed-item-content').innerHTML = data.content;
    clone.querySelector('.replies').innerHTML = data.replies;
    clone.querySelector('.retweets').innerHTML = data.retweets;
    clone.querySelector('.likes').innerHTML = data.likes;
    container.appendChild(clone);
}

function loadTweets() {
    let feedItemTemplate = document.getElementById('feedItemTemplate');

    let tweetContainer = document.getElementById('newsFeedContainer');
    for (let tweet of this.tweets) {
        loadTweet(tweet, feedItemTemplate, tweetContainer);
    }

    // load my top 3 tweets
    tweetContainer = document.getElementById('myTopTweetsContainer');
    for (let tweet of this.tweets.slice(0,3)) {
        loadTweet(tweet, feedItemTemplate, tweetContainer);
    }
}

function loadUserData() {
    let profileFeedDetailsTemplate = document.getElementById('profileFeedDetails');
    let clone = profileFeedDetailsTemplate.content.cloneNode(true);
    clone.querySelector('.profile-name').innerHTML = user.name;
    clone.querySelector('.subtitle').innerHTML = this.tweets.length + ' Tweets';
    document.getElementById('profileTop').appendChild(clone);
    document.getElementById('profileFeed').querySelector('.cover-image').setAttribute('src', user.coverImagePath);

    let leftProfileDetails = document.getElementById('leftProfileDetails');
    leftProfileDetails.querySelector('.profile-image').setAttribute('src', user.profileImagePath);
    clone = profileFeedDetailsTemplate.content.cloneNode(true);
    clone.querySelector('.profile-name').innerHTML = user.name;
    clone.querySelector('.subtitle').innerHTML = '@' + user.name;
    leftProfileDetails.appendChild(clone);

    let profileFeed = document.getElementById('profileFeed');
    profileFeed.querySelector('.about-me').innerHTML = user.aboutMe;
    profileFeed.querySelector('.location .grayed-text').innerHTML = user.location;
    profileFeed.querySelector('.website-link a').setAttribute('href', user.link);
    profileFeed.querySelector('.website-link a').innerHTML = user.link;

    profileFeed.querySelector('.joined-date .grayed-text').innerHTML = 'Joined ' + user.joined;

    let followContainer = document.getElementById('followContainer');
    followContainer.querySelector('.following .count').innerHTML = user.following;
    followContainer.querySelector('.followers .count').innerHTML = user.followers;
}

function handleHomeMenuItemClick() {
    document.getElementById("newsFeed").style.display = 'block';
    document.getElementById("profileFeed").style.display = 'none';
}

function handleProfileMenuItemClick() {
    document.getElementById("newsFeed").style.display = 'none';
    document.getElementById("profileFeed").style.display = 'flex';

}

window.onload = () => {
    loadUserData();
    loadTweets();
}