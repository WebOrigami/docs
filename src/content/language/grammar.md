---
title: Origami formal grammar
---

The [Origami CLI](/cli) parses command-line arguments by starting with the `expression` term below. The [Formula](/framework/Formula.html) class used by [MetaMixin](/framework/MetaMixin.html) and the [meta](/cli/meta.html) command parses file names and other keys by starting with the `key` term. [Templates](/framework/templates.html) parse templates by starting with the `templateDocument` term.

```
args: parensArgs
      list

argsChain: args [argsChain]

array: "[" list "]"

assignment: identifier "=" expression

colonCall: reference ":" expression

declaration: identifier

expression: string
            templateidentifier
            object
            graph
            array
            lambda
            number
            functionComposition
            protocolCall
            slashCall
            group
            scopeReference

formula: assignment
         identifier

functionCallTarget: group
                    protocolCall
                    slashCall
                    scopeReference

functionComposition: functionCallTarget argsChain

graph: "{" graphDocument "}"

graphDocument: formula [separator graphDocument]

group: "(" expression ")"

identifier: everything but unescaped =(){}$&"'/`%,:# and whitespace

identifierWithPort: identifier ":" number
                    identifier

implicitParensArgs: whitespace list

lambda: "=" expression

list: expression separator list
      expression

number: (valid JavaScript signed/unsigned integer or floating point number)

object: "{" property "}"

parensArgs: "(" [list] ")"

pathHead: group
          simpleFunctionCall
          scopeReference

pathKey: group
         identifier

property: identifier ":" expression
          identifier

protocolCall: scopeReference "://"|":/"|":" identifierWithPort ["/" slashPath]

scopeReference: identifier

separator: ","
           (newline)

simpleFunctionCall: scopeReference parensArgs

slashCall: ["/"]["/"] pathHead "/" [slashPath]

slashPath: pathKey "/" slashPath
           pathKey

string: "[text]"
        '[text]'

substitution: "\{\{" expression "}}"

template: templateText [substitution template]

templateDocument: templateDocumentText [substitution templateDocument]

templateDocumentText: everything but unescaped "\{\{"

templateText: everything but unescaped "\{\{" or "`"
```
