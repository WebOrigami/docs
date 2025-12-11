This folder contains code for posting a comic to Mastodon.

This requires an access token / bearer token as a string in `token.json`. This can be obtained from the Mastodon Development / Application settings.

Workflow from this folder:

1. Create the `post` folder for the comic with the given date.
2. Post the images and get the media data, including the media IDs.
3. Post the status, which incorporates the media IDs from the previous step.

```console
$ ori prepare.ori/2026-01-05
$ ori uploadImages.ori/ | tee media.yaml
$ ori uploadPost.ori/ | tee post.yaml
```

For testing, `visibility: unlisted` in postStatus.ori.yaml seems the best option — but that still makes the post visible to followers. `direct` can be used for previewing, but then the post can't be made public later; it has to be reposted.

It appears that, if a post is deleted through the Mastodon UI, the associated media is deleted too. It's possible to delete a post with `delete_media` set to false but that requires using the API.
