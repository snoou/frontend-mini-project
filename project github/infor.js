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
