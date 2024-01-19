const fetchUserDetails = async (username) => {
	const url = `https://api.github.com/users/${username}`;
	const user = await fetch(url).then((res) => res.json());
	console.log(user);
	displayBasicUserDetails(user);
	fetchUserRepos(username);
};
const fetchUserRepos = async (username) => {
	const url = `https://api.github.com/users/${username}/repos`;
	const repos = await fetch(url).then((res) => res.json());
	console.log(repos);
	displayRepos(repos);
};

const displayBasicUserDetails = (user) => {
	const avatar = document.getElementById("avatar");
	const name = document.getElementById("name");
	const username = document.getElementById("username");
	const bio = document.getElementById("bio");
	const followers = document.getElementById("followers");
	const following = document.getElementById("following");
	const repos = document.getElementById("repos");
	const location = document.getElementById("location");
	const blog = document.getElementById("blog");
	const twitter = document.getElementById("twitter");
	const github = document.getElementById("github");

	const defaultAvatarUrl = "/assests/avatar.png";

	avatar.src = user.avatar_url || defaultAvatarUrl;
	name.innerHTML = user.name ? user.name : "<i>Not Available</i>";
	username.innerHTML = user.login ? user.login : "<i>Not Available</i>";
	bio.innerHTML = "Bio: " + (user.bio ? user.bio : "<i>No bio available</i>");
	followers.innerHTML = user.followers ? user.followers : "<i>0</i>";
	following.innerHTML = user.following ? user.following : "<i>0</i>";
	repos.innerHTML = user.public_repos ? user.public_repos : "<i>0</i>";
	location.innerHTML =
		"Location: " + (user.location ? user.location : "<i>Not Available</i>");
	blog.innerHTML =
		"Blog: " + (user.blog ? user.blog : "<i>Not Available</i>");
	twitter.innerHTML =
		"Twitter: " +
		(user.twitter_username ? user.twitter_username : "<i>Not Available</i>");
	github.innerHTML = user.html_url
		? `<a href="${user.html_url}" target="_blank">Github Profile</a>`
		: "<i>Not Available</i>";
};
const displayRepos = (repos) => {
	const reposContainer = document.getElementById("repos");
	let reposHTML = "";
	repos.forEach((repo) => {
		reposHTML += `<div class="repo">
            <h3>${repo.name}</h3>
            <p>${
							repo.description ? repo.description : "<i>No description</i>"
						}</p>
            <div class="repo-details">
                ${
									repo.topics.length !== 0
										? `<p>${repo.topics
												.map(
													(topic) => `<span class="repo-topic">${topic}</span>`
												)
												.join("")}</p>`
										: ""
								}
            </div>
        </div>`;
	});
	reposContainer.innerHTML = reposHTML;
};

document.addEventListener("DOMContentLoaded", function () {
	// Extract username from the URL
	const urlParams = new URLSearchParams(window.location.search);
	const username = urlParams.get("username");
	if (username) {
		fetchUserDetails(username);
	} else {
		alert("Please enter a valid GitHub username.");
		window.history.back();
	}
});
