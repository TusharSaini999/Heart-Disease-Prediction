# GitHub Files Reference

This document provides an overview of all GitHub-related files and templates in this project.

## Root Level Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview and quick start |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community code of conduct |
| [LICENSE](LICENSE) | Project license |
| [SECURITY.md](SECURITY.md) | Security policy and reporting |
| [SUPPORT.md](SUPPORT.md) | Support resources |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Development setup guide |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Architecture documentation |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

## .github Directory Structure

### `.github/ISSUE_TEMPLATE/`
Templates for creating standardized issues:
- `bug_report.md` - For reporting bugs
- `feature_request.md` - For suggesting features
- `documentation.md` - For documentation improvements
- `config.yml` - Configuration for issue templates

### `.github/workflows/`
GitHub Actions workflows for automation:
- `issue-greeting.yml` - Auto-greets new issue creators
- `auto-label.yml` - Auto-labels issues by title
- `stale.yml` - Manages stale issues/PRs
- `pr-validation.yml` - Validates PR format
- `ci.yml` - Continuous Integration pipeline (if exists)

### `.github/`
- `pull_request_template.md` - Template for pull requests
- `PULL_REQUEST_TEMPLATE` - Alternative PR template format
- `GITHUB_GUIDE.md` - Guide to GitHub-specific processes

## Quick Links

### For Issue Creators
- [Create a Bug Report](https://github.com/yourusername/Heart-Disease-Prediction/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/yourusername/Heart-Disease-Prediction/issues/new?template=feature_request.md)
- [Suggest Documentation](https://github.com/yourusername/Heart-Disease-Prediction/issues/new?template=documentation.md)

### For Contributors
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [DEVELOPMENT.md](DEVELOPMENT.md) - Setup instructions
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design

### For Maintainers
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community standards
- [SECURITY.md](SECURITY.md) - Security procedures
- [CHANGELOG.md](CHANGELOG.md) - Version tracking

### For Users
- [README.md](README.md) - Getting started
- [SUPPORT.md](SUPPORT.md) - Getting help
- [SECURITY.md](SECURITY.md) - Security reporting

## Best Practices

1. **Always use templates** when creating issues or PRs
2. **Include all requested information** in the templates
3. **Follow branch naming conventions** as documented in [GITHUB_GUIDE.md](.github/GITHUB_GUIDE.md)
4. **Reference issues in PRs** using "Fixes #123"
5. **Keep CHANGELOG.md updated** with changes
6. **Follow commit message conventions** as documented in [GITHUB_GUIDE.md](.github/GITHUB_GUIDE.md)

## Customization

To customize GitHub workflows and templates:

1. **Issue Templates:** Edit files in `.github/ISSUE_TEMPLATE/`
2. **PR Template:** Edit `.github/pull_request_template.md`
3. **Workflows:** Edit files in `.github/workflows/`
4. **Configuration:** Update `.github/ISSUE_TEMPLATE/config.yml`

## Resources

- [GitHub Documentation](https://docs.github.com)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Issue Templates Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
- [Pull Request Templates Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

## File Locations

```
Heart-Disease-Prediction/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   ├── documentation.md
│   │   └── config.yml
│   ├── workflows/
│   │   ├── issue-greeting.yml
│   │   ├── auto-label.yml
│   │   ├── stale.yml
│   │   └── pr-validation.yml
│   ├── pull_request_template.md
│   ├── PULL_REQUEST_TEMPLATE
│   └── GITHUB_GUIDE.md
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── SECURITY.md
├── SUPPORT.md
├── DEVELOPMENT.md
├── ARCHITECTURE.md
├── CHANGELOG.md
└── GITHUB_REFERENCE.md (this file)
```
