const baseUrl = "https://api.github.com/graphql";

const github_data = {
    "token" : "78f0dc3ce341e01e770c15b44101c273467fb5d5",
    "username" : "tege3000"
}

const query_repositories = {
    "query" : `
        query { 
            user(login: "${github_data["username"]}") {
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
    body: JSON.stringify(query_repositories)
})
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log("ERR", err);
    })