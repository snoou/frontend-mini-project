const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // وقتی اون id خاص دیده شد
        document.querySelectorAll(".bar").forEach((bar) => {
          const level = bar.getAttribute("data-level");
          bar.style.width = level;
        });

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

window.addEventListener("load", () => {
  const targetSection = document.getElementById("skills");
  if (targetSection) {
    observer.observe(targetSection);
  }
});
