const meal = {
  idMeal: "52914",
  strMeal: "Boulang\u00e8re Potatoes",
  strDrinkAlternate: null,
  strCategory: "Side",
  strArea: "French",
  strInstructions:
    "Heat oven to 200C/fan 180C/gas 6. Fry the onions and thyme sprigs in the oil until softened and lightly coloured (about 5 mins).\r\nSpread a layer of potatoes over the base of a 1.5-litre oiled gratin dish. Sprinkle over a few onions (see picture, above) and continue layering, finishing with a layer of potatoes. Pour over the stock and bake for 50-60 mins until the potatoes are cooked and the top is golden and crisp.",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/qywups1511796761.jpg",
  strTags: "SideDish",
  strYoutube: "https://www.youtube.com/watch?v=gcXPruv1Mjg",
};

function createMeal(m) {
  const main = document.createElement("div");
  main.classList.add(
    "max-w-sm",
    "bg-white",
    "border",
    "border-gray-200",
    "rounded-lg",
    "shadow-sm",
    "dark:bg-gray-800",
    "dark:border-gray-700"
  );

  const a = document.createElement("a");
  a.href = "#";
  main.appendChild(a);

  const img = document.createElement("img");
  img.classList.add("rounded-t-lg");
  img.src = m.strMealThumb;
  a.appendChild(img);

  const div = document.createElement("div");
  div.classList.add("p-5");
  main.appendChild(div);

  const A = document.createElement("a");
  A.href = "#";
  div.appendChild(A);

  const h5 = document.createElement("h5");
  h5.classList.add(
    "mb-2",
    "text-2xl",
    "font-bold",
    "tracking-tight",
    "text-gray-900",
    "dark:text-white"
  );
  h5.innerText = m.strMeal;
  A.appendChild(h5);

  const p = document.createElement("p");
  p.classList.add("mb-3", "font-normal", "text-gray-700", "dark:text-gray-400");
  p.innerText = m.strInstructions;
  div.appendChild(p);

  const more = document.createElement("a");
  more.href = m.strYoutube;
  more.classList.add(
    "inline-flex",
    "items-center",
    "px-3",
    "py-2",
    "text-sm",
    "font-medium",
    "text-center",
    "text-white",
    "bg-blue-700",
    "rounded-lg",
    "hover:bg-blue-800",
    "focus:ring-4",
    "focus:outline-none",
    "focus:ring-blue-300",
    "dark:bg-blue-600",
    "dark:hover:bg-blue-700",
    "dark:focus:ring-blue-800"
  );
  more.innerText = "Read more";
  div.appendChild(more);

  const svg = document.createElement("svg");
  svg.classList.add("rtl:rotate-180", "w-3.5", "h-3.5", "ms-2");
  svg.ariaHidden = "true";
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 14 10");
  more.appendChild(svg);

  const path = document.createElement("path");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", "M1 5h12m0 0L9 1m4 4L9 9");

  svg.appendChild(path);

  document.getElementById("test").appendChild(main);
}

createMeal(meal);
