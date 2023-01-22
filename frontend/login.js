const form = document.body.querySelector("#login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInputValue = document.body
    .querySelector("#email-input")
    .value.trim();
  const passwordInputValue = document.body
    .querySelector("#password-input")
    .value.trim();

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInputValue,
        password: passwordInputValue,
      }),
    });

    const authData = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(authData?.error || response.statusText);
    }

    localStorage.setItem("token", authData.token);

    alert(authData.message);

    location.assign("./groups.html");
    return;
  } catch (error) {
    alert(error.message);
  }
});
