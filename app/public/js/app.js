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
                name
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

/*
 * Gets Main Github Details
 */
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

        const profileImage = document.getElementById("prof-img");
        profileImage.src = data["data"]["user"]["avatarUrl"];

        const profileName = document.getElementById("profile-name");
        const profileDescription = document.getElementById("profile-desc");
        const profileUserName = document.getElementById("profile-username");

        profileDescription.textContent = data["data"]["user"]["bio"];
        profileName.textContent = data["data"]["user"]["name"];
        profileUserName.textContent = github_data["username"];

    })
    .catch((err) => {
        console.log("ERR", err);
    })

/*
 * Gets Github Repository Specific Data
 */
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_details)
})
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {
        const repoList = document.getElementById("repo-list");
    
        const repoLength = data["data"]["user"]["repositories"]["totalCount"];

        for(let i = 0; i < repoLength; i++) {
            let description = data["data"]["user"]["repositories"]["nodes"][i]["description"];
            let forkCount = data["data"]["user"]["repositories"]["nodes"][i]["forkCount"];
            let name = data["data"]["user"]["repositories"]["nodes"][i]["name"];
            let stargazerCount = data["data"]["user"]["repositories"]["nodes"][i]["stargazerCount"];
            let datesArr = data["data"]["user"]["repositories"]["nodes"][i]["updatedAt"].split("-");
            let month = "";
            switch(datesArr[1]) {
                case "01" :
                    month = "Jan";
                    break;
                case "02" :
                    month = "Feb";
                    break;
                case "03" :
                    month = "Mar";
                    break;
                case "04" :
                    month = "Apr";
                    break;
                case "05" :
                    month = "May";
                    break;
                case "06" :
                    month = "Jun";
                    break;
                case "07" :
                    month = "Jul";
                    break;
                case "08" :
                    month = "Aug";
                    break;
                case "09" :
                    month = "Sept";
                    break;
                case "10" :
                    month = "Oct";
                    break;
                case "11" :
                    month = "Nov";
                    break;
                case "12" :
                    month = "Dec";
                    break;
            }

            let updatedAt = "Updated on " + datesArr[2].substr(0, 2) + " " + month;
            let primaryLanguage = ((data["data"]["user"]["repositories"]["nodes"][i]["primaryLanguage"]) != null) ? data["data"]["user"]["repositories"]["nodes"][i]["primaryLanguage"]["name"] : null;

            let repoDiv = document.createElement("div");
            let firstHr = document.createElement("hr");
            repoDiv.append(firstHr);

            let repoDetailsDiv = document.createElement("div");
            repoDetailsDiv.className = "repo-details";
            let repoName = document.createElement("p");
            repoName.id = "repo-name";
            repoName.textContent = name;
            repoDetailsDiv.append(repoName);
            let starButton = document.createElement("button");
            starButton.id = "star-repo-btn";
            starButton.className = "pull-right";
            starButton.textContent = "Star";
            repoDetailsDiv.append(starButton);
            repoDiv.append(repoDetailsDiv);

            if(description) {
                let repoDetailsDiv2 = document.createElement("div");
                repoDetailsDiv2.className = "repo-details greyed-out";
                let repoDescr = document.createElement("p");
                repoDescr.id = "repo-description";
                repoDescr.textContent = description;
                repoDetailsDiv2.append(repoDescr);
                repoDiv.append(repoDetailsDiv2);
            }
            
            let repoDetailsDiv3 = document.createElement("div");
            repoDetailsDiv3.id = "other-repo-details";
            repoDetailsDiv3.className = "repo-details greyed-out";
            if(primaryLanguage) {
                let languageEl = document.createElement("small");
                languageEl.id = "language";
                languageEl.textContent = primaryLanguage;
                repoDetailsDiv3.append(languageEl);
            }
            let starsEl = document.createElement("small");
            starsEl.id = "stars";
            starsEl.textContent = stargazerCount;
            repoDetailsDiv3.append(starsEl);
            let forksEl = document.createElement("small");
            forksEl.id = "forks";
            forksEl.textContent = forkCount;
            repoDetailsDiv3.append(forksEl);
            let lastUpdatedEl = document.createElement("small");
            lastUpdatedEl.id = "last-updated";
            lastUpdatedEl.textContent = updatedAt;
            repoDetailsDiv3.append(lastUpdatedEl);
            repoDiv.append(repoDetailsDiv3);


            let resultCount = document.getElementById("result-count");

            repoList.append(repoDiv);
            resultCount.textContent = data["data"]["user"]["repositories"]["totalCount"] + " ";
            
        }

    })
    .catch((err) => {
        console.log("ERR", err);
    })
 
/*
 * Handles searching for a specific repo by name
 */
document.getElementById("submit-search-repo").addEventListener("submit", function(event){
    event.preventDefault();

    fetch(baseUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(query_details)
    })
        .then((response) => {        
            return response.json(); 
        })
        .then((data) => {    
            const repoList = document.getElementById("repo-list");
            repoList.innerHTML = "";
    
            const repoLength = data["data"]["user"]["repositories"]["totalCount"];
    
            for(let i = 0; i < repoLength; i++) {
                let description = data["data"]["user"]["repositories"]["nodes"][i]["description"];
                let forkCount = data["data"]["user"]["repositories"]["nodes"][i]["forkCount"];
                let name = data["data"]["user"]["repositories"]["nodes"][i]["name"];
                let stargazerCount = data["data"]["user"]["repositories"]["nodes"][i]["stargazerCount"];
                let datesArr = data["data"]["user"]["repositories"]["nodes"][i]["updatedAt"].split("-");
                let month = "";
                switch(datesArr[1]) {
                    case "01" :
                        month = "Jan";
                        break;
                    case "02" :
                        month = "Feb";
                        break;
                    case "03" :
                        month = "Mar";
                        break;
                    case "04" :
                        month = "Apr";
                        break;
                    case "05" :
                        month = "May";
                        break;
                    case "06" :
                        month = "Jun";
                        break;
                    case "07" :
                        month = "Jul";
                        break;
                    case "08" :
                        month = "Aug";
                        break;
                    case "09" :
                        month = "Sept";
                        break;
                    case "10" :
                        month = "Oct";
                        break;
                    case "11" :
                        month = "Nov";
                        break;
                    case "12" :
                        month = "Dec";
                        break;
                }
    
                let updatedAt = "Updated on " + datesArr[2].substr(0, 2) + " " + month;
                let primaryLanguage = ((data["data"]["user"]["repositories"]["nodes"][i]["primaryLanguage"]) != null) ? data["data"]["user"]["repositories"]["nodes"][i]["primaryLanguage"]["name"] : null;
    
                let repoDiv = document.createElement("div");
                let firstHr = document.createElement("hr");
                repoDiv.append(firstHr);
    
                let repoDetailsDiv = document.createElement("div");
                repoDetailsDiv.className = "repo-details";
                let repoName = document.createElement("p");
                repoName.id = "repo-name";
                repoName.textContent = name;
                repoDetailsDiv.append(repoName);
                let starButton = document.createElement("button");
                starButton.id = "star-repo-btn";
                starButton.className = "pull-right";
                starButton.textContent = "Star";
                repoDetailsDiv.append(starButton);
                repoDiv.append(repoDetailsDiv);
    
                if(description) {
                    let repoDetailsDiv2 = document.createElement("div");
                    repoDetailsDiv2.className = "repo-details greyed-out";
                    let repoDescr = document.createElement("p");
                    repoDescr.id = "repo-description";
                    repoDescr.textContent = description;
                    repoDetailsDiv2.append(repoDescr);
                    repoDiv.append(repoDetailsDiv2);
                }
                
                let repoDetailsDiv3 = document.createElement("div");
                repoDetailsDiv3.id = "other-repo-details";
                repoDetailsDiv3.className = "repo-details greyed-out";
                if(primaryLanguage) {
                    let languageEl = document.createElement("small");
                    languageEl.id = "language";
                    languageEl.textContent = primaryLanguage;
                    repoDetailsDiv3.append(languageEl);
                }
                let starsEl = document.createElement("small");
                starsEl.id = "stars";
                starsEl.textContent = stargazerCount;
                repoDetailsDiv3.append(starsEl);
                let forksEl = document.createElement("small");
                forksEl.id = "forks";
                forksEl.textContent = forkCount;
                repoDetailsDiv3.append(forksEl);
                let lastUpdatedEl = document.createElement("small");
                lastUpdatedEl.id = "last-updated";
                lastUpdatedEl.textContent = updatedAt;
                repoDetailsDiv3.append(lastUpdatedEl);
                repoDiv.append(repoDetailsDiv3);
    
    
                let searchRepoInput = document.getElementById("search-repo");
                let resultCount = document.getElementById("result-count");
    
                if(searchRepoInput.value === name) {
                    repoList.append(repoDiv);
                    resultCount.textContent = "1 "
                    break;
                }
                else if(searchRepoInput.value === "" || searchRepoInput.value === " " || searchRepoInput.value === null) {
                    repoList.append(repoDiv);
                    resultCount.textContent = data["data"]["user"]["repositories"]["totalCount"] + " ";
                }
                else {
                    resultCount.textContent = "0 "
                }  
                
                
            }
    
        })
        .catch((err) => {
            console.log("ERR", err);
        })

});

/*
 * Handles clicking on Hamburger
 */
document.getElementById("hamburger").addEventListener("click", function(){
    let x = document.getElementById("nav-other");
    if (x.className === "nav-other") {
        x.className += " responsive";
    } else {
        x.className = "nav-other";
    }
});
