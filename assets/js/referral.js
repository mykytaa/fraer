document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("someElementId");
    if (element) {
      element.innerHTML = "Referral content here.";
    } else {
      console.error("Element with ID 'someElementId' not found!");
    }
  });
  