
const bakeryProducts = [
    { id: "bread", name: "Fresh Breads" },
    { id: "pastries", name: "Pastries" },
    { id: "cakes", name: "Cakes" }
];

const favoritesSettings = {
    storageKey: "bakeryFavorites",
    emptyMessage: "No favorites selected yet."
};

function getFavorites() {
    return JSON.parse(localStorage.getItem(favoritesSettings.storageKey) || "[]");
}

function saveFavorites(favorites) {
    localStorage.setItem(favoritesSettings.storageKey, JSON.stringify(favorites));
}

function displayFavorites() {
    const favorites = getFavorites();
    const result = document.getElementById("favorites-result");

    const names = bakeryProducts
        .filter(product => favorites.includes(product.id))
        .map(product => product.name);

    result.textContent = names.length
        ? names.join(", ")
        : favoritesSettings.emptyMessage;
}

function toggleFavorite(productId) {
    const favorites = getFavorites();

    const updatedFavorites = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];

    saveFavorites(updatedFavorites);
    renderFavoriteButtons();
    displayFavorites();
}

function renderFavoriteButtons() {
    const container = document.getElementById("favorites-options");
    const favorites = getFavorites();

    container.replaceChildren();

    bakeryProducts.forEach(product => {
        const button = document.createElement("button");
        const selected = favorites.includes(product.id);

        button.type = "button";
        button.textContent = selected
            ? `Remove ${product.name}`
            : `Add ${product.name}`;

        button.setAttribute("aria-pressed", String(selected));
        button.addEventListener("click", () => toggleFavorite(product.id));

        container.appendChild(button);
    });
}

function initializeFavorites() {
    if (!document.getElementById("favorites-options")) return;

    renderFavoriteButtons();
    displayFavorites();
}

document.addEventListener("DOMContentLoaded", initializeFavorites);

function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    error.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
}

function validatePreorderForm(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const details = document.getElementById("item-details").value.trim();

    let isValid = true;

    if (name.length < 2) {
        showError("customer-name", "name-error",
            "Please enter your full name (at least 2 characters).");
        isValid = false;
    } else {
        showError("customer-name", "name-error", "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("customer-email", "email-error",
            "Please enter a valid email address.");
        isValid = false;
    } else {
        showError("customer-email", "email-error", "");
    }

    if (details.length < 10) {
        showError("item-details", "details-error",
            "Please provide at least 10 characters in Item Details.");
        isValid = false;
    } else {
        showError("item-details", "details-error", "");
    }

    if (isValid) {
        alert("Your request has been validated! This is a demo, so nothing was sent.");
    }
}

function initializePreorderForm() {
    const form = document.getElementById("preorder-form");

    if (!form) return;

    form.addEventListener("submit", validatePreorderForm);
}

document.addEventListener("DOMContentLoaded", initializePreorderForm);
