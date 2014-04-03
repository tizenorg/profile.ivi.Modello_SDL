PROJECT = html5UISDL

VERSION := 0.0.1
PACKAGE = $(PROJECT)-$(VERSION)

INSTALL_FILES = $(PROJECT).wgt
INSTALL_DIR = ${DESTDIR}/opt/usr/apps/.preinstallWidgets

wgtPkg:
	zip -r $(PROJECT).wgt app audio config.xml css ffw icon.png images index.html js lib locale

install:
	@echo "Installing Smart Device Link, stand by..."
	mkdir -p $(INSTALL_DIR)/
	cp $(PROJECT).wgt $(INSTALL_DIR)/

dist:
	tar czf ../$(PACKAGE).tar.bz2 .
