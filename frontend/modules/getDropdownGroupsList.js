const renderDropdownGroupsList = (groups) => {
  groups.forEach((group) => {
    const addGroup = document.body.querySelector("#existing-groups");
    const option = document.createElement("option");
    option.setAttribute("value", group.id);
    option.textContent = `${group.id} - ${group.name}`;
    addGroup.append(option);
  });
};

const getDropdownGroupsList = async () => {
  const accessToken = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8000/groups", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const groups = await response.json();

    if (!response.ok || response.status >= 400) {
      return console.log(groups?.error || response.statusText);
    }

    await renderDropdownGroupsList(groups);
  } catch (error) {
    return console.error(error);
  }
};

export { getDropdownGroupsList };
