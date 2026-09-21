/* =================================
   HR HELPDESK
   THEME + LOGIN SYSTEM
================================= */


const themeToggle =
    document.getElementById("themeToggle");


/* ---------- THEME ---------- */

const savedTheme =
    localStorage.getItem("hr-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "🌙";

} else {

    themeToggle.textContent = "☀️";
}


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


/* =================================
   LOGIN
================================= */


let selectedRole = "employee";


const roleButtons =
    document.querySelectorAll(".role-btn");


const email =
    document.getElementById("email");


const password =
    document.getElementById("password");


const loginForm =
    document.getElementById("loginForm");


const loginMessage =
    document.getElementById("loginMessage");


const demoDetails =
    document.getElementById("demoDetails");


/* ---------- ROLE SWITCH ---------- */

roleButtons.forEach(button => {

    button.addEventListener("click", () => {

        roleButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        button.classList.add("active");


        selectedRole =
            button.dataset.role;


        clearMessage();


        password.value = "";


        if (selectedRole === "admin") {

            email.placeholder =
                "admin@hrhelpdesk.com";


            demoDetails.innerHTML = `
                <span>Admin:</span>
                <strong>
                    admin@hrhelpdesk.com
                </strong>

                <br>

                <span>Password:</span>
                <strong>
                    admin123
                </strong>
            `;

        } else {

            email.placeholder =
                "employee@company.com";


            demoDetails.innerHTML = `
                <span>Employee:</span>
                <strong>
                    employee@hrhelpdesk.com
                </strong>

                <br>

                <span>Password:</span>
                <strong>
                    employee123
                </strong>
            `;
        }

    });

});


/* ---------- PASSWORD SHOW/HIDE ---------- */

const passwordToggle =
    document.getElementById("passwordToggle");


passwordToggle.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        passwordToggle.textContent = "🙈";

    } else {

        password.type = "password";

        passwordToggle.textContent = "👁";
    }

});


/* ---------- LOGIN ---------- */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const enteredEmail =
            email.value.trim().toLowerCase();


        const enteredPassword =
            password.value;


        let correctEmail;

        let correctPassword;


        if (selectedRole === "employee") {

            correctEmail =
                "employee@hrhelpdesk.com";

            correctPassword =
                "employee123";

        } else {

            correctEmail =
                "admin@hrhelpdesk.com";

            correctPassword =
                "admin123";
        }


        if (
            enteredEmail === correctEmail &&
            enteredPassword === correctPassword
        ) {

            showMessage(
                "Login successful! Dashboard will be connected in Step 2.",
                "success"
            );


            localStorage.setItem(
    "hr-user-role",
    selectedRole
);


/* ---------- REDIRECT ---------- */

if (selectedRole === "employee") {

    window.location.href =
        "employee/dashboard.html";

} else {

    window.location.href =
        "admin/dashboard.html";

}
        } else {

            showMessage(
                "Invalid login details. Please check your email and password.",
                "error"
            );

        }

    }
);


/* ---------- FORGOT PASSWORD ---------- */

document
    .getElementById("forgotPassword")
    .addEventListener("click", async function () {

        const enteredEmail =
            email.value.trim().toLowerCase();

        if (!enteredEmail) {

            showMessage(
                "Please enter your email first.",
                "error"
            );

            email.focus();

            return;
        }

        try {

            const { error } =
                await supabaseClient.auth
                    .resetPasswordForEmail(
                        enteredEmail,
                        {
                            redirectTo:
                                window.location.origin +
                                "/HR-HelpDesk/reset-password.html"
                        }
                    );

            if (error) {

                showMessage(
                    error.message,
                    "error"
                );

                return;
            }

            showMessage(
                "Password reset email sent. Please check your inbox.",
                "success"
            );

        } catch (error) {

            console.error(error);

            showMessage(
                "Unable to send password reset email.",
                "error"
            );
        }

    });

/* ---------- MESSAGE ---------- */

function showMessage(text, type) {

    loginMessage.textContent = text;

    loginMessage.className =
        "login-message " + type;
}


function clearMessage() {

    loginMessage.textContent = "";

    loginMessage.className =
        "login-message";
}
