package com.reactnativebluebillywigplayer


import android.util.Log
import android.widget.FrameLayout

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray

import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.ViewGroupManager

import com.bluebillywig.bbnativeplayersdk.BBNativePlayer
import com.bluebillywig.bbnativeplayersdk.BBNativePlayerView
import com.bluebillywig.bbnativeplayersdk.BBNativePlayerViewDelegate
import com.bluebillywig.bbnativeshared.enums.ApiProperty


class BlueBillywigPlayerViewManager(reactApplicationContext: ReactApplicationContext) : ViewGroupManager<BBNativePlayerView>(), BBNativePlayerViewDelegate {
  override fun getName(): String {
    return REACT_CLASS
  }

  override fun getCommandsMap() = mapOf(
    "play" to PLAY_COMMAND,
    "pause" to PAUSE_COMMAND,
    "mute" to MUTE_COMMAND,
    "unmute" to UNMUTE_COMMAND,
    "seek" to SEEK_COMMAND
    // "enterFullScreen" to ENTER_FULLSCREEN_COMMAND,
    // "exitFullScreen" to EXIT_FULLSCREEN_COMMAND
  )

  private var eventEmitter: EventEmitter = EventEmitter(reactApplicationContext)
  private var autoPlay: Boolean? = null
  private var src: String? = null

  override fun createViewInstance(context: ThemedReactContext) : BBNativePlayerView {
    // var myContext = context.currentActivity!!.applicationContext!!
    var view = BBNativePlayer.createPlayerView(context, this.src)
    view.delegate = this
    return view
  }

  @ReactProp(name = "src")
  fun setSrc(view: BBNativePlayerView, src: String) {
    this.src = src

    val options = if (this.autoPlay != null) {
      mapOf("autoPlay" to this.autoPlay)
    } else {
      mapOf()
    }

    view.setupWithJsonUrl(src, options)
  }

  @ReactProp(name = "autoPlay")
  fun setAutoPlay(view: BBNativePlayerView, autoPlay: Boolean) {
    this.autoPlay = autoPlay
  }

  override fun receiveCommand(
      root: BBNativePlayerView,
      commandId: Int,
      args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)

    when (commandId) {
      PLAY_COMMAND -> { play(root) }
      PAUSE_COMMAND ->  { pause(root) }
      MUTE_COMMAND -> { mute(root) }
      UNMUTE_COMMAND -> { unmute(root) }
      SEEK_COMMAND -> { seek(root, requireNotNull(args).getInt(0)) }
      // ENTER_FULLSCREEN_COMMAND -> { enterFullScreen(root) }
      // EXIT_FULLSCREEN_COMMAND -> { exitFullScreen(root) }
    }
  }

  fun play(view: BBNativePlayerView) {
    view.player?.play()
  }

  fun pause(view: BBNativePlayerView) {
    view.player?.pause()
  }

  fun mute(view: BBNativePlayerView) {
    view.player?.muted = true
  }

  fun unmute(view: BBNativePlayerView) {
    view.player?.muted = false
  }

  // Doesn't work in 7.99.1
  // Upgrade to latest version of Blue Billywig Native SDK
  // fun enterFullScreen(view: BBNativePlayerView) {
    // view.player?.enterFullScreen()
  // }

  // Doesn't work in 7.99.1
  // Upgrade to latest version of Blue Billywig Native SDK
  // fun exitFullScreen(view: BBNativePlayerView) {
    // view.player?.exitFullScreen()
  // }

  fun seek(view: BBNativePlayerView, offsetInSeconds: Int) {
    view.player?.seek(offsetInSeconds)
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

  companion object {
    private const val REACT_CLASS = "BlueBillywigPlayerView"

    private const val PLAY_COMMAND = 1
    private const val PAUSE_COMMAND = 2
    private const val MUTE_COMMAND = 3
    private const val UNMUTE_COMMAND = 4
    private const val SEEK_COMMAND = 5
    // private const val ENTER_FULLSCREEN_COMMAND = 6
    // private const val EXIT_FULLSCREEN_COMMAND = 7
  }
}
