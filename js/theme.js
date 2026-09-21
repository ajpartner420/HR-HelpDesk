```js
/* =================================
   HR HELPDESK
   THEME SYSTEM
================================= */


/* ---------- THEME TOGGLE ---------- */

const themeToggle =
    document.getElementById("themeToggle");


/* ---------- LOAD SAVED THEME ---------- */

const savedTheme =
    localStorage.getItem("hr-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    if (themeToggle) {
        themeToggle.textContent = "🌙";
    }

} else {

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
}


/* ---------- THEME BUTTON ---------- */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");


        const isLight =
            document.body.classList.contains("light");


        if (isLight) {

            localStorage.setItem(
                "hr-theme",
                "light"
            );

            themeToggle.textContent = "🌙";

        } else {

            localStorage.setItem(
                "hr-theme",
                "dark"
            );

            themeToggle.textContent = "☀️";
        }

    });

}
```
