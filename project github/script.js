let lastQuery = "";

document.getElementById("searchInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchUsers();
  }
});

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.querySelector(".clear-btn").style.display = "none"; // مخفی کردن دکمه
}

document.getElementById('clear-btn').addEventListener('click' , clearResults)

async function searchUsers() {
  const query = document.getElementById("searchInput").value.trim();
  const warningDiv = document.getElementById("warning");

  if (!query) {
    warningDiv.style.display = "flex";
    setTimeout(() => {
      warningDiv.style.display = "none";
    }, 1000);
    return;
  } 
  lastQuery = query;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  showLoader();

  try {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await res.json();

    hideLoader();

    if (data.items && data.items.length > 0) {
      document.querySelector(".clear-btn").style.display = "block"; // نمایش دکمه
    }

    data.items?.forEach(user => {
      const div = document.createElement("div");
      div.className = "user-card";

      const img = document.createElement("img");
      img.src = user.avatar_url;
      img.alt = user.login;

      const h3 = document.createElement("h3");
      h3.textContent = user.login;

      const more = document.createElement("a");
      more.innerHTML = 'More'


      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(more)
      more.href = `information.html?username=${user.login}`;
      resultsDiv.appendChild(div);
    });
  } catch (error) {
    console.error("Search error:", error);
    hideLoader();
  }
}

document.getElementById('search-btn').addEventListener('click' , searchUsers)



// information


    function getUsernameFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get("username");
    }

  
    async function loadUserDetails(username) {
      const backToSearch = document.getElementById("backToSearch");

      
     
      try {
        const detailsRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await detailsRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
        const repos = await reposRes.json();

       if (user.hireable){
        backToSearch.innerHTML = `  
        <a href="index.html">Back To Search</a>
          <span id="">hireable : <i class="fas fa-check" style="font-size: 24px; color: green;"></i> </span>`
       }else{
      backToSearch.innerHTML= `
       <a href="index.html">Back To Search</a>
        <span id="">hireable : <i class="fa fa-times"></i></span>
      `
       }

       const prof = document.getElementById('prof');
       prof.innerHTML= `
        <img src=${user.avatar_url}
              class="round-img" alt style="width: 150px;">
            <span>${user.name}</span>
            <span>${user.location}</span>
       `

       const bio = document.getElementById('bio')
       bio.innerHTML=`
       <h3>Bio:</h3>
            <p>${user.bio}</p>
            <a href='${user.html_url}'>Visit Github Page</a>
            <p>Login :${user.login}</p>
            <p>Company :${user.company}</p>
          </div>
       `

       const card = document.getElementById('card');
       card.innerHTML=`
       <div class="badge badge-primary">Followers: ${user.followers}</div>
          <div class="badge badge-light">Folloing : ${user.following}</div>
          <div class="badge badge-success">Public Repos : ${user.public_repos}</div>
          <div class="badge badge-dark">Public Gists : ${user.public_gists}</div>
       `
       const reposDiv = document.getElementById('repo')
        repos.forEach(repo => {
          const divRepo = document.createElement('div')
          divRepo.className = 'rep'
          divRepo.innerHTML=`<a href= ${repo.html_url} >${repo.name}</a>`
          
          reposDiv.appendChild(divRepo)
        });
      } catch (error) {
        console.error("User details error:", error);
        
      }
    }
  

    const username = getUsernameFromURL();
    if (username) {
      loadUserDetails(username);
    } else {
      document.getElementById('box-center').innerText = "No user specified.";
    }
