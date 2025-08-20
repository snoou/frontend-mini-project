const Api = 'https://www.themealdb.com/api/json/v1/1/random.php';

async function getData(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

function rename(meal) {
    const { strMeal, strCategory, strArea, strMealThumb, strYoutube, strTags, strInstructions } = meal;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                ing: ingredient,
                measure: meal[`strMeasure${i}`]
            });
        }
    }

    const instructions = strInstructions
        ? strInstructions.split("\r\n").filter(line => line.trim() !== '')
        : [];

    return {
        name: strMeal,
        category: strCategory,
        area: strArea,
        youtube: strYoutube,
        thumb: strMealThumb,
        instructions,
        ingredients,
        tags: strTags ? strTags.split(',') : []
    };
}

async function run() {
    const res = await getData(Api);
    if (!res || !res.data || !res.data.meals || res.data.meals.length === 0) {
        console.error('No meals found');
        return;
    }
    const mealData = rename(res.data.meals[0]);
    document.getElementById('relod').addEventListener('click', run)
    document.getElementById('imgFood').src = mealData.thumb
    document.getElementById('nameFood').textContent = mealData.name

    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = "";

    const categorySpan = document.createElement("span");
    categorySpan.className = "bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm";
    categorySpan.textContent = mealData.category;
    infoDiv.appendChild(categorySpan);

    const areaSpan = document.createElement("span");
    areaSpan.className = "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm";
    areaSpan.textContent = mealData.area;
    infoDiv.appendChild(areaSpan);

    mealData.tags.forEach(tag => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm";
        tagSpan.textContent = tag;
        infoDiv.appendChild(tagSpan);
    });


    const ingredient = document.getElementById('ingredient')
    ingredient.innerHTML = ''

    mealData.ingredients.forEach(ing => {
        const tagLi = document.createElement("li");
        const tagSpanIng = document.createElement("span")
        const tagSpanMeasure = document.createElement("span")

        tagLi.className = "border-b flex py-6 justify-between"
        tagSpanIng.textContent = ing.ing
        tagSpanMeasure.textContent = ing.measure

        tagLi.appendChild(tagSpanIng)
        tagLi.appendChild(tagSpanMeasure)
        ingredient.appendChild(tagLi)
    })

    document.getElementById('youtub').href = mealData.youtube




    const ul = document.getElementById("instruction");
    ul.innerHTML = "";

    mealData.instructions.forEach((text, index) => {
        const li = document.createElement("li");
        li.className = "flex items-center gap-2";

        const numberDiv = document.createElement("div");
        numberDiv.className = "rounded-full w-8 h-8 bg-orange-500 flex items-center justify-center";

        const p = document.createElement("p");
        p.className = "font-bold p-4 flex items-center justify-center text-white";
        p.textContent = index + 1;
        numberDiv.appendChild(p);

        const textDiv = document.createElement("div");
        textDiv.textContent = text;

        li.appendChild(numberDiv);
        li.appendChild(textDiv);

        ul.appendChild(li);
    });

    console.log(mealData)
}

run();
