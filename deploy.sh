#!/bin/bash

echo "🚀 GitHub Pages Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo "Creating commit..."
git commit -m "Initial commit - Posha Recipe Recommendations"

# Get GitHub username
echo ""
read -p "Enter your GitHub username: " username
read -p "Enter your repository name (e.g., posha-recipes): " reponame

# Set remote
echo "Setting up GitHub remote..."
git branch -M main
git remote add origin "https://github.com/$username/$reponame.git" 2>/dev/null || git remote set-url origin "https://github.com/$username/$reponame.git"

echo ""
echo "📝 Next steps:"
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   - Repository name: $reponame"
echo "   - Keep it Public"
echo "   - Don't initialize with README"
echo ""
echo "2. Once created, run:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/$username/$reponame/settings/pages"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main, / (root)"
echo "   - Click Save"
echo ""
echo "4. Your site will be available at:"
echo "   https://$username.github.io/$reponame/"