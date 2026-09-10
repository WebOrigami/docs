---
title: Network host connection
subtitle: Representing file storage servers in Origami
---

Origami allows you to directly read and write files from network servers such as file storage providers and static site hosts.

For retrieving individual files, you can use the Origami language to read a public network file using a URL (see the [`https` protocol](/builtins/protocol/https.html)), but you can also create and work with connections to network servers to:

- Access private files using, for example, a user name and password
- List the files on a server
- Create a local cache of server files using [`Tree.cache`](/builtins/tree/cache.html)
- Publish your site to a static site host, or backup files to a file storage host, using [`Dev.publish`](/builtins/dev/publish.html)

Among other things, this can provide an alternative to using a network service's tools to update your files or site. That said, this is a somewhat advanced topic, as many network services make it somewhat difficult to collect the information required to make a connection.

## Representing a network connection

You can create an Origami file called, for example, `host.ori`, which will represent your connection to your file or site hosting service. This file will generally call a function that returns a read-only or read-write [map-based tree](/async-tree/mapBasedTree.html). You can pass that tree to other Origami builtins to read and — if enabled — write files using that connection.

Origami includes an [`Origami.sftp`](/builtins/origami/sftp.html) builtin for representing a connection to a network host via [SFTP](https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) (SSH File Transfer Protocol). See that page for setup instructions.

Origami also has several [extensions](/builtins/extensions.html) that can represent connections to other services; see the extension's README file for instructions.

## Using the network connection in Origami commands

Once you've defined your host connection in a file, you can pass that file to any Origami function that accepts a tree.

For example, you can list out the files and subfolders at the top level of your network files with [`Tree.keys`](/builtins/tree/keys.html):

```console
$ ori keys host.ori
assets/
posts/
feed.json
index.html
README.md
```

You can also use the connection file in a path to extract a specific file:

```console
$ ori host.ori/README.md
This is my personal blog…
```

You can retrieve a file and extract data directly from it:

```console
$ ori "(host.ori/feed.json).title"
My blog
```

## Publishing to servers

Once you have a file representing a network host, you can use that as the target of the [`Dev.publish`](/builtins/dev/publish.html) builtin:

```console
$ ori publish src/site.ori, host.ori
```

This lets you publish a site (or a folder of files, etc.) directly to the host.

## Caching network files locally

If you will often download files from a network host, it can be helpful to cache a copy of the files locally with [`Tree.cache`](/builtins/tree/cache.html). For example, you can arrange to have files from `host.ori` cached in a local folder called `cache`:

```ori
// hostCache.ori
Tree.cache(host.ori, files:cache)
```

You can then extract resources from this file:

```console
$ ori hostCache.ori/README.md
This is my personal blog…
```

The first time you ask for a file like `README.md`, it will be read from the network. Thereafter, requests for that file will complete immediately using the local copy.
