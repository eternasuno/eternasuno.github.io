#let target = sys.inputs.at("target", default: "pdf")

#let drawing(body) = {
  if target == "html" {
    html.frame(box(body))
  } else {
    body
  }
}

#let post(description: "", tags: (), title: "Untitled", body) = {
  set document(title: title, description: description, keywords: tags)
  [#metadata((title: title, tags: tags, description: description)) <frontmatter>]

  show image: it => {
    if target == "html" {
      let original-path = it.source
      let file-name = original-path.split("/").last()
      let web-path = "/img/" + file-name

      html.elem("img", attrs: (
        src: web-path,
        alt: if it.alt != none { it.alt } else { "" },
        loading: "lazy",
        "image-size": "",
      ))
    } else {
      align(center, it)
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
