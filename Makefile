.PHONY: build watch

entrypoints = ./github.mjs ./open_url.mjs

build:
	bun build $(entrypoints) --outdir ./out

watch: 
	bun build $(entrypoints) --outdir ./out --watch
