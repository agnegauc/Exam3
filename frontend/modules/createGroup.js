const createGroup = () => {
  const form = document.body.querySelector("#group-id-form");
  const inputField = document.createElement("input");
  const button = document.createElement("button");

  form.textContent = "";
  form.class = "new-group";
  inputField.id = "new-group-input";
  inputField.placeholder = "Enter group name";
  button.type = "submit";
  button.textContent = "Add";

  form.append(inputField, button);
};

const postGroup = async (input) => {
  const newGroupNameInput = input;
  const accessToken = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: newGroupNameInput,
      }),
    });

    const data = await response.json();

    if (!response.ok || response.status >= 400) {
      return console.log(data?.error || response.statusText);
    }

    alert(data.message);

    location.reload();

    return;
  } catch (error) {
    return console.error(error);
  }
};

export { createGroup, postGroup };
