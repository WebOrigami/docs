---
title: Reading data
numberHeadings: true
---

## Unpacking files

Origami natively understands a number of common [file types](/language/fileTypes.html) used by web developers, such as JSON and YAML files. These files are generally recognized by their file extension (`.json`, `.yaml`, etc.).

If you give Origami a path _inside a file_, it will implicitly use the file's extension to identify how it should [unpack](/language/fileTypes.html#unpacking-files) that file's data. It will then extract the requested data from that file.

For example, `teamData.yaml` contains some data about people. If you ask for the file, you get the whole file back:

```console
$ ori teamData.yaml
${ ori-intro/teamData.yaml }
```

But you can provide a slash-separated path to get data out of the file:

```console
$ ori teamData.yaml/0/name
${ ori-intro/teamData.yaml/0/name }

```

Alternately, you can use array and property synax:

```console
$ ori "(teamData.yaml)[1].location"
${ (ori-intro/teamData.yaml)[1].location }

```

You can define your own file extension handlers for [custom file types](/language/fileTypes.html#custom-file-types).

## Passing data to functions

You can use Origami's ability to read data out of files to pass data directly to a function written in JavaScript, Origami, or WebAssembly.

```console
$ ori greet.js teamData.yaml/2/name
${ ori-intro/greet.js(ori-intro/teamData.yaml/2/name) }

```

## Passing data as arguments

You can combine the above ability with the Origami / JavaScript [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to define an array of function arguments in a file.

If you want to repeatedly test or invoke a JavaScript function under particular conditions -- say, to test a network service -- you can put those in a JSON, YAML, or Origami file. You can then use the spread operator to pass that array as the arguments to a function.

For example, you could call the standard JavaScript [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) method with arguments that make a call to a web service that echoes the request back to you:

```console
$ ori postArgs.yaml
${ ori-intro/postArgs.yaml }
$ ori fetch ...postArgs.yaml
{"args":{},"data":"This is the body of the POST request.","files":{},"form":{},"headers":{"host":"postman-echo.com","content-length":"37","accept-encoding":"gzip, br","accept-language":"*","x-forwarded-proto":"https","accept":"*/*","content-type":"text/plain;charset=UTF-8","user-agent":"node","sec-fetch-mode":"cors"},"json":null,"url":"https://postman-echo.com/post"}
```

If you want to pass files as arguments, you can reference those in an Origami file. You could send a local `hello.md` file to the web echo service:

```console
$ ori hello.md
${ ori-intro/hello.md }

$ ori putArgs.ori
${ ori-intro/putArgs.ori }
$ ori fetch ...putArgs.ori
{"args":{},"data":"Hello, world.","files":{},"form":{},"headers":{"host":"postman-echo.com","content-length":"13","accept-encoding":"gzip, br","accept-language":"*","x-forwarded-proto":"https","accept":"*/*","sec-fetch-mode":"cors","user-agent":"node","content-type":"application/json"},"json":null,"url":"https://postman-echo.com/put"}
```

Here a set of arguments was passed to `fetch`. The `body` argument referenced a local file `hello.md` which was then uploaded to the service.

## Unpacking web resources

Origami can also implicitly unpack data retrieved from network locations.

The network location https://weborigami.org/samples/help/catBreeds.csv provides a small data set about cats. You can set that URL in parentheses, then traverse the resulting download data with a slash path or array/property syntax to extract specific data within that resource:

```console
$ ori "(https://weborigami.org/samples/help/catBreeds.csv)[1]"
${ Origami.yaml((samples/help/catBreeds.csv)[1]) }
```

&nbsp;

Next: [Using trees with the ori CLI](intro4.html) »
