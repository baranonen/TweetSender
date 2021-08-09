var Twit = require('twit')

var T

function loaded() {
    keyCheck()
	document.getElementById("mainScreen").style.display = "block"
}

function keyCheck() {
	if (localStorage.getItem('consumerKey') && localStorage.getItem('consumerSecret') && localStorage.getItem('accessToken') && localStorage.getItem('accessTokenSecret')) {
		document.getElementById("keyError").style.display = "none"
		document.getElementById("sendButton").disabled = false
		document.getElementById("tweetInput").disabled = false
		document.getElementById("consumerKey").value = localStorage.getItem("consumerKey")
		document.getElementById("consumerSecret").value = localStorage.getItem("consumerSecret")
		document.getElementById("accessToken").value = localStorage.getItem("accessToken")
		document.getElementById("accessTokenSecret").value = localStorage.getItem("accessTokenSecret")
		T = new Twit({
			consumer_key:         localStorage.getItem("consumerKey"),
			consumer_secret:      localStorage.getItem("consumerSecret"),
			access_token:         localStorage.getItem("accessToken"),
			access_token_secret:  localStorage.getItem("accessTokenSecret"),
			timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
			strictSSL:            true,     // optional - requires SSL certificates to be valid.
		  })
	} else {
		document.getElementById("keyError").style.display = "block"
		document.getElementById("sendButton").disabled = true
		document.getElementById("tweetInput").disabled = true
	}
}

function openSettings() {
	document.getElementById("mainScreen").style.display = "none"
	document.getElementById("settingsScreen").style.display = "block"
}

function userMainPage() {
	if (confirm("If you exit this page, keys that are not saved will be deleted. Are you sure?")) {
		document.getElementById("mainScreen").style.display = "block"
		document.getElementById("settingsScreen").style.display = "none"
	}
}

function mainPage() {
	document.getElementById("mainScreen").style.display = "block"
	document.getElementById("settingsScreen").style.display = "none"
}

function saveKeys() {
	localStorage.setItem('consumerKey', document.getElementById("consumerKey").value);
	localStorage.setItem('consumerSecret', document.getElementById("consumerSecret").value);
	localStorage.setItem('accessToken', document.getElementById("accessToken").value);
	localStorage.setItem('accessTokenSecret', document.getElementById("accessTokenSecret").value);
	keyCheck()
	alert("Keys Saved")
	mainPage()
}

function deleteAllKeys() {
	if (confirm('Are you sure you want to delete all API keys?')) {
		localStorage.clear()
		document.getElementById("consumerKey").value = ""
		document.getElementById("consumerSecret").value = ""
		document.getElementById("accessToken").value = ""
		document.getElementById("accessTokenSecret").value = ""
		keyCheck()
		alert("Keys deleted")
		mainPage()
	}
}

function sendTweet() {
	T.post('statuses/update', { status: document.getElementById("tweetInput").value }, function() {
		document.getElementById("tweetInput").value = ""
		alert("Tweet sent!")
	})
}

module.exports.loaded = loaded
module.exports.keyCheck = keyCheck
module.exports.openSettings = openSettings
module.exports.userMainPage = userMainPage
module.exports.mainPage = mainPage
module.exports.saveKeys = saveKeys
module.exports.deleteAllKeys = deleteAllKeys
module.exports.sendTweet = sendTweet