---
title: Origami formal grammar
---

The [Origami CLI](/cli) parses command-line arguments by starting with the `expression` term below. The [Formula](/framework/Formula.html) class used by [MetaMixin](/framework/MetaMixin.html) and the [meta](/cli/meta.html) command parses file names and other keys by starting with the `key` term. [Templates](/framework/templates.html) parse templates by starting with the `templateDocument` term.

```
args: parensArgs
      implicitParensArgs

argsChain: args [argsChain]

assignment: ["…"]declaration "=" expression [extension]

colonCall: reference ":" expression

declaration: literal

expression: singleQuoteString
            lambda
            templateLiteral
            spaceUrl
            spacePathCall
            functionComposition
            urlProtocolCall
            protocolCall
            slashCall
            percentCall
            group
            number
            getReference

extension:  "."literal

functionComposition: functionCallTarget argsChain

functionCallTarget: group
                    urlProtocolCall
                    protocolCall
                    colonCall
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
           literal

percentCall: pathHead "%" [percentPath]

percentPath: pathKey "%" percentPath
           pathKey

protocolCall: reference "://"|":/" slashPath

simpleFunctionCall: getReference parensArgs

singleQuoteString: '[text]'

slashCall: ["//"] pathHead "/" [slashPath]

slashPath: pathKey "/" slashPath
           pathKey

spaceUrl: urlProtocol whitespace spaceUrlPath

spaceUrlPath: pathKey whitespace spaceUrlPath
              pathKey

spacePathCall: "."|".." [spaceUrlPath]

substitution: "\{\{" expression "}}"

template: templateText [substitution template]

templateDocument: templateDocumentText [substitution templateDocument]

templateLiteral: "`" template "`"

templateDocumentText: everything but "\{\{"

templateText: everything but "\{\{" and "`"

thisReference: "this"

urlProtocol: "https"
             "http"

urlProtocolCall: urlProtocol "://"|":/"|":" slashPath

valueDeclaration: ["…"]declaration
```
