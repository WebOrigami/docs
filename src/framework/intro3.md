---
title: |
  Intro part 3:
  Roughing in the site structure
numberHeadings: true
---

This follows the [previous section on identifying transformations](intro2.html).

For this phase, you'll create the general skeleton for the About Us area of your organization's site, focusing on how getting things to work rather than on how they look.

## Creating the team data file

In the `prototype` folder, create a new file called `team.yaml` and paste in the following

```yaml
- id: alice
  name: Alice Wijaya
  location: Jakarta
  position: Experience Designer
  bio: (Alice's bio goes here)
- id: imani
  name: Imani Davenhall
  location: Los Angeles
  position: President
  bio: (Imani's bio goes here)
- id: ines
  name: Ines Silva
  location: Lisbon
  position: Editor
  bio: (Ines's bio goes here)
```

## Transform the team graph to add a key

--> deciding how to represent team member data

The `step3` folder contains two files. The first is a data file called `alice.yaml` containing data for an individual team member named Alice.

```yaml
id: alice
name: Alice Wijaya
location: Jakarta
position: Experience Designer
bio: |
  Alice opens the line of communication between clients, customers, and
  businesses to get projects done. With over 15 years in both public and
  private sectors, she has experience in management consultation, team
  building, professional development, strategic implementation, and company
  collaboration. She has a passion for helping people and businesses succeed,
  and is always looking for ways to improve the world.
```

This data is in [YAML](https://yaml.org/) format because that can be easier for people to read and write directly. If you prefer, you could also use the standard JSON format.

## Transform the team graph into HTML pages

## Creating an index page

Our site's About Us area now has pages for each team member. The next step will be to link to all those pages from an index page for the About Us area. This index page will list the photos and names of the team members. The listing for each person will link to their corresponding team member page.

To phrase this in graph terms, consider the graph of HTML pages above. The index page will capture the information in the left, circular node. We want to give the index a link corresponding to each of the arrows leading from that node to the pages for team members.

The `step5` folder contains a template for the index page called `index.hbs`. This template expects to be passed a graph of person data — the data in the same `team.yaml` shown above. For each person in that graph, the template will create a list item linking to that person. The relevant portion of the template looks like:

```handlebars
<ul class="tileGrid">
  {{#each this}}
    <li class="tile">
      <a href="team/{{@key}}">
        <img
          class="avatar small"
          src="/src/assets/headshots/{{@key}}.jpg"
          alt="{{name}}"
        />
        <h2 class="name">{{name}}</h2>
        <div class="position">{{position}}</div>
      </a>
    </li>
  {{/each}}
</ul>
```

You can produce the index page with a formula that applies the `index.hbs` template to the `team.yaml` data. Create a new, empty file called

```console
index.html = index.hbs(team.yaml)
```

You can view that index page at http://localhost:5000/src/step5/. Clicking a person on that page will navigate you to their individual page.

### Defining the data as an array instead of an object

```console
$ ori addIndex team.yaml, "'name'"
Alice:
  name: Alice
Bob:
  name: Bob
Carol:
  name: Carol
```
