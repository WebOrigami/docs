---
title: Development tools
---

The primary development tool for working in Origami is the [ori command-line interface](/cli). The ori CLI includes the language interpreter, runtime, and [builtins](/builtins).

## Using Origami with LLMs

If you'd like to create a new Origami project with an LLM coding tool (Claude Code, OpenAI Codex, etc.), prompt your tool to read the language summary page at https://weborigami.org/llms.txt.

LLMs can easily forget that the Origami dialect of JavaScript expressions only supports expressions, not full JavaScript.

- Once an LLM starts generating what looks like a JavaScript expression, it may lapse into assuming the availability of full JavaScript.
- You may need to remind it that it needs to restrict output to Origami's dialect of expressions.
- This problem tends to be more acute in a new project; LLMs seem to do better once they're working inside an existing Origami project with more context.

## Origami Projector

[Origami Projector](https://github.com/WebOrigami/projector) is an experimental application for quickly iterating on code, data, and content. Projector shortens the conventional cycle in which you edit a file (e.g., a markdown file, data file, Origami file, etc.), save it, run some code to generate an affected artifact (a HTML file incorporating that content), see the effects of your edits, then edit again.

## Other tools

- [Microsoft VS Code language support](https://marketplace.visualstudio.com/items?itemName=WebOrigami.origami-vscode-extension) for language support including syntax highlighting
- [Neovim plugin](https://tangled.org/vale.rocks/weborigami-nvim/) for language support including syntax highlighting
