---
title: "@calendarTree([startDate], [endDate])"
---

This returns a tree structure representing years, months, and days from a start date to an end date. This is useful, for example, in generating a portion of a site that presents information for a given year, month, or day.

Both the `startDate` and `endDate` can be provided in "YYYY-MM-DD", "YYYY-MM", or "YYYY" format.

- If a start year is provided, but a month is not, then the first month of the year will be used.
- If a start month is provided, but a day is not, then the first day of that month will be used.

Similar logic applies to the end date, using the last month of the year or the last day of the month.

If a start date is omitted, today will be used, likewise for the end date.

Example: A site wants to define `year/month/day` routes for a given time range. For brevity, this will just be the week from 2025-02-26 to 2025-03-04. These routes can be defined as:

```ori
@calendarTree("2025-02-26", "2025-03-04")
```

This produces a skeleton calendar tree with the years, months, and days for that time range:

```
${ @yaml @calendarTree("2025-02-26", "2025-03-04") }
```

<figure>
${ svg.js {
  2025: {
    02: {
      26: ""
      27: ""
      28: ""
    }
    03: {
      01: ""
      02: ""
      03: ""
      04: ""
    }
  }
} }
</figure>

All of the values in this tree are `null`. You can use nested [@map](@map.html) calls to map this skeleton tree to more interesting values that incorporate the year, month, and day:

```ori
// calendar.ori
${ samples.ori/help/calendar.ori }
```

This makes a page for a given day available at the expected year/month/day route:

```console
$ ori calendar.ori/2025/02/28
${ samples.ori/help/calendar.ori/2025/02/28 }
```
