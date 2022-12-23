package com.reactnativebluebillywigplayer
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager


class BlueBillywigPlayerPackage : ReactPackage {

    // override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    //     return listOf()
    // }

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(EventEmitter(reactContext)).toMutableList()

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> = listOf(BlueBillywigPlayerViewManager(reactContext))

}
