#let target = sys.inputs.at("target", default: "pdf")

#let post(description: "", tags: (), title: "Untitled", body) = {
  set document(title: title, description: description, keywords: tags)
  [#metadata((title: title, tags: tags, description: description)) <frontmatter>]

  show image: it => {
    if target == "html" {
      html.elem("img", attrs: (
        src: it.source,
        alt: if it.alt != none { it.alt } else { "" },
        loading: "lazy",
        "image-size": "",
      ))
    } else {
      align(center, it)
    }
  }

  show figure.where(kind: image): it => {
    if target == "html" and it.body.func() != image {
      html.elem("figure", {
        html.frame(box(it.body))
        it.caption
      })
    } else {
      it
    }
  }

  show table: it => {
    if target == "html" {
      html.elem("div", attrs: (class: "overflow-x-auto"), it)
    } else {
      it
    }
  }

  set raw(theme: none) if target == "html"

  if target != "html" {
    align(center, text(size: 2em, weight: "bold", title))
    v(2em)
  }

  body
}
