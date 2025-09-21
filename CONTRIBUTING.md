# Contributing to Discord Utility Toolkit

Thank you for your interest in contributing to the Discord Utility Toolkit! We welcome contributions from the community and are grateful for your help in making this project better.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** when available
3. **Provide clear, detailed information** including:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Screenshots or GIFs if applicable
   - Browser and OS information
   - Console errors (if any)

### Suggesting Features

We love feature suggestions! When proposing new features:

1. **Check if it aligns** with the project's goals (Discord-related utilities)
2. **Explain the use case** and why it would be valuable
3. **Consider the scope** - smaller, focused features are easier to implement
4. **Provide mockups or examples** if possible

## 🛠️ Development Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Git

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/discord-utility-toolkit.git
   cd discord-utility-toolkit
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Code Guidelines

### Code Style

- **Use consistent formatting** - we use Prettier (if configured)
- **Follow React best practices**:
  - Use functional components with hooks
  - Keep components small and focused
  - Use meaningful component and variable names
  - Add PropTypes or TypeScript types when possible

### Component Structure

When creating new tools, follow this structure:

```
src/components/[Category]/
├── YourTool.js          # Main component
└── README.md            # Tool-specific documentation (optional)
```

### Styling Guidelines

- **Use styled-components** for component styling
- **Follow the Discord color palette** defined in `src/index.css`
- **Ensure responsive design** with appropriate breakpoints
- **Add hover effects and animations** for better UX
- **Test on different screen sizes**

### File Processing

- **Use browser-compatible libraries** (avoid Node.js-specific packages)
- **Handle errors gracefully** with user-friendly messages
- **Show loading states** for long operations
- **Respect file size limits** and provide feedback
- **Support drag & drop** when applicable

## 🧪 Testing

### Manual Testing

Before submitting a PR, please test:

1. **Your specific feature** works as expected
2. **Existing functionality** isn't broken
3. **Responsive design** on different screen sizes
4. **Different file types and sizes** (if applicable)
5. **Error handling** with invalid inputs

### Browser Compatibility

Test your changes in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📋 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Test thoroughly** on different browsers and devices
3. **Follow the commit message format**:
   ```
   type(scope): description
   
   Examples:
   feat(emoji-maker): add batch processing support
   fix(gif-resizer): resolve memory leak issue
   docs(readme): update installation instructions
   ```

### PR Requirements

- **Clear title and description** explaining what the PR does
- **Link to related issues** using keywords (fixes #123, closes #456)
- **Screenshots or GIFs** for UI changes
- **Test instructions** for reviewers
- **Small, focused changes** (split large features into multiple PRs)

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** by reviewers
4. **Approval** and merge

## 🎯 Priority Areas

We're especially interested in contributions for:

- **New Discord-related tools** that fit the existing categories
- **Performance improvements** for file processing
- **Accessibility enhancements**
- **Mobile responsiveness** improvements
- **Internationalization** (new language support)
- **Bug fixes** and stability improvements

## 🚫 What We Don't Accept

- **Breaking changes** without discussion
- **Features unrelated to Discord**
- **Code that violates Discord's Terms of Service**
- **Malicious or harmful functionality**
- **Large refactors** without prior approval
- **Dependencies with security vulnerabilities**

## 📚 Resources

### Helpful Links

- [React Documentation](https://reactjs.org/docs)
- [styled-components Documentation](https://styled-components.com/docs)
- [Discord Brand Guidelines](https://discord.com/branding)
- [Vite Documentation](https://vitejs.dev/guide/)

### Project Structure

```
src/
├── components/
│   ├── ImageTools/          # Image processing tools
│   ├── GifTools/            # GIF and media tools
│   ├── QolTools/            # Quality of life tools
│   ├── IntegrationTools/    # Integration and bonus tools
│   ├── Dashboard.js         # Main dashboard
│   ├── Header.js            # Application header
│   └── Sidebar.js           # Navigation sidebar
├── i18n.js                  # Internationalization
├── index.css                # Global styles
└── App.js                   # Main app component
```

## 💬 Getting Help

- **GitHub Discussions** - For questions and general discussion
- **Issues** - For bug reports and feature requests
- **Discord Server** - [Join our community](https://discord.gg/your-server) (if available)

## 🏆 Recognition

Contributors will be:
- **Listed in the README** (if desired)
- **Mentioned in release notes** for significant contributions
- **Given credit** in commit messages and PR descriptions

## 📄 Code of Conduct

By participating in this project, you agree to:

- **Be respectful** and inclusive
- **Provide constructive feedback**
- **Help maintain a welcoming environment**
- **Follow GitHub's Community Guidelines**

---

Thank you for contributing to the Discord Utility Toolkit! Your help makes this project better for everyone in the Discord community. 🎉