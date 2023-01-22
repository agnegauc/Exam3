const form = document.body.querySelector("#registration-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fullNameInputValueArray = document.body
    .querySelector("#full-name-input")
    .value.trim()
    .split(" ");
  const emailInputValue = document.body
    .querySelector("#email-input")
    .value.trim()
    .toLocaleLowerCase();
  const passwordInputValue = document.body
    .querySelector("#password-input")
    .value.trim();
  const repeatPasswordInputValue = document.body
    .querySelector("#repeat-password-input")
    .value.trim();

  for (let i = 0; i < fullNameInputValueArray.length; i++) {
    fullNameInputValueArray[i] =
      fullNameInputValueArray[i].charAt(0).toUpperCase() +
      fullNameInputValueArray[i].slice(1);
  }

  const fullNameCapitalised = fullNameInputValueArray.join(" ");

  if (passwordInputValue !== repeatPasswordInputValue) {
    return alert("Entered passwords do not match. Please try again.");
  }

  try {
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullNameCapitalised,
        email: emailInputValue,
        password: passwordInputValue,
      }),
    });

    const data = await response.json();

    if (!response.ok || response.status >= 400) {
      document.body.querySelector("#registration-form").reset();
      return alert(data.error || response.statusText);
    }

    alert(data.message);

    location.assign("./login.html");
    return;
  } catch (error) {
    alert(error.message);
  }
});
