---
title: Map data to full HTML pages
teamByName = mapKeys(client/samples/frameworkIntro/focusedteamData.yaml, =name):
team1 = map(teamByName, =`<h1>{{ name }}</h1>`):
team2 = map(teamByName, framework-intro/assets/person.ori, extension='→html'):
---

## Transform a graph's keys

The last thing you need to build for the About Us site is a virtual `team` folder that will hold pages for each user. To lay the groundwork for that, you're first going to transform the graph of team data in `teamData.yaml`. Specifically, you're going to change the _keys_ of that graph.

The reason for this is that, as you've seen, the top-level keys in `teamData.yaml` are integers, like `0` for the first person. But in your final website graph, you'd like the keys of the pages in the `team` area to include the person's name, like `Alice.html`.

<span class="tutorialStep"></span> In the `+.yaml` file, add a new formula for `teamByName` at the bottom:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index.ori template
index.html = index.ori():

# Thumbnails for all the images, at 200 pixels width
thumbnails = map(images, =image/resize(@value, width=200)):

# A graph of the team data by name (hidden)
(teamByName) = mapKeys(teamData.yaml, =name):
```

This new formula defines a hidden graph called `teamByName`. The `mapKeys` function is like `map`, but instead of changing a graph's values, it changes the graph's keys:

<div class="sideBySide">
  <figure class="constrain">
    {{ svg client/samples/frameworkIntro/focusedteamData.yaml }}
  </figure>
  <figure class="constrain">
    {{ svg teamByName }}
  </figure>
  <figcaption>teamData.yaml: array indices as top-level keys</figcaption>
  <figcaption>teamByName: names as top-level keys</figcaption>
</div>

Where `teamData.yaml` has top-level keys of `0`, `1`, `2`, the virtual `teamByName` graph has top-level keys of `Alice`, `Bob`, `Carol`.

## Transform a data graph into HTML pages

Earlier you created a single `index.html` page by invoking an Origami template as a function. You also created a `greetings` graph that mapped the team members to a graph of greetings using a JavaScript function. Now you'll combine those ideas: map the graph of team members to a graph of HTML pages using an Origami template.

<span class="tutorialStep"></span> In the `src` folder, create a file called `person.ori` and type or copy/paste the following HTML:

```
<h1>\{\{ name }}</h1>
```

Applying this template to one of the people records in `teamData.yaml` will produce an HTML page showing information about that person. You can apply that template to all of the team members at once using a map.

<span class="tutorialStep"></span> In the `+.yaml` file, add a new formula for `team` at the bottom:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index.ori template
index.html = index.ori():

# Thumbnails for all the images, at 200 pixels width
thumbnails = map(images, =image/resize(@value, width=200)):

# A graph of the team data by name (hidden)
(teamByName) = mapKeys(teamData.yaml, =name):

# HTML pages for each team member via the person.ori template
team = map(teamByName, person.ori):
```

<span class="tutorialStep"></span> Navigate to `team` in the browser preview, and select a person's name to see a page with that person's name as a heading, like **Alice**.

<div class="sideBySide">
  <figure class="constrain">
    {{ svg teamByName }}
  </figure>
  <figure>
    {{ svg team1 }}
  </figure>
  <figcaption>Graph of people by name…</figcaption>
  <figcaption>…maps to HTML pages for each person</figcaption>
</div>

## Flesh out the person template

Let's make the `person.ori` template a bit more realistic.

<span class="tutorialStep"></span> Copy and paste the following into the `person.ori` template. (You can also find this in `/assets/person.ori`.)

```html
{{ framework-intro/assets/person.ori }}
```

This template has more elements, but works exactly the same way as the one you wrote by hand above.

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Graph transformations will often want to change these extensions to reflect a change in the type of data. For this reason, functions like `map` allow you to add, change, or remove extensions.

In this case, you want to map a person object with a key like `Alice` to an HTML file name like `Alice.html` to reflect the fact that that transformed graph value contains HTML.

<span class="tutorialStep"></span> Update the `team` formula in `+.yaml` so that it reads:

```yaml
team = map(teamByName, person.ori, extension='->html'):
```

The third parameter indicates how the transform should affect extensions. In this case: the original key won't have any extension (like `Alice`), and you want to _add_ the `.html` extension to the transformed key (`Alice.html`).

<span class="tutorialStep"></span> Navigate to the `.svg` page, and observe that the pages in the `team` route now end in `.html`.

The transformation now looks like:

<div class="sideBySide">
  <figure class="constrain">
    {{ svg teamByName }}
  </figure>
  <figure>
    {{ svg team2 }}
  </figure>
  <figcaption>Graph of people by name…</figcaption>
  <figcaption>…maps to a .html file for each person</figcaption>
</div>

With that, you've completed the work to build the site — all of your original functional requirements have been met. As long as the Graph Origami server is running, the virtual `public` graph matches the one in the sample About Us site you've been using as a model.

While this site meets the functional requirements, it's not yet as simple as it could be. Given the static nature of this site, you can completely remove the Graph Origami server from the picture.

&nbsp;

Next: [Graph tools](intro9.html) »
