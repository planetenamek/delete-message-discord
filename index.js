// Turn on Developer Mode under User Settings > Appearance > Developer Mode (at the bottom)
// Then open the channel you wish to delete all of the messages (could be a DM) and click the three dots on the far right.
// Click "Copy ID" and paste that instead of LAST_MESSAGE_ID.
// Copy / paste the below script into the JavaScript console.
// If you're in a DM you will receive a 403 error for every message the other user sent (you don't have permission to delete their messages).

var before = '637610565040078859';
clearMessages = function(){
	const channel = window.location.href.split('/').pop();
	const baseURL = `https://discordapp.com/api/channels/${channel}/messages`;
	const headers = {"Authorization": "NDUyOTA0NjgwMDM3ODEwMTc2.XpJjXA.EKCYjav18nltIJonlbFOwjLZN-8" };

	let clock = 0;
	let interval = 500;

	function delay(duration) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), duration);
		});
	}

	fetch(baseURL + '?before=' + before + '&limit=100', {headers})
		.then(resp => resp.json())
		.then(messages => {
		return Promise.all(messages.map((message) => {
			before = message.id;
			return delay(clock += interval).then(() => fetch(`${baseURL}/${message.id}`, {headers, method: 'DELETE'}));
		}));
	}).then(() => clearMessages());
}
clearMessages();
