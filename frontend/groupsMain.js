import { getDropdownGroupsList } from "./modules/getDropdownGroupsList.js";
import { getGroups } from "./modules/getGroups.js";
import { assignGroup } from "./modules/assignGroup.js";
import { getGroupsBills } from "./bills.js";

const groupIdForm = document.body.querySelector("#group-id-form");
const group = document.body.querySelector("#group-cards-container");

groupIdForm.addEventListener("submit", assignGroup);

group.addEventListener("click", (event) => {
  event.preventDefault();

  const id = event.target.id;

  getGroupsBills(id);
});

await getGroups();
await getDropdownGroupsList();
