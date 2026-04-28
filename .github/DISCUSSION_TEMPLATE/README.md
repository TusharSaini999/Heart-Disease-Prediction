# Discussion Templates Configuration

This folder can contain discussion templates for your repository.

## Creating Discussion Templates

GitHub supports discussion templates similar to issue templates. You can create:

1. **General Discussion** - For general conversations
2. **Ideas** - For feature ideas and suggestions
3. **Announcements** - For project announcements
4. **Q&A** - For questions and answers
5. **Polls** - For community polls

## Example Structure

```yaml
name: Name of the template
title: "Default title"
labels:
  - documentation
body:
  - type: markdown
    attributes:
      value: |
        Thanks for starting a discussion!
  - type: textarea
    id: context
    attributes:
      label: Context
      description: What is this about?
```

## To Enable Discussion Templates

1. Go to your repository settings
2. Enable "Discussions" in Features
3. Create `.md` files in this directory
4. GitHub will automatically detect them

## Learn More

- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)
- [Discussion Templates Guide](https://docs.github.com/en/discussions/managing-discussions-for-your-community)
