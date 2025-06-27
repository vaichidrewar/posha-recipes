// Global variables
let allRecipes = [];
let currentRecipes = [];
let savedRecipes = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadRecipes();
    loadSavedRecipes();
    setupEventListeners();
});

function setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', refreshRecipes);
    
    // Use event delegation for save buttons to handle dynamic content
    document.querySelector('.recipe-cards').addEventListener('click', function(e) {
        if (e.target.classList.contains('save-btn') && !e.target.disabled) {
            e.preventDefault(); // Prevent any default behavior
            const recipeIndex = parseInt(e.target.getAttribute('data-recipe-index'));
            saveRecipe(currentRecipes[recipeIndex]);
        }
    });
}

// Load all recipes from the JSON file directly
function loadRecipes() {
    fetch('./recipes.json')
        .then(response => response.json())
        .then(data => {
            // Handle both array format and object with recipes property
            allRecipes = Array.isArray(data) ? data : data.recipes || [];
            refreshRecipes();
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
            // Fallback: show error message
            document.querySelectorAll('.recipe-name').forEach(el => {
                el.textContent = 'Error loading recipes';
            });
        });
}

// Refresh recipe suggestions
function refreshRecipes() {
    if (allRecipes.length === 0) return;
    
    // Get 3 random recipes
    const shuffled = [...allRecipes].sort(() => 0.5 - Math.random());
    currentRecipes = shuffled.slice(0, 3);
    
    // Update the UI
    currentRecipes.forEach((recipe, index) => {
        const recipeCard = document.getElementById(`recipe-${index + 1}`);
        const recipeNameElement = recipeCard.querySelector('.recipe-name');
        const saveButton = recipeCard.querySelector('.save-btn');
        
        recipeNameElement.textContent = recipe;
        
        // Check if recipe is already saved
        if (savedRecipes.includes(recipe)) {
            saveButton.textContent = 'Saved';
            saveButton.disabled = true;
        } else {
            saveButton.textContent = 'Save Recipe';
            saveButton.disabled = false;
        }
    });
}

// Save a recipe to local storage
function saveRecipe(recipeName) {
    if (!savedRecipes.includes(recipeName)) {
        savedRecipes.push(recipeName);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        updateSavedRecipesDisplay();
        
        // Update only the save button states without refreshing recipes
        updateSaveButtonStates();
    }
}

// Update save button states without refreshing recipes
function updateSaveButtonStates() {
    currentRecipes.forEach((recipe, index) => {
        const recipeCard = document.getElementById(`recipe-${index + 1}`);
        const saveButton = recipeCard.querySelector('.save-btn');
        
        if (savedRecipes.includes(recipe)) {
            saveButton.textContent = 'Saved';
            saveButton.disabled = true;
        } else {
            saveButton.textContent = 'Save Recipe';
            saveButton.disabled = false;
        }
    });
}

// Remove a recipe from saved list
function removeRecipe(recipeName) {
    const index = savedRecipes.indexOf(recipeName);
    if (index > -1) {
        savedRecipes.splice(index, 1);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        updateSavedRecipesDisplay();
        updateSaveButtonStates(); // Update save button states
    }
}

// Load saved recipes from local storage
function loadSavedRecipes() {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
        savedRecipes = JSON.parse(saved);
    }
    updateSavedRecipesDisplay();
}

// Update the saved recipes display
function updateSavedRecipesDisplay() {
    const savedRecipesList = document.getElementById('saved-recipes-list');
    
    if (savedRecipes.length === 0) {
        savedRecipesList.innerHTML = '<p style="color: #666; font-style: italic;">No saved recipes yet. Save some recipes to see them here!</p>';
        return;
    }
    
    savedRecipesList.innerHTML = '';
    
    savedRecipes.forEach(recipeName => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'saved-recipe-card';
        
        recipeCard.innerHTML = `
            <span class="recipe-name">${recipeName}</span>
            <button class="remove-btn" onclick="removeRecipe('${recipeName}')">Remove</button>
        `;
        
        savedRecipesList.appendChild(recipeCard);
    });
}