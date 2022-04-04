---
title: Origami formal grammar
---

The [Origami CLI](/cli) parses command-line arguments by starting with the `expression` term below. The [Formula](/framework/Formula.html) class used by [MetaMixin](/framework/MetaMixin.html) and the [meta](/cli/meta.html) command parses file names and other keys by starting with the `key` term. [Templates](/framework/templates.html) parse templates by starting with the `templateDocument` term.

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

lambda: "=" expression

list: expression "," list
      expression

literal: everything but =(){}$&"'/`%,# and whitespace

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
           referenceSubstitution
           literal

referenceSubstitution: "\{\{" variableName "}}"[extension]

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

substitution: substitutionInline
              substitutionBlock

substitutionBlock: "\{\{#" functionCallTarget [implicitParensArgs] "}}" templateDocument "\{\{/" [text] "}}"

substitutionInline: "\{\{" expression "}}"

template: templateText [substitution template]

templateDocument: templateDocumentText [substitution templateDocument]

templateLiteral: "`" template "`"

templateDocumentText: everything but "\{\{"

templateText: everything but "\{\{" and "`"

thisReference: "this"

valueDeclaration: ["…"]declaration

variableDeclaration: "["variableName"]"[extension]

variableName: for now, JavaScript identifiers with ASCII letters
```
