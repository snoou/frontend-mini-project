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

