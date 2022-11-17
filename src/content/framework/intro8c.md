---
title: Map data to full HTML pages
teamByName = mapKeys(client/samples/frameworkIntro/focusedTeam.yaml, =name):
team1 = map(teamByName, =`<h1>{{ name }}</h1>`):
team2 = map(teamByName, framework-intro/assets/person.ori, '', '.html'):
---

## Transform a graph's keys

The last thing you need to build for the About Us site is a virtual `team` folder that will hold pages for each user. To lay the groundwork for that, you're first going to transform the graph of team data in `team.yaml`. Specifically, you're going to change the _keys_ of that graph.

The reason for this is that, as we've seen the keys of the graph of team data in `team.yaml` are integers, like `team.yaml/0` for the first person. But in your final website graph, you'd like the keys of the pages in the `team` area to include the person's name, like `/public/team/Alice.html`.

<span class="tutorialStep"></span> In the `+internal.yaml` file, add the new line at the bottom:

```yaml
title: Our Amazing Team
teamByName = mapKeys(team.yaml, =name):
```

The `mapKeys` function is like `map`, but instead of changing a graph's values, it changes the graph's keys:

<div class="sideBySide">
  <figure class="constrain">
    {{ svg client/samples/frameworkIntro/focusedTeam.yaml }}
  </figure>
  <figure class="constrain">
    {{ svg teamByName }}
  </figure>
  <figcaption>team.yaml: array indices as top-level keys</figcaption>
  <figcaption>teamByName: names as top-level keys</figcaption>
</div>

## Transform a data graph into HTML pages

Earlier you created an `index.html` page by invoking an Origami template. You also created a `greetings` graph that mapped the team members to a graph of greetings using a JavaScript function. Now you'll combine those ideas: map the graph of team members to a graph of HTML pages using an Origami template.

<span class="tutorialStep"></span> In the `src` folder, create a file called `person.ori` and type or copy/paste the following HTML:

```
<h1>\{\{ name }}</h1>
```

Applying this template to one of the people records in `team.yaml` will produce an HTML page showing information about that person. You can apply that template to all of the team members at once using a map.

<span class="tutorialStep"></span> In the `+public.yaml` file, add the new line at the bottom:

```yaml
index.html = index.ori():
thumbnails = map(images, =image/resize(@value, width=400)):
team = map(teamByName, person.ori):
```

<span class="tutorialStep"></span> Visit the `team` route in the served site, and select a person's name to see a rudimentary HTML page for that person.

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

Let's make the `person.ori` template a bit more realistic. The project's `assets` folder contains a fuller `person.ori` template with some more elements:

```html
{{ framework-intro/assets/person.ori }}
```

<span class="tutorialStep"></span> Move or copy the contents of that `person.ori` template from the `assets` folder to the `person.ori` template in the `src` folder.

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Graph transformations will often want to change these extensions to reflect a change in the type of data. For this reason, functions like `map` allow you to add, change, or remove extensions.

In this case, you want to map a person object with a key like `Alice` to an HTML file name like `Alice.html` to reflect the fact that that transformed graph value contains HTML.

<span class="tutorialStep"></span> Update the `team` formula in `+public.yaml` so that it reads:

```yaml
team = map(teamByName, person.ori, '', '.html'):
```

The empty third parameter (`''`) indicates that you don't want to _remove_ anything from the graph keys, because they don't have any extension. The fourth parameter (`'.html'`) indicates that you want to _add_ `.html` to the graph keys.

<span class="tutorialStep"></span> Observe that the pages in the `team` route now end in `.html`.

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

With that, you've built the desired `team` route in the site, and have completed the real work of building the site.

&nbsp;

Next: [Graph tools](intro9.html) »
