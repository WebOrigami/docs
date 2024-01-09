## Reference network resources

Since `https` and `http` URLs are valid Origami expressions, you can incorporate network content into a template’s output.

```console
$ cat net.ori
{{ samples.ori/templates/net.ori }}$ ori net.ori/
This content came from graphorigami.org:
{{ samples.ori/templates/net.txt }}
```

This includes being able to traverse into data from the network. A [teamData.yaml](samples/templates/teamData.yaml) file posted on the network can be referenced as an expression and then further traversed:

```console
$ cat netData.ori
{{ samples.ori/templates/netData.ori }}$ ori netData.ori/
Bob lives in {{ samples.ori/templates/teamData.yaml/1/location }}.
```

You can also obtain a data file from the network, treat it as a tree, and [map the tree to text](#map-trees-to-text). This allows you to directly process network data into text in a template.
