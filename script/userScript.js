let curUser = "";
let reposPerPage = 10;
let currentPage = 1;

const fetchUserDetails = async (username) => {
	const url = `https://api.github.com/users/${username}`;
	const user = await fetch(url).then((res) => res.json());
	console.log(user);
	//check if user exists
	if (user.message === "Not Found") {
		alert("User not found");
		window.history.back();
	}
	displayBasicUserDetails(user);
	fetchUserRepos(username);
	displayPagination(user.public_repos, reposPerPage);
};
const fetchUserRepos = async (username) => {
	const url = `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${currentPage}`;
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
	bio.innerHTML = user.bio ? user.bio : "<i>No bio available</i>";
	followers.innerHTML = user.followers ? user.followers : "<i>0</i>";
	following.innerHTML = user.following ? user.following : "<i>0</i>";
	repos.innerHTML = user.public_repos ? user.public_repos : "<i>0</i>";
	location.innerHTML = user.location
		? user.location
		: "<i> Location not Available</i>";

	if (user.twitter_username) {
		twitter.innerHTML = `<a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username}</a>`;
	}
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
const displayPagination = (totalRepos, perPage) => {
	const paginationList = document.getElementById("pages");
	if (!paginationList) {
		console.error("Pagination container not found.");
		return;
	}

	const totalPages = Math.ceil(totalRepos / perPage);
	paginationList.innerHTML = "";

	for (let i = 1; i <= totalPages; i++) {
		const li = document.createElement("li");
		li.textContent = i;
		li.onclick = () => changePage(i);
		paginationList.appendChild(li);
	}
};

const changePage = (page) => {
	console.log("Page changed to", page);
	if (page === currentPage) return;
	currentPage = page;
	fetchUserRepos(curUser);
};

document.addEventListener("DOMContentLoaded", function () {
	// Extract username from the URL
	const urlParams = new URLSearchParams(window.location.search);
	const username = urlParams.get("username");
	if (username) {
		curUser = username;
		fetchUserDetails(username);
		const title = document.getElementsByTagName("title")[0];
		title.innerHTML = `${username} | GitHub Profile`;
	} else {
		alert("Please enter a valid GitHub username.");
		window.history.back();
	}
});
