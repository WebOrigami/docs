---
title: sftp(options)
supertitle: "Origami."
---

This function returns a [map-based tree](/async-tree/mapBasedTree.html) of network files on a server that supports [SFTP](https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) (SSH File Transfer Protocol), a standard internet protocol for transferring files. You can use this to create a [network host connection](/cli/network.html) to server files so you can retrieve files or [publish](/builtins/dev/publish.html) them directly to a server from Origami.

## Representing a network connection

The current state of server hosting is such that setting up an SFTP connection is generally complicated, and the instructions will vary from one hosting company to another. Most hosts that support downloading and uploading files via SFTP will document the process somewhere in their Help or Support area.

You will generally have two ways you can connect to an SFTP server:

- Using a username and password. This is easier to set up — but you will end up having to save your password in a text file on your computer.
- Using a secure cryptographic key. This is more complex but more secure.

The rest of this example will assume the use of a username and password.

Create a file to represent your network host, call it `host.ori` or incorporate the name of your hosting company. Copy and paste the following

```ori
// host.ori
Origami.sftp({
  host: "example.com"
  password: "passwordGoesHere"
  path: "public_html"
  username: "alice"
})
```

Edit the text to reflect your `host`, `password`, and `username`. The `path` argument is optional; if you omit it, by default you'll be working with the files at the top of your user account. But many web hosts typically have you store site files in a subfolder, which might be called something like `httpdocs` or `public_html`; you'll need to check your host's documentation.

Note: If you use a source control system like git, add this file to `.gitignore`. Never check passwords into source control! Because this is an Origami file, you also have the option of breaking it up into smaller pieces. You could store the password separately in a file called `password.txt` that is _not_ saved in source control, then have `host.ori` reference that file:

```ori
// host.ori
Origami.sftp({
  host: "example.com"
  password: password.txt
  path: "public_html"
  username: "alice"
})
```

With this approach, `host.ori` contains no sensitive information and so is safe to check into source control.

If your using cryptographic keys, omit the `password` field. `Origami.sftp` should connect with the same keys available to you via `ssh`.

## Test your connection

After creating an SFTP connection file like `host.ori`, you can test it by using [`Tree.keys`](/builtins/tree/keys.html) to list out the top level files and subfolders:

```console
$ ori keys host.ori
assets/
posts/
feed.json
index.html
README.md
```

Once you've tested that your connection works, you can retrieve files from the host; see [using the network connection](/cli/network.html#using-the-network-connection-in-origami-commands).

## Publish

You can publish your site via SFTP with a command like:

```console
$ ori "publish src/site.ori, host.ori, { manifest: 'manifest.json' }"
```

See [`Dev.publish`](/builtins/dev/publish.html) for details.

The `manifest` option lets the publish operation keep track of what's already been published before. If you have shell access to your account (see below), then you don't need that option; Origami will be able to efficiently ask the server what files it currently has.

## Shell access

Additionally, some hosting companies that support SFTP will include full shell access, which lets you log into your account on their server. Other companies will give you SFTP access, but not provide a way for you to sign in.

If you do have shell access, add the following option to your `host.ori` file:

```
  shellAccess: true
```

This `shellAccess` option:

- Lets `Origami.sftp` perform network operations in fewer steps.
- Enables the efficient retrieval of a manifest for the server files for use with [`Tree.manifest`](/builtins/tree/manifest.html) and [`Tree.changes`](/builtins/tree/changes.html). This makes the [`Dev.publish`](/builtins/dev/publish.html) command be more efficient, and obviates the need for you to set a `manifest` option.
