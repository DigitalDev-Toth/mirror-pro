STIME:=date '+%s' > $@_time
ETIME:=read st < $@_time; st=$$((`date +%s`-$$st)) ; echo Elapsed time: $$((st))s ; echo "--------" ; rm -f _time

BASE_ENTRY_NAME:=mirror_pro
BASE_ENTRY_PATH:=src
BASE_ENTRY_PATH_JS:=javascript
BASE_ENTRY_PATH_SCSS:=javascript
BASE_OUTPUT_PATH:=public
BASE_OUTPUT_PATH_JS:=assets/javascript
BASE_OUTPUT_PATH_CSS:=assets/stylesheet

dll:
	@$(STIME)
	@$(call dll_handler,$f,$e)
	@$(ETIME)

build:
	@make --no-print-directory dll
	@$(STIME)
	@$(call build_handler,$e)
	@$(ETIME)

wds:
	@make --no-print-directory dll
	@$(call wds_handler)

define dll_handler
	ENTRY_NAME=$(BASE_ENTRY_NAME) ;\
	ENTRY_PATH=$(BASE_ENTRY_PATH) ;\
	ENTRY_PATH_JS=$(BASE_ENTRY_PATH_JS) ;\
	OUTPUT_PATH=$(BASE_OUTPUT_PATH) ;\
	OUTPUT_PATH_JS=$(BASE_OUTPUT_PATH_JS) ;\
	DLL_PATH=$$OUTPUT_PATH/$$OUTPUT_PATH_JS ;\
	\
	if [[ ! -e "$$DLL_PATH/$$ENTRY_NAME.vendor.json" || "$(1)" = "true" ]]; then \
		echo "Bundling DLL" ;\
		\
		rm -f $$DLL_PATH/$$ENTRY_NAME.vendor.json $$DLL_PATH/$$ENTRY_NAME.vendor.js ;\
		\
		if [ "$(2)" = "production" ]; then \
			BUNDLE_TASK=dll \
			ENTRY_NAME=$$ENTRY_NAME \
			ENTRY_PATH=$$ENTRY_PATH \
			OUTPUT_PATH=$$OUTPUT_PATH \
			OUTPUT_PATH_JS=$$OUTPUT_PATH_JS \
			INCLUDE_JS=$$ENTRY_PATH/$$ENTRY_PATH_JS \
			DLL_PATH=$$OUTPUT_PATH/$$OUTPUT_PATH_JS \
			NODE_ENV=production \
			./node_modules/.bin/webpack --display-chunks --hide-modules ;\
		else \
			BUNDLE_TASK=dll \
			ENTRY_NAME=$$ENTRY_NAME \
			ENTRY_PATH=$$ENTRY_PATH \
			OUTPUT_PATH=$$OUTPUT_PATH \
			OUTPUT_PATH_JS=$$OUTPUT_PATH_JS \
			INCLUDE_JS=$$ENTRY_PATH/$$ENTRY_PATH_JS \
			DLL_PATH=$$DLL_PATH \
			./node_modules/.bin/webpack --display-chunks --hide-modules ;\
		fi ;\
	else \
		echo "DLL does not need to be built" ;\
	fi
endef

define build_handler
	ENTRY_NAME=$(BASE_ENTRY_NAME) ;\
	ENTRY_PATH=$(BASE_ENTRY_PATH) ;\
	ENTRY_PATH_JS=$(BASE_ENTRY_PATH_JS) ;\
	ENTRY_PATH_SCSS=$(BASE_ENTRY_PATH_SCSS) ;\
	ENTRY_FULL_PATH=$$ENTRY_PATH/$$ENTRY_PATH_JS ;\
	OUTPUT_PATH=$(BASE_OUTPUT_PATH) ;\
	OUTPUT_PATH_JS=$(BASE_OUTPUT_PATH_JS) ;\
	OUTPUT_PATH_CSS=$(BASE_OUTPUT_PATH_CSS) ;\
	OUTPUT_PATH_FULL_JS=$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME ;\
	\
	echo "Building Mirror Pro" ;\
	\
	rm -f \
		$$OUTPUT_PATH/index.html \
		$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME.*.min.js \
		$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME.*.min.map \
		$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME.js \
		$$OUTPUT_PATH/$$OUTPUT_PATH_CSS/$$ENTRY_NAME.*.min.css ;\
	\
	for path in $(shell find src/javascript -name "index.*"); \
	do \
		BASENAME=$$(basename $$path) ;\
		FILENAME=$${BASENAME%.*} ;\
		\
		if [ "$(1)" = "production" ]; then \
			BUNDLE_TASK=prod \
			ENTRY_PATH=$$ENTRY_PATH \
			OUTPUT_PATH=$$OUTPUT_PATH \
			OUTPUT_PATH_JS=$$OUTPUT_PATH_JS \
			OUTPUT_PATH_CSS=$$OUTPUT_PATH_CSS \
			DLL_MANIFEST_PATH=$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME \
			INCLUDE_JS=$$ENTRY_PATH/$$ENTRY_PATH_JS \
			INCLUDE_SCSS=$$ENTRY_PATH/$$ENTRY_PATH_SCSS \
			NODE_ENV=production \
			./node_modules/.bin/webpack -p --display-chunks --hide-modules $$ENTRY_NAME=./$$path ;\
		else \
			BUNDLE_TASK=dev \
			ENTRY_PATH=$$ENTRY_PATH \
			OUTPUT_PATH=$$OUTPUT_PATH \
			OUTPUT_PATH_JS=$$OUTPUT_PATH_JS \
			OUTPUT_PATH_CSS=$$OUTPUT_PATH_CSS \
			DLL_MANIFEST_PATH=$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME \
			INCLUDE_JS=$$ENTRY_PATH/$$ENTRY_PATH_JS \
			INCLUDE_SCSS=$$ENTRY_PATH/$$ENTRY_PATH_SCSS \
			./node_modules/.bin/webpack --display-chunks --hide-modules $$ENTRY_NAME=./$$path ;\
		fi ;\
	done
endef

define wds_handler
	ENTRY_LIST="" ;\
	ENTRY_NAME=$(BASE_ENTRY_NAME) ;\
	ENTRY_PATH=$(BASE_ENTRY_PATH) ;\
	ENTRY_PATH_JS=$(BASE_ENTRY_PATH_JS) ;\
	ENTRY_PATH_SCSS=$(BASE_ENTRY_PATH_SCSS) ;\
	OUTPUT_PATH=$(BASE_OUTPUT_PATH) ;\
	OUTPUT_PATH_JS=$(BASE_OUTPUT_PATH_JS) ;\
	OUTPUT_PATH_CSS=$(BASE_OUTPUT_PATH_CSS) ;\
	DLL_PATH=$$OUTPUT_PATH/$(DLL_NAME) ;\
	WDS_HOSTNAME=0.0.0.0 ;\
	WDS_PORT=8058 ;\
	WDS_PROXY="http://127.0.0.1:8018/" ;\
	WDS_URL="http://$$WDS_HOSTNAME:$$WDS_PORT" ;\
	\
	PID=$(shell fuser $$WDS_PORT/tcp 2> /dev/null) ;\
	if [ ! "$$PID" = "" ]; then kill $PID; fi ;\
	\
	for path in $(shell find src/javascript -name "index.*"); \
	do \
		if [ "$$ENTRY_LIST" = "" ]; then \
			ENTRY='"'$$ENTRY_NAME'":["react-hot-loader/patch","webpack-dev-server/client?'$$WDS_URL'","webpack/hot/only-dev-server","'./$$path'"]' ;\
			ENTRY_LIST="$$ENTRY" ;\
		else \
			ENTRY='"'$$ENTRY_NAME'":["react-hot-loader/patch","webpack-dev-server/client?'$$WDS_URL'","webpack/hot/only-dev-server","'./$$path'"]' ;\
			ENTRY_LIST="$$ENTRY_LIST,$$ENTRY" ;\
		fi \
	done ;\
	\
	ENTRY_LIST="{$$ENTRY_LIST}" ;\
	\
	BUNDLE_TASK=wds \
	ENTRY_LIST=$$ENTRY_LIST \
	ENTRY_PATH=$$ENTRY_PATH \
	OUTPUT_PATH=$$OUTPUT_PATH \
	OUTPUT_PATH_JS=$$OUTPUT_PATH_JS \
	OUTPUT_PATH_CSS=$$OUTPUT_PATH_CSS \
	DLL_MANIFEST_PATH=$$OUTPUT_PATH/$$OUTPUT_PATH_JS/$$ENTRY_NAME \
	INCLUDE_JS=$$ENTRY_PATH/$$ENTRY_PATH_JS \
	INCLUDE_SCSS=$$ENTRY_PATH/$$ENTRY_PATH_SCSS \
	INCLUDE_ESLINT=$$ENTRY_PATH/$$ENTRY_PATH_ESLINT \
	INCLUDE_STYLELINT=$$ENTRY_PATH/$$ENTRY_PATH_SCSS \
	WDS_HOSTNAME=$$WDS_HOSTNAME \
	WDS_PORT=$$WDS_PORT \
	WDS_PROXY=$$WDS_PROXY \
	./node_modules/.bin/webpack-dev-server
endef
