
function redirectToUserDetails() {
	const username = document.getElementById("username").value;
	if (username.trim() !== "") {
		window.location.href = `/user.html?username=${username}`;
	} else {
		alert("Please enter a valid GitHub username.");
	}
}
