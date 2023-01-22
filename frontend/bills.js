const getGroupsBills = async (id) => {
  const groupId = id;

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
  } catch (error) {
    return console.error(error);
  }
};

export { getGroupsBills };
