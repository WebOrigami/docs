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

## Other tools

- [Microsoft VS Code language support](https://marketplace.visualstudio.com/items?itemName=WebOrigami.origami-vscode-extension) for syntax highlighting
- [Neovim plugin](https://github.com/DeclanChidlow/weborigami-nvim) for syntax highlighting
