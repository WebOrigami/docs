---
title: Network hosts
subtitle: Representing connections to file storage servers
---

Origami allows you to directly read and write files from network servers such as file storage providers and static site hosts.

For retrieving individual files, you can use the Origami language to read a public network file using a URL (see the [`https` protocol](/builtins/protocol/https.html)), but you can also create and work with connections to network servers to:

- Access private files using, for example, a user name and password
- List the files on a server
- Create a local cache of server files using [`Tree.cache`](/builtins/tree/cache.html)
- Publish your site to a static site host, or backup files to a file storage host, using [`Dev.publish`](/builtins/dev/publish.html)

Among other things, this can provide an alternative to using a network service's tools to update your files or site. That said, this is a somewhat advanced topic, as many network services make it somewhat difficult to collect the information required to make a connection.

## Representing a network connection

You can work with network files by calling a function that returns a read-only or read-write [map-based tree](/async-tree/mapBasedTree.html). That returns a tree you can pass to other Origami builtins to read and — if enabled — write files using that connection.

Origami includes an [`Origami.sftp`](/builtins/origami/sftp.html) builtin for representing a connection to a network host via [SFTP](https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) (Secure File Transfer Protocol). Origami also has several [extensions](/builtins/extensions.html) that can represent connections to other services; see the README file

## Listing files

## Manipulating files

## Caching network files locally

## Publishing to servers

static site hosts or file servers
