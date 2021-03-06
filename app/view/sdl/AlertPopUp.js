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
 * @name SDL.AlertPopUp
 * @desc AlertPopUp module visual representation
 * @category View
 * @filesource app/view/sdl/AlertPopUp.js
 * @version 1.0
 */

SDL.AlertPopUp = Em.ContainerView.create( {

    elementId: 'AlertPopUp',

    classNames: 'AlertPopUp',

    classNameBindings:
        [
            'active:AlertActive'
        ],

    childViews:
        [
            'applicationName',
            'image',
            'message1',
            'message2',
            'message3',
            'softbuttons'
        ],

    /**
     * Id of current request
     *
     * @type {Number}
     */
    alertRequestId: null,

    content1: 'Title',

    content2: 'Text',

    active: false,

    timer: null,

    /**
     * Wagning image on Alert PopUp
     */
    image: Em.View.extend( {
        elementId: 'alertPopUpImage',

        classNames: 'alertPopUpImage'
    } ),

    applicationName: SDL.Label.extend( {

        elementId: 'applicationName',

        classNames: 'applicationName',

        contentBinding: 'parentView.appName'
    } ),

    message1: SDL.Label.extend( {

        elementId: 'message1',

        classNames: 'message1',

        contentBinding: 'parentView.content1'
    } ),

    message2: SDL.Label.extend( {

        elementId: 'message2',

        classNames: 'message2',

        contentBinding: 'parentView.content2'
    } ),

    message3: SDL.Label.extend( {

        elementId: 'message3',

        classNames: 'message3',

        contentBinding: 'parentView.content3'
    } ),

    /**
     * Deactivate PopUp
     */
    deactivate: function( ABORTED ) {
        this.set( 'active', false );
        clearTimeout( this.timer );

        SDL.SDLController.alertResponse( ABORTED ? 'ABORTED' : 'SUCCESS', this.alertRequestId );

        SDL.SDLController.onSystemContextChange();
    },

    /**
     * Container for softbuttons
     */
    softbuttons: Em.ContainerView.extend( {

        childViews:
            [
                'buttons'
            ],

        buttons: Em.ContainerView.extend( {
            elementId: 'alertSoftButtons',

            classNames: 'alertSoftButtons'
        } )
    } ),

    /**
     * @desc Function creates Soft Buttons on AlertPoUp
     * @param {Object} params
     */
    addSoftButtons: function( params, appId ) {

        var count = this.get( 'softbuttons.buttons.childViews' ).length - 1;
        for( var i = count; i >= 0; i-- ){
            this.get( 'softbuttons.buttons.childViews' ).removeObject( this.get( 'softbuttons.buttons.childViews' )[0] );
        }

        if( params ){

            var softButtonsClass;
            switch( params.length ){
                case 1:
                    softButtonsClass = 'one';
                    break;
                case 2:
                    softButtonsClass = 'two';
                    break;
                case 3:
                    softButtonsClass = 'three';
                    break;
                case 4:
                    softButtonsClass = 'four';
                    break;
            }

            for( var i = 0; i < params.length; i++ ){
                this.get( 'softbuttons.buttons.childViews' ).pushObject( SDL.Button.create( SDL.PresetEventsCustom, {
                    systemAction: params[i].systemAction,
                    groupName: "AlertPopUp",
                    softButtonID: params[i].softButtonID,
                    icon: params[i].image,
                    text: params[i].text,
                    classNames: 'list-item softButton ' + softButtonsClass,
                    elementId: 'softButton' + i,
                    templateName: params[i].image ? 'rightIcon' : 'text',
                    appId: appId
                } ) );
            }
        }
    },

    AlertActive: function( message, alertRequestId ) {
        var self = this;

        // play audio alert
        if( message.playTone ){
            SDL.Audio.play( 'audio/alert.wav' );
        }

        this.set( 'alertRequestId', alertRequestId );

        this.addSoftButtons( message.softButtons, message.appId );

        this.set( 'appName', SDL.SDLController.getApplicationModel( message.appId ).appName );

        this.set( 'content1', message.AlertText1 );
        this.set( 'content2', message.AlertText2 );
        this.set( 'content3', message.AlertText3 );
        this.set( 'active', true );
        SDL.SDLController.onSystemContextChange();

        clearTimeout( this.timer );
        this.timer = setTimeout( function() {
            self.deactivate();
        }, message.duration );

        if( message.ttsChunks ){
            SDL.SDLModel.onPrompt( message.ttsChunks, message.duration - 100 );
        }
    }
} );