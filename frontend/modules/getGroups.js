import { renderGroupCards } from "./renderGroupCards.js";

const displayMessage = (message) => {
  const container = document.body.querySelector("#group-cards-container");
  const messageElement = document.createElement("p");

  messageElement.textContent = message;

  container.append(messageElement);
};

const getGroups = async () => {
  const accessToken = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8000/accounts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const groups = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(groups?.error || response.statusText);
    }

    if (groups.length < 1) {
      return displayMessage(
        "There are no groups at the moment. Please add a group or try again later."
      );
    }

    renderGroupCards(groups);
  } catch (error) {
    return displayMessage(
      "Unable to connect to the server. Please contact the administrator."
    );
  }
};

export { getGroups };
