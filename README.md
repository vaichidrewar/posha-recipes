# Posha Recipe Recommendations

A simple static website that displays random recipe recommendations. Users can save their favorite recipes locally in the browser.

## Features

- Displays 3 random recipes at a time
- Save favorite recipes (stored in browser localStorage)
- Refresh to get new recipe suggestions
- Responsive design for mobile and desktop

## Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `posha-recipe-recommendations`)
4. Keep it public (required for free GitHub Pages hosting)
5. Don't initialize with README (since we already have files)
6. Click "Create repository"

### Step 2: Upload Your Files

1. Open terminal/command prompt in the project directory
2. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select "main" and "/ (root)"
6. Click "Save"

### Step 4: Access Your Site

After a few minutes, your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

## Adding More Recipes

To add more recipes, simply edit the `recipes.json` file and add new recipe names to the array:

```json
[
    "Vegetable Biryani",
    "Chicken Pad Thai",
    "Your New Recipe Here",
    ...
]
```

Then commit and push the changes to GitHub. The site will update automatically.

## Local Development

To test the site locally:

1. Open `index.html` in a web browser
2. Note: Some browsers may block loading JSON files locally. If this happens, use a local server:
   - Python 3: `python -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
   - Then open `http://localhost:8000` in your browser

## Files Structure

- `index.html` - Main HTML page
- `styles.css` - Styling for the website
- `script.js` - JavaScript functionality
- `recipes.json` - Recipe database
- `favicon.ico` - Website icon