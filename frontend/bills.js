const getGroupsBills = async (id) => {
  const groupId = +id;

  if (typeof groupId === "number" && !Number.isNaN(groupId)) {
    try {
      const response = await fetch(`http://localhost:8000/bills/${groupId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const bills = await response.json();

      if (!response.ok || response.status >= 400) {
        return alert(bills?.error || response.statusText);
      }

      console.log(bills);
      alert("Bills in console, student shows signs of bad time management.");
    } catch (error) {
      return console.error(error);
    }
  }
};

export { getGroupsBills };
