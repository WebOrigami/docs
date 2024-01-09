---
title: "@project()"
---

This returns the root of the current Origami project. The root is found by walking up the filesystem folder hierarchy from the current working directory, searching for the first folder that contains an `ori.config.js` file. That folder, if found, is returned as the result of `@project()`. If no such folder is found, the current working directory is returned.

See also [@config](@config.html), which returns the configuration exported by `ori.config.js` (if the project defines one) or the built-in functions (if the project has no explicit configuration file).
