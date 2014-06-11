PROJECT = Modello_SDL

VERSION := 0.0.2
PACKAGE = $(PROJECT)-$(VERSION)

INSTALL_FILES = $(PROJECT).wgt
INSTALL_DIR = ${DESTDIR}/opt/usr/apps/.preinstallWidgets

wgtPkg:
	zip -r $(PROJECT).wgt app audio config.xml css ffw SmartDeviceLink_icon.png images index.html js lib locale

install:
	@echo "Installing Smart Device Link, stand by..."
	mkdir -p $(INSTALL_DIR)/
	mkdir -p ${DESTDIR}/opt/usr/apps/_common/icons
	cp $(PROJECT).wgt $(INSTALL_DIR)/
	cp SmartDeviceLink_icon.png ${DESTDIR}/opt/usr/apps/_common/icons

dist:
	tar czf ../$(PACKAGE).tar.bz2 .