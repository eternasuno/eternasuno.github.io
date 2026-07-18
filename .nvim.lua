vim.lsp.config("denols", {
  settings = {
    deno = {
      enable = true,
      lint = true,
      unstable = true,
    },
  },
})

vim.lsp.enable({ "denols", "tinymist", "tailwindcss" })
