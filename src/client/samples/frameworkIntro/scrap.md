## Create a formula in a file name

`message = 'Hello, world!'`

The file name should be that _entire_ formula, including the `=` sign and the single quotes.

<img src="fileFormula.png" style="width: 240px">

Yes, it doesn't look like a normal file name, but it is a valid file name in mainstream operating systems.

The formula in the file name has meaning in the Origami framework.

- The left-hand side of the formula defines the name of a virtual file, `message`.
- The right-hand side is an expression that will be evaluated to determine the value or contents of that virtual file. Here the virtual `message` file will be a text string.
- The file name itself is sufficient to define the behavior. In all the formulas needed for this tutorial, the file itself will be empty. In other situations, the file itself may contain information that can be processed by the formula.
