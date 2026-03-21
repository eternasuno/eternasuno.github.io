#import "./_template.typ": post

#show: post.with(
  title: "hello world",
  description: "This is a test post to verify Typst's basic functionality.",
  tags: "typst",
)

= Hello, world!

This is a test post to verify Typst's basic functionality.

inline math: $E = m*c^2$

block math:
$ A = pi r^2 $
$ "area" = pi dot "radius"^2 $
$
  cal(A) :=
  { x in RR | x "is natural" }
$
#let x = 5
$ #x < 17 $

```javascript
console.log("Hello, world!");
```
