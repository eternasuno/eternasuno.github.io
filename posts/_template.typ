#let target = sys.inputs.at("target", default: "pdf")

#let post(description: "", tags: (), title: auto, body) = {
  let final-title = if title == auto {
    datetime.today().display("[year]-[month]-[day]")
  } else {
    title
  }

  set document(title: final-title, description: description, keywords: tags)
  [#metadata((title: final-title, tags: tags, description: description)) <frontmatter>]

  show math.equation: it => {
    if target == "html" { html.frame(it) } else { it }
  }

  show image: it => {
    if target == "html" {
      let original-path = it.source
      let file-name = original-path.split("/").last()
      let web-path = "/img/" + file-name

      html.elem("img", attrs: (
        src: web-path,
        alt: if it.alt != none { it.alt } else { "" },
        loading: "lazy",
        class: "typst-article-image",
      ))
    } else {
      align(center, it)
    }
  }

  show: doc => {
    if target == "html" {
      set raw(theme: none)
      doc
    } else {
      doc
    }
  }

  if target != "html" {
    align(center, text(size: 2em, weight: "bold", final-title))
    v(2em)
  }

  body
}
