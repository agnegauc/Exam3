import { createGroup, postGroup } from "./createGroup.js";

const assignGroup = async (event) => {
  event.preventDefault();

  const form = document.body.querySelector("#group-id-form");

  if (form.class === undefined) {
    const select = document.body.querySelector("#existing-groups");
    const selectedGroup = +select.options[select.selectedIndex].value; // skaičius or new-group

    if (typeof selectedGroup === "number" && !Number.isNaN(selectedGroup)) {
      const accessToken = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            group_id: selectedGroup,
          }),
        });

        const accountsData = await response.json();

        if (!response.ok || response.status >= 400) {
          return console.log(accountsData?.error || response.statusText);
        }

        alert(accountsData.message);

        location.reload();

        return;
      } catch (error) {
        return console.error(error);
      }
    }

    return createGroup();
  }

  const newGroupNameInput = document.body
    .querySelector("#new-group-input")
    .value.trim();

  return postGroup(newGroupNameInput);
};

export { assignGroup };
