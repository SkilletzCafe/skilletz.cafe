## help - Display help about make targets for this Makefile
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

BUILD_DIR := docs

## install - install dependency packages
install:
	npm install

## dev - starts the Next.js development server on port 3000
dev: install
	npm run dev

## run - run the Next.js app server
run: install
	npm run build && npm start

## clean - clean previous builds
clean:
	rm -rf $(BUILD_DIR)/

## build - build the app for release
build: clean install
	npm run build
	cp CNAME $(BUILD_DIR)/ || true
	touch $(BUILD_DIR)/.nojekyll

## deploy - build and deploy the app
deploy: build
	git add $(BUILD_DIR)
	git commit -m "Deploy `git rev-parse --verify HEAD`" --no-verify
	git push origin master

## prepare-commit-ai - Create a commit message for the current changes using AI
prepare-commit-ai:
	touch .github/meta/diff.txt
	touch .github/meta/commit.txt
	git -P diff --staged > .github/meta/diff.txt

## init-rules - Initialize working copies for editing (.cursor/rules/*.mdc → .cursor/rules/*.mdc.draft)
init-rules:
	@echo "Creating working copies for editing..."
	@for file in .cursor/rules/*.mdc; do \
		cp -f "$$file" "$$file.draft"; \
	done
	@echo "Working copies created successfully!"

## save-rules - Save working copy changes back to source (.cursor/rules/*.mdc.draft → .cursor/rules/*.mdc)
save-rules:
	@echo "Saving changes back to source..."
	@for file in .cursor/rules/*.mdc.draft; do \
		basename=$$(basename "$$file" .draft); \
		cp -f "$$file" ".cursor/rules/$$basename"; \
	done
	@echo "Source files updated successfully!"
