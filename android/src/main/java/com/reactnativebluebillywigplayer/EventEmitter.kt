package com.reactnativebluebillywigplayer

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Event Emitter
 */
class EventEmitter(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    override fun getName(): String = "EventEmitter"

    fun sendEvent(eventName: String, params: ReadableMap) {
        val reactContext = reactApplicationContext
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}





