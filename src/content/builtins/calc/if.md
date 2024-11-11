---
title: "if(condition, trueValue, [falseValue])"
supertitle: "calc:"
---

If `condition` is truthy, the function returns `trueValue`. If the condition is not truthy, this returns `falseValue` if supplied (or `undefined` otherwise).

If `trueValue` or `falseValue` is a function, it will be evaluated and its result returned instead.

## Example

The [origami-blog-start](https://github.com/WebOrigami/origami-blog-start) sample project has a [singlePostPage.ori](https://github.com/WebOrigami/origami-blog-start/blob/main/src/singlePostPage.ori) template for displaying a single post object as HTML.

In this project, a post object may contain a `nextKey` or `previousKey` value indicating the next or previous page in the sequence of blog posts. To render this value as a link, the post template includes the fragment:

```ori
if(post/previousKey, =`
  <a class="previous" href="\${ post/previousKey }">
    Previous: \${ tree(post/previousKey)/title }
  </a>
`)
```

This expression uses an `if` function to see if the post defines a `previousKey` value. If it does, the `if` function will return the second (`trueValue`) argument. In this case, that argument is a function defined in [shorthand syntax](/language/syntax.html#lambdas-unnamed-functions). The `if` will invoke that function, which will create an HTML fragment for a link that goes to the indicated page. That HTML fragment will be returned as the result of the `if`.

If the post does not define a `previousKey`, the `if` will return undefined, and nothing will be displayed.

## Caution

Origami's `if` builtin works something like conditional operators or `if` statements in programming languages like JavaScript. However, those languages typically only evaluate the true or false part of the `if` once the value of the condition is known. If the condition is true, only then is the true branch of the `if` taken; the false branch will never be executed.

In contrast, the `if` builtin is a normal function -- Origami will evaluate _all_ of its arguments before calling the `if`.

For that reason, unless the true or false arguments to `if` are trivial numbers or strings, you will generally want to turn those arguments into a function by prefixing with `=` as shown above. This will defer evaluation of the argument to the point when `if` knows whether it's going to need that result or not.

In particular, you will need to pass functions to `if` when the `if` is being used to check for the existence of an object that will be further traversed in the `trueValue` or `falseValue` arguments.

Example: you have a template that may need to render a `user` object and, if there is a user, to show their name. The following `if` will not work:

```ori
// Won't work
if(user, user/name)
```

This expression won't work because, if `user` doesn't exist, then the expression `user/name` will fail. That will happen _before_ the `if` statement has a chance to check whether `user` exists or not.

To avoid this problem, pass a function to `if`:

```ori
// Use a function to defer looking up the user's name
if(user, =user/name)
```

The expression `=user/name` will be evaluated before the `if` is called but will just define a function. That function won't be called until `if` checks to see whether `user` exists. Only if the `user` exists will the `=user/name` function be called.
