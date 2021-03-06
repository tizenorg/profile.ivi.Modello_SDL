/*
 * Copyright (c) 2013, Ford Motor Company All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *  · Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *  · Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *  · Neither the name of the Ford Motor Company nor the names of its
 * contributors may be used to endorse or promote products derived from this
 * software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @name SDL.controlButtons
 * @desc Climate module visual representation
 * @category View
 * @filesource app/view/home/controlButtons.js
 * @version 1.0
 */

SDL.ControlButtons = Em.ContainerView.create( {

    elementId: 'app_controlButtons',

    childViews:
        [
            'VRButton',
            'buttonControls',
            'driverDistractionControl',
            'protocolVersion',
            'infoTable',
            'sendData',
            'sendDataCheckBox',
            'sendDataLabel',
            'vehicleInfo',
            'tbtClientState',
            'UILanguages',
            'TTSVRLanguages',
            'UILanguagesLabel',
            'TTSVRLanguagesLabel',
            'appUILanguagesLabel',
            'appTTSVRLanguagesLabel',
            'appUILang',
            'appTTSVRLang'
        ],

    /*
     * Label with name of UILanguages select
     */
    appUILang: SDL.Label.extend( {

        elementId: 'appUILang',

        classNames: 'appUILang',

        contentBinding: 'SDL.SDLAppController.model.UILanguage'
    } ),

    /*
     * Label with name of TTSVRLanguages select
     */
    appTTSVRLang: SDL.Label.extend( {

        elementId: 'appTTSVRLang',

        classNames: 'appTTSVRLang',

        contentBinding: 'SDL.SDLAppController.model.TTSVRLanguage'
    } ),

    /*
     * Label with name of UILanguages select
     */
    appUILanguagesLabel: SDL.Label.extend( {

        elementId: 'appUILanguagesLabel',

        classNames: 'appUILanguagesLabel',

        content: 'application UI Languages'
    } ),

    /*
     * Label with name of TTSVRLanguages select
     */
    appTTSVRLanguagesLabel: SDL.Label.extend( {

        elementId: 'appTTSVRLanguagesLabel',

        classNames: 'appTTSVRLanguagesLabel',

        content: 'application (TTS + VR) Languages'
    } ),

    /*
     * Label with name of UILanguages select
     */
    UILanguagesLabel: SDL.Label.extend( {

        elementId: 'UILanguagesLabel',

        classNames: 'UILanguagesLabel',

        content: 'UI Languages'
    } ),

    /*
     * Label with name of TTSVRLanguages select
     */
    TTSVRLanguagesLabel: SDL.Label.extend( {

        elementId: 'TTSVRLanguagesLabel',

        classNames: 'TTSVRLanguagesLabel',

        content: 'TTS + VR Languages'
    } ),

    /*
     * HMI element Select with list of supported UI component languages
     */
    UILanguages: Em.Select.extend( {

        elementId: 'UILanguages',

        classNames: 'languageSelect',

        contentBinding: 'SDL.SDLModel.sdlLanguagesList',

        valueBinding: 'SDL.SDLModel.hmiUILanguage'
    } ),

    /*
     * HMI element Select with list of supported TTS and VR component languages
     */
    TTSVRLanguages: Em.Select.extend( {

        elementId: 'TTSVRLanguages',

        classNames: 'languageSelect',

        contentBinding: 'SDL.SDLModel.sdlLanguagesList',

        valueBinding: 'SDL.SDLModel.hmiTTSVRLanguage'
    } ),

    /**
     * Sending data from HMI for processing in SDLCore
     */
    sendData: SDL.Button.create( {
        elementId: 'sendData',
        classNames: 'sendData btnNotPressed',
        action: function() {
            FFW.BasicCommunication.SendData( null );
        },
        text: 'Send Data'
    } ),

    /**
     * Select for extended param of SendData
     */
    sendDataCheckBox: Em.Checkbox.extend( {

        elementId: 'sendDataCheckBox',

        classNames: 'sendDataCheckBox',

        checkedBinding: 'SDL.SDLModel.sendDataExtend'

    } ),

    /*
     * Label for sendDataCheckBox
     */
    sendDataLabel: SDL.Label.extend( {

        elementId: 'sendDataLabel',

        classNames: 'sendDataLabel',

        content: 'Use URL'
    } ),

    /**
     * VehicleInfo button
     */
    vehicleInfo: SDL.Button.create( {
        elementId: 'vehicleInfoButton',
        classNames: 'vehicleInfoButton btn',
        text: 'Vehicle Info',
        action: function() {
            // this._super();
            SDL.VehicleInfo.toggleActivity();
        }
    } ),

    /**
     * TBT Client State button
     */
    tbtClientState: SDL.Button.create( {
        elementId: 'tbtClientStateButton',
        classNames: 'tbtClientStateButton btn',
        text: 'TBT Client State',
        action: function() {
            // this._super();
            SDL.TBTClientStateView.toggleActivity();
        }
    } ),

    /**
     * Voice Recognition button
     */
    VRButton: SDL.Button.create( {
        elementId: 'VRButton',
        classNames: 'VRButton',
        action: 'activateVRPopUp',
        target: 'SDL.SDLController'
    } ),

    infoTable: Em.ContainerView.extend( {
        elementId: 'infoTable',

        classNames: 'infoTable',

        childViews:
            [
                'globalPropertiesLabel',
                'gpHelpData',
                'gpTimeoutData'
            ],

        globalPropertiesLabel: SDL.Label.extend( {

            elementId: 'sdlGPLabel',

            classNames: 'sdlGPLabel',

            content: 'HELP_PROMPT: TIMEOUT_PROMPT:'
        } ),

        gpHelpData: SDL.Label.extend( {

            elementId: 'sdlGPHData',

            classNames: 'sdlGPData',

            contentBinding: 'this.propertiesData',

            propertiesData: function() {
                var str = '';
                if( SDL.SDLModel.globalProperties.helpPrompt ){
                    var i = 0;

                    for( i = 0; i < SDL.SDLModel.globalProperties.helpPrompt.length; i++ ){
                        str += SDL.SDLModel.globalProperties.helpPrompt[i].text + ' ';
                    }
                }
                return str;
            }.property( 'SDL.SDLModel.globalProperties.helpPrompt.@each.text' )
        } ),

        gpTimeoutData: SDL.Label.extend( {

            elementId: 'sdlGPTData',

            classNames: 'sdlGPData',

            contentBinding: 'this.propertiesData',

            propertiesData: function() {
                var str = '';
                if( SDL.SDLModel.globalProperties.timeoutPrompt ){
                    var i = 0;
                    for( i = 0; i < SDL.SDLModel.globalProperties.timeoutPrompt.length; i++ ){
                        str += SDL.SDLModel.globalProperties.timeoutPrompt[i].text + ' ';
                    }
                }

                return str;
            }.property( 'SDL.SDLModel.globalProperties.timeoutPrompt.@each.text' )
        } )
    } ),

    driverDistractionControl: Em.ContainerView.extend( {
        elementId: 'driverDistractionControl',

        classNames: 'driverDistractionControl',

        childViews:
            [
                'driverDistractionLabel',
                'driverDistractionCheckBox'
            ],

        driverDistractionLabel: SDL.Label.extend( {

            elementId: 'driverDistractionControlLabel',

            classNames: 'driverDistractionControlLabel',

            content: 'Driver Distraction'
        } ),

        driverDistractionCheckBox: Em.Checkbox.extend( {

            elementId: 'driverDistractionControlCheckBox',

            classNames: 'driverDistractionControlCheckBox',

            checkedBinding: 'SDL.SDLModel.driverDistractionState'

        } )
    } ),

    protocolVersion: Em.ContainerView.extend( {
        elementId: 'protocolVersion',

        classNames: 'protocolVersion',

        childViews:
            [
                'protocolVersionLabel',
                'protocolVersionCheckBox'
            ],

        protocolVersionLabel: SDL.Label.extend( {

            elementId: 'protocolVersionLabel',

            classNames: 'protocolVersionLabel',

            content: 'Protocol version V2'
        } ),

        protocolVersionCheckBox: Em.Checkbox.extend( {

            elementId: 'protocolVersionCheckBox',

            classNames: 'protocolVersionCheckBox',

            checkedBinding: 'SDL.SDLModel.protocolVersion2State'

        } )
    } ),

    buttonControls: Em.ContainerView.extend( {
        elementId: 'buttonControls',

        classNames: 'buttonControls',

        childViews:
            [
                'ContainerControlls',
                'OneBtn',
                'TwoBtn',
                'ThreeBtn',
                'FourBtn',
                'FiveBtn',
                'SixBtn',
                'SevenBtn',
                'EightBtn',
                'NineBtn',
                'ZiroBtn'
            ],

        ContainerControlls: Em.ContainerView.extend( {
            elementId: 'ContainerControlls',

            classNames: 'ContainerControlls',

            childViews:
                [
                    'UpBtn',
                    'DownBtn',
                    'LeftBtn',
                    'RightBtn',
                    'OkBtn'
                ],

            /** Up button */
            UpBtn: SDL.Button.create( SDL.PresetEvents, {
                elementId: 'TUNEUP',
                classNames: 'UpBtn',
                time: 0,
                presetName: 'TUNEUP'
            } ),

            /** Down button */
            DownBtn: SDL.Button.create( SDL.PresetEvents, {
                elementId: 'TUNEDOWN',
                classNames: 'DownBtn',
                time: 0,
                presetName: 'TUNEDOWN'
            } ),

            /** Left button */
            LeftBtn: SDL.Button.create( SDL.PresetEvents, {
                elementId: 'SEEKLEFT',
                classNames: 'LeftBtn',
                time: 0,
                presetName: 'SEEKLEFT'
            } ),

            /** Right button */
            RightBtn: SDL.Button.create( SDL.PresetEvents, {
                elementId: 'SEEKRIGHT',
                classNames: 'RightBtn',
                time: 0,
                presetName: 'SEEKRIGHT'
            } ),

            /** Ok button */
            OkBtn: SDL.Button.create( SDL.PresetEvents, {
                elementId: 'OK',
                classNames: 'OkBtn',
                time: 0,
                presetName: 'OK'
            } )
        } ),

        /** One button */
        OneBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_1',
            classNames: 'OneBtn btnNotPressed',
            text: '1',
            time: 0,
            presetName: 'PRESET_1'
        } ),

        /** Two button */
        TwoBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_2',
            classNames: 'TwoBtn btnNotPressed',
            text: '2',
            time: 0,
            presetName: 'PRESET_2'
        } ),

        /** Three button */
        ThreeBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_3',
            classNames: 'ThreeBtn btnNotPressed',
            text: '3',
            time: 0,
            presetName: 'PRESET_3'
        } ),

        /** Four button */
        FourBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_4',
            classNames: 'FourBtn btnNotPressed',
            text: '4',
            time: 0,
            presetName: 'PRESET_4'
        } ),

        /** Five button */
        FiveBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_5',
            classNames: 'FiveBtn btnNotPressed',
            text: '5',
            time: 0,
            presetName: 'PRESET_5'
        } ),

        /** One button */
        SixBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_6',
            classNames: 'SixBtn btnNotPressed',
            text: '6',
            time: 0,
            presetName: 'PRESET_6'
        } ),

        /** One button */
        SevenBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_7',
            classNames: 'SevenBtn btnNotPressed',
            text: '7',
            time: 0,
            presetName: 'PRESET_7'
        } ),

        /** One button */
        EightBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_8',
            classNames: 'EightBtn btnNotPressed',
            text: '8',
            time: 0,
            presetName: 'PRESET_8'
        } ),

        /** One button */
        NineBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_9',
            classNames: 'NineBtn btnNotPressed',
            text: '9',
            time: 0,
            presetName: 'PRESET_9'
        } ),

        /** One button */
        ZiroBtn: SDL.Button.create( SDL.PresetEvents, {
            elementId: 'PRESET_0',
            classNames: 'ZiroBtn btnNotPressed',
            text: '0',
            time: 0,
            presetName: 'PRESET_0'
        } )
    } )
} );