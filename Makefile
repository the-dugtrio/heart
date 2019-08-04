# .PHONY: test
default: help
new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))
	npm run build:file

package:
	node build/bin/new-package.js $(filter-out $@,$(MAKECMDGOALS))
	npm run build:file

dev:
	npm run dev

pub:
	npm run pub

deploy:
	npm run deploy

test:
	npm run test:watch

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake new <component-name> [中文名]\033[0m\t---  创建新组件 package. 例如 'make new button 按钮'"
	@echo "   \033[35mmake package <component-name> [中文名]\033[0m\t---  创建扩展组件 package. 例如 'make package button 按钮'"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake pub\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  发布到 npm 上"

