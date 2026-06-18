vim.lsp.config("denols", {
	cmd = { "deno", "lsp" },
	filetypes = {
		"javascript",
		"javascriptreact",
		"javascript.jsx",
		"typescript",
		"typescriptreact",
		"typescript.tsx",
	},
	root_markers = { "deno.json", "deno.jsonc" },
	single_file_support = false,
	settings = {
		deno = {
			enable = true,
			lint = true,
			unstable = true,
		},
	},
})

vim.lsp.enable("denols")

vim.lsp.config("tinymist", {
	cmd = { "tinymist", "lsp" },
	filetypes = { "typst" },
	root_markers = { ".git" },
	single_file_support = true,
})

vim.lsp.enable("tinymist")
