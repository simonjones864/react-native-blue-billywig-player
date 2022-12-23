package com.reactnativebluebillywigplayer

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.bluebillywig.bbnativeplayersdk.BBNativePlayer
import com.bluebillywig.bbnativeplayersdk.BBNativePlayerView
import com.bluebillywig.bbnativeplayersdk.BBNativePlayerViewDelegate
import com.bluebillywig.bbnativeshared.enums.ApiProperty

class BlueBillywigPlayerViewManager(reactApplicationContext: ReactApplicationContext) : SimpleViewManager<BBNativePlayerView>(), BBNativePlayerViewDelegate {

  override fun getName() = "BlueBillywigPlayerView"

  private var eventEmitter: EventEmitter = EventEmitter(reactApplicationContext)
  private var src: String? = null

  override fun createViewInstance(context: ThemedReactContext) : BBNativePlayerView {
    var view = BBNativePlayer.createPlayerView(context, this.src)
    view.delegate = this
    return view
  }

  @ReactProp(name = "src")
  fun setSrc(view: BBNativePlayerView, src: String) {
    this.src = src
    var options: Map<String, Any?> = mapOf()
    view.setupWithJsonUrl(src, options)
  }

  override fun didTriggerPlaying(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerPlaying", Arguments.createMap())
  }

  override fun didTriggerPlay(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerPlay", Arguments.createMap())
  }

  override fun didTriggerPause(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerPause", Arguments.createMap())
  }

  override fun didTriggerEnded(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerEnded", Arguments.createMap())
  }

  override fun didTriggerSeeking(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerSeeking", Arguments.createMap())
  }

  // override fun didTriggerSeeked(view: BBNativePlayerView) {
  //   eventEmitter.sendEvent("didTriggerSeeked", Arguments.createMap())
  // }

  override fun didTriggerAdLoaded(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerAdLoaded", Arguments.createMap())
  }

  override fun didTriggerAdStarted(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerAdStarted", Arguments.createMap())
  }

  override fun didTriggerAdFinished(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerAdFinished", Arguments.createMap())
  }

  override fun didTriggerAllAdsCompleted(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didTriggerAllAdsCompleted", Arguments.createMap())
  }

  override fun didRequestCollapse(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didRequestCollapse", Arguments.createMap())
  }

  override fun didRequestExpand(view: BBNativePlayerView) {
    eventEmitter.sendEvent("didRequestExpand", Arguments.createMap())
  }
}
