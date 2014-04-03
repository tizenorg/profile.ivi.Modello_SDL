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
 * @name SDL.SDLVehicleInfoModel
 * @desc SDL model with vehicle information used instead of CAN network.
 *       VehicleInfoModel is simulation of real CAN network.
 * @category Model
 * @filesource app/model/sdl/SDLVehicleInfoModel.js
 * @version 1.0
 */

SDL.SDLVehicleInfoModel = Em.Object.create( {

    /**
     * Stored VehicleInfo transmission state Data
     *
     * @type {Array}
     */
    vehicleInfoPRNDL:
        [
            "PARK",
            "REVERSE",
            "NEUTRAL",
            "FORWARD_DRIVE_2",
            "LOWGEAR"
        ],

    /**
     * PRNDL state value
     *
     * @type {String}
     */
    prndlSelectState: 'PARK',

    /**
     * Stored VehicleInfo Data
     *
     * @type {Array}
     */
    ecuDIDData:
        [
            {
                'data': "ECU 1 Test Data"
            },
            {
                'data': "ECU 2 Test Data"
            }
        ],

    /**
     * Type of current vehicle: make of the vehicle, model of the vehicle, model
     * Year of the vehicle, trim of the vehicle.
     *
     * @type {Object}
     */
    vehicleType: {
        make: "Ford",
        model: "Fiesta",
        modelYear: "2013",
        trim: "SE"
    },

    /**
     * Stored VehicleInfo Data
     *
     * @type {Object}
     */
    vehicleData: {
        'VEHICLEDATA_SPEED': {
            data: 80.0,
            type: 'speed'
        },
        'VEHICLEDATA_ENGINERPM': {
            data: 5000,
            type: 'rpm'
        },
        'VEHICLEDATA_FUELLEVEL': {
            data: 0.2,
            type: 'fuelLevel'
        },
        'VEHICLEDATA_FUELECONOMY': {
            data: 0.1,
            type: 'avgFuelEconomy'
        },
        'VEHICLEDATA_BATTVOLTS': {
            data: 12.5,
            type: 'batteryVoltage'
        },
        'VEHICLEDATA_EXTERNTEMP': {
            data: 40.0,
            type: 'externalTemperature'
        },
        'VEHICLEDATA_VIN': {
            data: '52-452-52-752',
            type: 'vin'
        },
        'VEHICLEDATA_PRNDLSTATUS': {
            data: 'PARK',
            type: 'prndl'
        },
        'VEHICLEDATA_BATTERYPACKVOLTAGE': {
            data: 12.5,
            type: 'batteryPackVoltage'
        },
        'VEHICLEDATA_BATTERYCURRENT': {
            data: 7.0,
            type: 'batteryPackCurrent'
        },
        'VEHICLEDATA_BATTERYTEMPERATURE': {
            data: 30,
            type: 'batteryPackTemperature'
        },
        'VEHICLEDATA_ENGINETORQUE': {
            data: 650,
            type: 'engineTorque'
        },
        'VEHICLEDATA_ODOMETER': {
            data: 0,
            type: 'odometer'
        },
        'VEHICLEDATA_TRIPODOMETER': {
            data: 0,
            type: 'tripOdometer'
        },
        'VEHICLEDATA_GENERICBINARY': {
            data: '165165650',
            type: 'genericbinary'
        },
        'VEHICLEDATA_SATESN': {
            data: "165165650",
            type: 'satRadioESN'
        },
        'VEHICLEDATA_RAINSENSOR': {
            data: 165165650,
            type: 'rainSensor'
        },
        'VEHICLEDATA_GPS': {
            data: {
                'longitudeDegrees': 423293,
                'latitudeDegrees': -830464,
                'utcYear': 2013,
                'utcMonth': 2,
                'utcDay': 14,
                'utcHours': 13,
                'utcMinutes': 16,
                'utcSeconds': 54,
                'compassDirection': 'SOUTHWEST',
                'pdop': 15,
                'hdop': 5,
                'vdop': 30,
                'actual': false,
                'satellites': 8,
                'dimension': '2D',
                'altitude': 7,
                'heading': 173,
                'speed': 2
            },
            type: 'gps'
        }
    },

    /**
     * Method to set selected state of vehicle transmission to vehicleData
     */
    onPRNDLSelected: function() {
        if( this.prndlSelectState ) {
            this.set( 'vehicleData.VEHICLEDATA_PRNDLSTATUS.data', this.prndlSelectState );
        }
    }.observes( 'this.prndlSelectState' ),

    /**
     * Method calls GetVehicleType response
     *
     * @type {Number}
     */
    getVehicleType: function( id ) {
        FFW.VehicleInfo.GetVehicleTypeResponse( this.vehicleType, id );
    },

    /**
     * SDL VehicleInfo.GetDTCs handler fill data for response about vehicle
     * errors
     *
     * @type {Object} params
     * @type {Number} id
     */
    vehicleInfoGetDTCs: function( params, id ) {
        var data = [], i = 0, info = "Inormation about reported DTC's", result = "";

        for( i = 0; i < 3; i++ ){
            data.push( params.encrypted ? "0" : {
                "identifier": '0',
                "statusByte": '0'
            } );
        }

        result = "SUCCESS";

        if( params.encrypted ){
            result = 'ENCRYPTED';
            FFW.BasicCommunication.SendData( data );
            FFW.VehicleInfo.vehicleInfoGetDTCsResponse( null, info, result, id );
        }else{
            FFW.VehicleInfo.vehicleInfoGetDTCsResponse( data, info, result, id );
        }
    },

    /**
     * SDL VehicleInfo.ReadDID handler send response about vehicle conditions
     *
     * @type {Object} params
     * @type {Number} id
     */
    vehicleInfoReadDID: function( params, id ) {
        var data = [], i = 0, info = '', dataResult = [], resultCode = "";
        // magic number used because there is no huge database on HMI of vehicle
        // data
        if( this.ecuDIDData[1].data ){
            info = this.ecuDIDData[1].data;
            result = "SUCCESS";
        }else{
            result = "INVALID_DATA";
        }

        for( i = 0; i < params.didLocation.length; i++ ){
            if( i < 10 ){
                dataResult[i] = 'SUCCESS';
                data.push( '0' );
            }else{
                dataResult[i] = "INVALID_DATA";
                data.push( '0' );
            }
        }

        if( params.encrypted ){
            result = 'ENCRYPTED';
            FFW.BasicCommunication.SendData( data );
            FFW.VehicleInfo.vehicleInfoReadDIDResponse( null, null, info, result, id );
        }else{
            FFW.VehicleInfo.vehicleInfoReadDIDResponse( dataResult, data, info, result, id );
        }
    },

    /**
     * Function returns response message to VehicleInfoRPC
     *
     * @type {Object} message
     */
    getVehicleData: function( message ) {

        return this.vehicleData[message.dataType].data;

    },

    /**
     * Function send all vehicle conditions on FFW.VehicleInfo.OnVehicleData fo
     * notification when data changes
     */
    onVehicleDataChanged: function() {

        var jsonData = {};
        for( var i in this.vehicleData ){
            jsonData[this.vehicleData[i].type] = this.vehicleData[i].data;
        }
        FFW.VehicleInfo.OnVehicleData( jsonData );

    }.observes( 'this.vehicleData.VEHICLEDATA_PRNDLSTATUS.data' )
} );
