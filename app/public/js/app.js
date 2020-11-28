const baseUrl = "https://api.github.com/graphql";

const github_data = {
    "token" : atob("ODg2ODlmM2IxMjg2ZTkzNjMxMGIxMGVhZjg4NmU4YTBiNWNlYTQ4ZQ=="),
    "username" : "tege3000"
}

const query_details = {
    "query" : `
        query { 
            user(login: "${github_data["username"]}") {
                avatarUrl
                bio
                repositories(first: 20) {
                    totalCount
                    nodes{
                    name
                    description
                    primaryLanguage {
                        name
                    }
                    stargazerCount 
                    forkCount
                    updatedAt
                    }
                }
            }
        }
    `
};

const headers =  {
    "Content-Type" : "application/json",
    Authorization : "bearer " + github_data["token"],
}

fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_details)
})
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {
        console.log(data);
        const profilePicIcon = document.createElement("img");
        const profileIcon = document.getElementById("has-icon-profile");
        profilePicIcon.className = "icon profile";
        profilePicIcon.src = data["data"]["user"]["avatarUrl"];
        profileIcon.prepend(profilePicIcon);
    })
    .catch((err) => {
        console.log("ERR", err);
    })