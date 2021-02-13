function showEditProfileForm() {
    document.querySelector('.edit-profile-form').style.display= 'flex';
    addCssClass('body', 'noscroll');
    addCssClass('body', 'noclicks');
    // TODO: check why scrolling does not work on the modal form
    addCssClass('editProfileForm', 'overlay');
}

function hideEditProfileForm() {
    document.querySelector('.edit-profile-form').style.display= 'none';
    removeCssClass('editProfileForm', 'overlay');
    removeCssClass('body', 'noscroll');
    removeCssClass('body', 'noclicks');
}

function fillEditProfileInput(id, value, maxLength) {
    let inputElement = document.getElementById(id);
    inputElement.innerHTML = value;
    inputElement.addEventListener('input', onEditProfileKeyUp);
    inputElement.parentNode.querySelector('.filled-chars').innerHTML = value.length;
    inputElement.parentNode.querySelector('.max-chars').innerHTML = maxLength;
}

function getEditProfileInput(id) {
    let inputElement = document.getElementById(id);
    return inputElement.value;
}

function onEditProfileKeyUp() {
    let value = this.value;
    let maxChars = this.parentNode.querySelector('.max-chars').innerHTML;
    if (value.length > maxChars) {
        value = value.substring(0, maxChars);
        this.value = value;
    }
    let charCounterElement = this.parentNode.querySelector('.chars-counter');
    charCounterElement.querySelector('.filled-chars').innerHTML = value.length;
}

// TODO: also update the other view in Home or in Profile
function toggleLike(img) {
    let updatedLikesValue = false;
    if (img.alt === "Like") {
        setUnlikeImage(img);
        updatedLikesValue = true;
    } else {
        setLikeImage(img);
    }
    // Save to localstorage
    let tweetId = img.parentNode.parentNode.parentNode.dataset.tweetId;
    TweetAPI.updateTweet(tweetId, { likes: updatedLikesValue})
        .then(response => {
            console.log(`Updated like value of tweet ${response}`);
        })
        .catch(err => {
            alert(`Toggle like error: ${err}`);
        })
}

function setLikeImage(img) {
    img.src = "assets/like.svg";
    img.alt = "Like";
}

function setUnlikeImage(img) {
    img.src = "assets/heart.svg";
    img.alt = "Unlike";
}

function createTweetElement(data, template) {
    let clone = template.content.cloneNode(true);
    clone.querySelector('.feed-item').dataset.tweetId = data.id;

    let tweetData = data.tweet;
    clone.querySelector('.profile-image').setAttribute('src', tweetData.profileImage);
    clone.querySelector('.user-name').innerHTML = tweetData.userName;
    clone.querySelector('.feed-item-content').innerHTML = tweetData.content;
    let likeImage = clone.querySelector('.feed-item-action-img');
    if (tweetData.likes) {
        setUnlikeImage(likeImage);
    } else {
        setLikeImage(likeImage);
    }
    // clone.querySelector('.replies').innerHTML = data.replies;
    // clone.querySelector('.retweets').innerHTML = data.retweets;
    // clone.querySelector('.likes').innerHTML = data.likes;
    return clone;
}

function addTweetAsFirstChildOfContainer(data, template, container) {
    let clone = createTweetElement(data, template);
    // container.appendChild(clone);
    container.insertBefore(clone, container.firstChild);
}

// Returning number of loaded tweets
function loadTweets(tweets) {
    let feedItemTemplate = document.getElementById('feedItemTemplate');
    let tweetContainer = document.getElementById('newsFeedContainer');
    let firstFeedItem = document.getElementById('newsFeedContainer').firstElementChild;
    let lastTweetId = firstFeedItem === null ? -1 : firstFeedItem.dataset.tweetId;
    let tweetsAdded = 0;
    console.log(`Last tweet id: ${lastTweetId}`);

    if (!tweets) {
        return 0;
    }

    for (let tweet of tweets) {
        if (tweet.id > lastTweetId ) {
            addTweetAsFirstChildOfContainer(tweet, feedItemTemplate, tweetContainer);
            console.log(`Added tweet id ${tweet.id}`);
            tweetsAdded++;
        }
    }
    console.log(`Added ${tweetsAdded} tweets`);

    // TODO: the code below could be optimized
    // load my top 3 tweets into my profile
    tweetContainer = document.getElementById('myTopTweetsContainer');
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.lastChild);
    }
    for (let tweet of tweets.slice(-3)) {
        addTweetAsFirstChildOfContainer(tweet, feedItemTemplate, tweetContainer);
        console.log(`Added top tweet id ${tweet.id}`);
    }

    return tweetsAdded;
}

// TODO: remove commented code below
// function loadTweetsFromGlobalVar() {
//     loadTweets(this.tweets);
// }

function loadTweetsFromLocalStorage() {
    TweetAPI.getTweets()
        .then(response => {
            loadTweets(response);
        })
        .catch(err => {
            alert(`Error in loading tweets: ${err}`);
        })
}

function isBlank(str) {
    return (!str || str.trim().length === 0);
}

function enableButton(btn) {
    btn.classList.remove('clicked');
    btn.disabled = false;
}

function disableButton(btn) {
    btn.disabled = true;
    btn.classList.add('clicked');
}

const loadNewTweetsP = () => {
    return new Promise( (resolve, reject) =>
    {
        TweetAPI.getTweets()
            .then(response => {
                resolve(loadTweets(response));
            })
            .catch(err => {
                reject(err);
            })
    })
}

function addTweet(btn) {
    let content = document.getElementById('tweetTextArea');
    if (isBlank(content.value)) {
        return;
    }
    console.log(`Adding tweet with content: ${content.value}`);
    disableButton(btn);
    let tweet =
    {
        profileImage : user.profileImagePath,
        userName: user.name,
        content: content.value,
        like: false
    }
    content.value = '';
    TweetAPI.addTweet(tweet)
        .then(newTweetId => {
            console.log(`Tweet saved successfully via API with new id ${newTweetId}`);
            return loadNewTweetsP();
        })
        .then(tweetsAdded => {
            console.log(`Loaded ${tweetsAdded} tweets since last tweet id`);
            enableButton(btn);
        })
        .catch(err => {
            alert(`addTweet error=${err}`);
            enableButton(btn);
        })
}

function addCssClass(id, className) {
    document.getElementById(id).classList.add(className);
}

function removeCssClass(id, className) {
    document.getElementById(id).classList.remove(className);
}

function validateProfileData(name, bio, location) {
    // TODO: add display why the fields are not validated
    if (name.length < 3) {
        addCssClass("edit-profile-name", "invalid-text");
        return false;
    } else {
        removeCssClass("edit-profile-name", "invalid-text");
    }
    if (bio.length < 30) {
        addCssClass("edit-profile-bio", "invalid-text");
       return false;
    } else {
        removeCssClass("edit-profile-bio", "invalid-text");
    }
    if (location.length < 5) {
        addCssClass("edit-profile-location", "invalid-text");
        return false;
    } else {
        removeCssClass("edit-profile-location", "invalid-text");
    }
    return true;
}

function saveUserData() {
    let name = getEditProfileInput('edit-profile-name');
    let bio = getEditProfileInput('edit-profile-bio');
    let location = getEditProfileInput('edit-profile-location');
    if (!validateProfileData(name, bio, location)) {
        return;
    }
    user.name = name;
    user.aboutMe = bio;
    user.location = location;
    loadUserData();
    hideEditProfileForm();
}

function loadUserData() {
    let profileFeedDetailsTemplate = document.getElementById('profileFeedDetails');
    let clone = profileFeedDetailsTemplate.content.cloneNode(true);
    clone.querySelector('.profile-name').innerHTML = user.name;
    clone.querySelector('.subtitle').innerHTML = this.tweets.length + ' Tweets';
    let profileHeader = document.getElementById('profileHeader');
    let existingProfileDetails = document.getElementById('profileHeader').querySelector('.details');
    if (existingProfileDetails) {
        profileHeader.replaceChild(clone, existingProfileDetails);
    } else {
        profileHeader.appendChild(clone);
    }
    document.getElementById('profileFeed').querySelector('.profile-container').querySelector('.profile-background-image').style.setProperty('background-image', "url(" + user.coverImagePath + ")");
    document.getElementById('profileFeed').querySelector('.edit-profile-form').querySelector('.profile-background-image').style.setProperty('background-image', "url(" + user.coverImagePath + ")");
    document.getElementById('editProfileImage').setAttribute('src', user.profileImagePath);
    fillEditProfileInput('edit-profile-name', user.name, 50);
    fillEditProfileInput('edit-profile-bio', user.aboutMe, 160);
    fillEditProfileInput('edit-profile-location', user.location, 30);

    let leftProfileDetails = document.getElementById('leftProfileDetails');
    leftProfileDetails.querySelector('.profile-image').setAttribute('src', user.profileImagePath);
    clone = profileFeedDetailsTemplate.content.cloneNode(true);
    clone.querySelector('.profile-name').innerHTML = user.name;
    clone.querySelector('.subtitle').innerHTML = '@' + user.name;
    existingProfileDetails = leftProfileDetails.querySelector('.details');
    if (existingProfileDetails) {
        leftProfileDetails.replaceChild(clone, existingProfileDetails)
    } else {
        leftProfileDetails.appendChild(clone);
    }

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
    // TODO: remove commented code below
    // loadTweetsFromGlobalVar();
    loadTweetsFromLocalStorage();
}