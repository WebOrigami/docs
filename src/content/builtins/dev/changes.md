---
title: "changes(oldTree, newTree)"
supertitle: "dev:"
---

This compares an old tree with a new one, indicating which values have been added, changed, or deleted.

## Example

A YAML file contains the following tree:

```yaml
# oldTree.yaml
${ samples.ori/help/oldTree.yaml }
```

The file is copied and then modified to produce:

```yaml
# newTree.yaml
${ samples.ori/help/newTree.yaml }
```

Calling `changes` indicates what values have changed:

```console
$ ori changes oldTree.yaml, newTree.yaml
${ yaml(changes(samples.ori/help/oldTree.yaml, samples.ori/help/newTree.yaml)) }
```

Invoking `changes` if the trees are the same returns an empty object, indicating nothing has changed:

```console
$ ori changes newTree.yaml, newTree.yaml
$
```

## Using `changes` for testing static sites

If you're using Origami to build a static website, your build folder represents the complete set of resources needed for your site to run. This means you can use `changes` to compare an old build and a new build to determine whether anything has changed.

This can confirm that modifications to your site have only had the expected effects, and not broken something else somewhere unexpected.

1. First, confirm your site looks the way you want.
2. Build your project into a folder (`build`, say) using the [`copy`](copy.html#copy-to-build) command.
3. Copy the `build` folder to a separate folder called `baseline`.
4. Make the modification you want to make to your site.
5. Build the site again to update the `build` folder.
6. Run `changes` to see a summary of everything that changed:

```console
$ ori changes baseline, build
```

If `changes` reports that the `build` folder has no changes, then it matches the previous version in the `baseline` folder. You do not need to manually inspect the site in the browser to confirm that everything still looks correct: _the entire site is exactly the same as before_.

If `changes` does report changes, you can use a diff tool like VS Code [file compare](https://learn.microsoft.com/en-us/visualstudio/ide/compare-with?view=vs-2022) to inspect the changes in the indicated files. Also check the affected pages in the browser to confirm they still look good.

Once everything looks good, copy the `build` folder to the `baseline` folder to update your baseline for future changes.

### Typical types of modifications

Here are some common types of modifications you might make to your site, and what you might expect `changes` to report:

- Upgrade to a new version of Origami. Unless noted in the [release notes](https://github.com/WebOrigami/origami/releases), build output should stay the same across Origami releases.
- Upgrade some other dependency. Again, build output should stay the same.
- Add new resources: a new image, stylesheet, etc. `changes` should report the addition of the new resources, but generally speaking nothing else should change.
- Change some content: for example, you add a new post to a blog project. `changes` should report that a new page was added for the specific post, and show that any affected index pages changed.
- Change the HTML in an Origami [template](/language/templates.html). Only the pages affected by that template should change.
- Refactor code, including Origami code or JavaScript code in your project. When you're refactoring, the output shouldn't change.

To get the most out of this approach, you can stick to making only one kind of modification at a time. For example, if you want to change how a template produces HTML, and that will require some refactoring, do the refactoring first and use `changes` to confirm that nothing changed. Then proceed to change the template and confirm that only the expected HTML pages affected by the template have changed.

### Running `changes` against a site directly

Because Origami can work against any kind of tree, you have the option to run `changes` against your Origami site without having to do a build first. If your site is defined in `site.ori`, then you could run:

```console
$ ori changes baseline, site.ori
```

to do a quick check that nothing's changed. If there are changes, you can do a build to create a complete set of output files, then use a diff tool or other means to inspect the files.
