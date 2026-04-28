# GitHub Contributing Guide

This guide will help you understand the GitHub-specific workflow for this project.

## Directory Structure

```
.github/
├── ISSUE_TEMPLATE/          # Issue templates
│   ├── bug_report.md        # Bug report template
│   ├── feature_request.md   # Feature request template
│   ├── documentation.md     # Documentation suggestion template
│   └── config.yml          # Issue template configuration
├── workflows/               # GitHub Actions workflows
│   ├── issue-greeting.yml  # Auto-greet new issues
│   ├── auto-label.yml      # Auto-label issues by title
│   ├── stale.yml           # Mark stale issues/PRs
│   ├── pr-validation.yml   # Validate PR format
│   └── ci.yml              # CI/CD pipeline
└── pull_request_template.md # PR template
```

## Issue Types

### Bug Report
Use this when you find a bug. Template located in `.github/ISSUE_TEMPLATE/bug_report.md`

**Label:** `bug`

**Expected format:**
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details

### Feature Request
Use this to suggest a new feature. Template located in `.github/ISSUE_TEMPLATE/feature_request.md`

**Label:** `enhancement`

**Expected format:**
- Problem statement
- Proposed solution
- Alternatives considered
- Priority level

### Documentation
Use this to suggest documentation improvements. Template located in `.github/ISSUE_TEMPLATE/documentation.md`

**Label:** `documentation`

**Expected format:**
- What documentation needs improvement
- Where it should be updated
- Details of the change

## Pull Request Process

1. **Create Branch:** Create a descriptive branch name
   ```bash
   git checkout -b feature/add-new-feature
   git checkout -b fix/bug-description
   ```

2. **Make Changes:** Follow the project's code style and conventions

3. **Test Locally:** Ensure all tests pass
   ```bash
   npm test
   npm run lint
   ```

4. **Create PR:** Use the PR template and fill in all sections
   - Reference related issue with `Fixes #123`
   - Describe your changes clearly
   - Include screenshots if applicable
   - Check all items in the checklist

5. **Address Review Comments:** Make requested changes and push updates

6. **Merge:** Once approved, PR will be merged

## Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation changes
- `test/` - Test additions or modifications

## Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/dependency changes

**Example:**
```
feat(auth): add JWT token refresh endpoint

Add ability to refresh JWT tokens without re-authentication.
Implements token rotation for better security.

Fixes #123
```

## GitHub Actions Workflows

### Issue Greeting
Automatically greets users when they create a new issue.

### Auto-Labeling
Automatically labels issues based on title prefixes:
- `[BUG]` → `bug`
- `[FEATURE]` → `enhancement`
- `[DOCS]` → `documentation`

### Stale Issues/PRs
Marks inactive issues and PRs as stale after 30 days, closes after 7 days.

### PR Validation
Validates PR title format and comments on new PRs.

## Labels

| Label | Purpose | Color |
|-------|---------|-------|
| `bug` | Something isn't working | Red |
| `enhancement` | Feature request | Green |
| `documentation` | Documentation improvement | Blue |
| `good first issue` | For new contributors | Yellow |
| `help wanted` | Help needed | Green |
| `stale` | No activity for 30 days | Gray |
| `wontfix` | Will not be fixed | Black |

## Code Review

### As a Reviewer:
1. Check code quality and style
2. Verify tests are included
3. Ensure documentation is updated
4. Test locally if possible
5. Provide constructive feedback

### As an Author:
1. Be open to feedback
2. Respond to all comments
3. Make requested changes
4. Update PR description if needed
5. Resolve all conversations

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - General contribution guidelines
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - Community standards
- [SECURITY.md](../SECURITY.md) - Security reporting
- [DEVELOPMENT.md](../DEVELOPMENT.md) - Development setup
