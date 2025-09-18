const titelPage = async () => {
    const bgPoster = document.getElementById('bgPoster');
    const dots = document.querySelectorAll('#dots span');
    const infoTitle = document.getElementById('infoTitle');
    const listPage = [];
    // bgPoster.style.backgroundImage = `url("img /1487.gif")`; // lodingggg

    for (let id = 1; id <= 5; id++) {
        const res = await axios.get(`https://moviesapi.ir/api/v1/movies/${id}`);
        listPage.push(res.data);
    }

    let currentIndex = 0;
    let intervalId;

    const showMovie = (index) => {
        infoTitle.innerHTML = '';

        dots.forEach((d, i) => {
            d.classList.remove("w-4", "h-4");
            d.classList.add("w-3", "h-3", "bg-white", "opacity-50");
            if (i === index) {
                d.classList.remove("w-3", "h-3", "opacity-50");
                d.classList.add("w-4", "h-4");
            }
        });

        bgPoster.style.backgroundImage = `url(${listPage[index].images[0]})`;

        const h1 = document.createElement('h1');
        h1.className = 'text-4xl font-extrabold';
        h1.innerText = listPage[index].title;

        const parentDiv = document.createElement("div");
        parentDiv.className = "flex";
        listPage[index].genres.forEach(text => {
            const childDiv = document.createElement("div");
            childDiv.className = "mx-2 border rounded-full p-1 px-2";
            childDiv.innerText = text;
            parentDiv.appendChild(childDiv);
        });

        const infoDiv = document.createElement("div");
        infoDiv.className = "w-100 font-normal";

        const para = document.createElement("p");
        para.innerText = listPage[index].plot;

        const h2 = document.createElement('h2');
        h2.className = 'text-xl font-bold';
        h2.innerText = listPage[index].released;

        infoDiv.appendChild(para);

        infoTitle.appendChild(h1);
        infoTitle.appendChild(parentDiv);
        infoTitle.appendChild(infoDiv);
        infoTitle.appendChild(h2);
    };

    showMovie(currentIndex);

    const startAutoSlide = () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % listPage.length;
            showMovie(currentIndex);
        }, 5000);
    };

    startAutoSlide();

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            clearInterval(intervalId);
            currentIndex = index;
            showMovie(currentIndex);
            startAutoSlide();
        });
    });
};



const apiMov = async (page = 1) => {
    const list = document.getElementById('list')
    try {
        const req = await axios.get(`https://moviesapi.ir/api/v1/movies?page=${page}`);
        const listPage = req.data.data
        list.innerHTML = "";

        listPage.forEach(poster => {
            const card = document.createElement("div");
            card.className = "text-white bg-[#1B1B1B] rounded-xl shadow ";

            const img = document.createElement("img");
            img.src = poster.poster
            img.alt = "Poster";
            img.className = "w-full object-cover rounded-t-xl";
            card.appendChild(img);

            const infoDiv = document.createElement("div");
            infoDiv.className = "p-3 my-4";
            infoDiv.innerHTML = `
        <h2 class="my-2">${poster.title}</h2>
        <span>${poster.genres.join(" / ")}</span>
    `;
            card.appendChild(infoDiv);

            const bottomDiv = document.createElement("div");
            bottomDiv.className = "flex items-center justify-between p-3 pb-6";

            const rateDiv = document.createElement("div");
            rateDiv.className = "flex gap-2";
            rateDiv.innerHTML = `
        <img src="img /Icon.svg" alt="star">
        <span>${poster.imdb_rating}</span>
    `;
            bottomDiv.appendChild(rateDiv);

            const btnDiv = document.createElement("div");
            btnDiv.innerHTML = `
        <a href="src/info.html?=${poster.id}" class="text-[#1C97FF] bg-[#282828] px-6 py-3 rounded-xl">View Info</a>
    `;
            bottomDiv.appendChild(btnDiv);

            card.appendChild(bottomDiv);

            list.appendChild(card);
        });

    } catch (err) {
        console.error("خطا در گرفتن داده:", err);
    }
};

const totalPages = 25;
let currentPage = 1;

const pagination = document.getElementById("pagination");

function renderPagination() {
    pagination.innerHTML = "";

    const prev = document.createElement("button");
    prev.innerHTML = "&lt;";
    prev.className = `w-8 h-8 flex items-center justify-center rounded-full ${currentPage === 1 ? "bg-[#1A1A1A] text-gray-500" : "bg-[#1A1A1A] text-white"}`;
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPagination();
        }
    };
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const page = document.createElement("button");
            page.innerText = i;
            page.className = `w-8 h-8 flex items-center justify-center rounded-full ${i === currentPage ? "bg-yellow-400 text-black font-bold" : "text-gray-400 hover:text-white"}`;
            page.onclick = () => {
                currentPage = i;
                const list = document.getElementById('list');
                list.innerHTML = ' <div class="flex items-center justify-center col-span-5"> <img src="img /1488.gif" alt="loading" class="w-20 h-20"> </div>'

                apiMov(currentPage);

                renderPagination();
            };
            pagination.appendChild(page);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const dots = document.createElement("span");
            dots.innerText = "...";
            dots.className = "text-gray-400";
            pagination.appendChild(dots);
        }
    }

    const next = document.createElement("button");
    next.innerHTML = "&gt;";
    next.className = `w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? "bg-[#1A1A1A] text-gray-500" : "bg-[#1A1A1A] text-white"}`;
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPagination();
        }
    };
    pagination.appendChild(next);
}


const searchGet = async (e) => {
    const req = await axios.get(`https://moviesapi.ir/api/v1/movies?q=${e}`);
    const listPage = req.data.data
    const search = document.getElementById('search')
    search.innerHTML= '';
    listPage.forEach(e => {
        const a = document.createElement('a')
        a.className = 'hover:bg-[#3A3A3A] flex items-center';
        a.href = `src/info.html?=${e.id}`

        const img = document.createElement('img')
        img.className = 'w-[80px]'
        img.src = e.poster;

        const div = document.createElement('div')

        const li = document.createElement('li')
        li.className = 'px-4 py-2  text-xl cursor-pointer'
        li.innerText = e.title

        const span = document.createElement('span');
        span.className = 'px-4 '
        span.innerText = e.genres.join(' / ')


        div.appendChild(li)
        div.appendChild(span)
        a.appendChild(img)

        a.appendChild(div)
        search.appendChild(a)


    });




}

const searchInput = document.getElementById('searchInput')

searchInput.addEventListener('input', (e) => {
    searchGet(e.target.value)
})





titelPage();
renderPagination();
const list = document.getElementById('list')
list.innerHTML = ' <div class="flex items-center justify-center col-span-5"> <img src="img /1488.gif" alt="loading" class="w-20 h-20"> </div>'
apiMov(1)