---
title: Pika formal grammar
---

The [Pika CLI](/cli) parses command-line arguments by starting with the `expression` term below. The [Formula](/egret/Formula.html) class used by [MetaMixin](/egret/MetaMixin.html) and the [meta](/pika/meta.html) command parses file names and other keys by starting with the `key` term.

```
args: parensArgs
      implicitParensArgs

argsChain: args [argsChain]

assignment: ["…"]declaration "=" expression [extension]

declaration: variableDeclaration
             literal

expression: singleQuoteString
            lambda
            templateLiteral
            spaceUrl
            spacePathCall
            protocolCall
            functionComposition
            slashCall
            percentCall
            group
            number
            getReference

extension:  "."literal

functionComposition: functionCallTarget argsChain

functionCallTarget: group
                    protocolCall
                    slashCall
                    percentCall
                    getReference

getReference: reference

group: "(" expression ")"

key: assignment
     inheritableDeclaration
     declaration

lambda: "=>" expression

list: expression "," list
      expression

literal: everything but =(){}$&"'/`%, and whitespace

number: (valid JavaScript signed/unsigned integer or floating point number)

implicitParensArgs: whitespace list

parensArgs: "(" [list] ")"

pathHead: group
          simpleFunctionCall
          getReference

pathKey: group
         substitution
         literal

reference: thisReference
           variableReference
           literal

percentCall: pathHead "%" [percentPath]

percentPath: pathKey "%" percentPath
           pathKey

protocolCall: pathKey ":"|"://" slashPath
              pathKey ":"|"://" protocolCall

simpleFunctionCall: getReference parensArgs

singleQuoteString: '[text]'

slashCall: ["//"] pathHead "/" [slashPath]

slashPath: pathKey "/" slashPath
           pathKey

spaceUrl: spaceUrlProtocol whitespace spaceUrlPath

spaceUrlProtocol: "https"
                  "http"

spaceUrlPath: pathKey whitespace spaceUrlPath
              pathKey

spacePathCall: "."|".." [spaceUrlPath]

substitution: "{{" expression "}}"

template: templateText [substitution template]

templateLiteral: "`" template "`"

templateText: everything but ` and $

thisReference: "this"

valueDeclaration: ["…"]declaration

variableDeclaration: {variableName}[extension]

variableName: for now, JavaScript identifiers with ASCII letters

variableReference: "${" variableName "}"[extension]
```
