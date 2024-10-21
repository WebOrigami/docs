---
title: "@calendarTree(options)"
---

This returns a tree structure representing years, months, and days from a start date to an end date. This is useful, for example, in generating a portion of a site that presents information for a given year, month, or day.

The `options` determines the result through the following properties:

- `startDate`: a date provided as a string in "YYYY-MM-DD", "YYYY-MM", or "YYYY" format. If a start year is provided, but a month is not, then the first month of the year will be used. If a start month is provided without a day, the first day of that month will be used. Default value: today.
- `endDate`: a date in the same formats as `startDate`. If an end year is provided by a month is not, the last month of the year will be used. If an end month is provided without a day, the last day of that month will be used. Default value: today.
- `value`: a function that accepts `(year, month, day)` parameters. This is required.

Example: A site wants to define `year/month/day` routes for a given time range. For brevity, this will just be the week from 2025-02-26 to 2025-03-04. These routes can be defined as:

```ori
// calendar.ori
${ samples.ori/help/calendar.ori }
```

This produces a skeleton calendar tree with the years, months, and days for that time range:

```console
$ ori calendar.ori/
${ @yaml samples.ori/help/calendar.ori/ }
```

<figure>
${ svg.js samples.ori/help/calendar.ori/ }
</figure>

When served, this would allow someone to browse to the page for a given date using a route like `/2025/03/03`.
