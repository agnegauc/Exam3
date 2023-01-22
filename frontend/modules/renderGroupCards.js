export const renderGroupCards = (groups) => {
  const container = document.body.querySelector("#group-cards-container");
  container.textContent = "";

  groups.forEach((group) => {
    const card = document.createElement("div");
    const groupId = document.createElement("h3");
    const groupName = document.createElement("p");

    groupId.textContent = `ID: ${group.group_id}`;
    groupName.textContent = group.name;
    card.className = "group-card";
    card.id = group.group_id;
    groupId.id = group.group_id;
    groupName.id = group.group_id;

    card.append(groupId, groupName);
    container.append(card);
  });
};
