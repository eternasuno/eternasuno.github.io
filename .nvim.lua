vim.lsp.config("tsc", {
  on_attach = function(client)
    client.server_capabilities.documentFormattingProvider = false
    client.server_capabilities.documentRangeFormattingProvider = false
  end,
})

vim.lsp.config("tailwindcss", {
  settings = {
    tailwindCSS = {
      experimental = {
        configFile = "_includes/style.css",
      },
    },
  },
})

vim.lsp.enable({ "tsc", "biome", "tinymist", "tailwindcss" })
