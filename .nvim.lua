vim.lsp.config("denols", {
  settings = {
    deno = {
      enable = true,
      lint = true,
      unstable = true,
    },
  },
})

vim.lsp.config("tailwindcss", {
  settings = {
    tailwindCSS = {
      experimental = {
        configFile = "src/_includes/style.css",
      },
    },
  },
})

vim.lsp.enable({ "denols", "tinymist", "tailwindcss" })
