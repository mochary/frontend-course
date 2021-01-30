function showEditProfileForm() {
    document.querySelector('.edit-profile-form').style.display= 'flex';
}

function hideEditProfileForm() {
    document.querySelector('.edit-profile-form').style.display= 'none';
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
    let profileHeader = document.getElementById('profileTop');
    let existingProfileDetails = document.getElementById('profileTop').querySelector('.details');
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
    loadTweets();
}