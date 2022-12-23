import UIKit
import BBNativePlayerKit
import bbnativeshared

@objc(BlueBillywigPlayerViewManager)
class BlueBillywigPlayerViewManager: RCTViewManager {
  private var controller: UIViewController = UIViewController()

  override func view() -> (UIView) {
    controller.view = BlueBillywigPlayerView(uiViewController: controller)
    return controller.view
  }

  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}

class BlueBillywigPlayerView : UIView, BBNativePlayerViewDelegate {
  private var src: String = ""
  private var controller: UIViewController? = nil
  private var player: BBNativePlayerView? = nil

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  init(uiViewController: UIViewController) {
    super.init(frame: CGRect())
    self.controller = uiViewController
  }

  @objc(setSrc:)
  func setSrc(src: String) {
    self.src = src
    self.player = BBNativePlayer.createPlayerView(
      uiViewController: self.controller!,
      frame: self.frame,
      jsonUrl: self.src
    )

    self.addSubview(self.player!)
    self.player?.translatesAutoresizingMaskIntoConstraints = false
    self.player?.leftAnchor.constraint(equalTo: self.safeAreaLayoutGuide.leftAnchor).isActive = true
    self.player?.topAnchor.constraint(equalTo: self.safeAreaLayoutGuide.topAnchor, constant: 0 ).isActive = true
    self.player?.widthAnchor.constraint(equalTo: self.safeAreaLayoutGuide.widthAnchor).isActive = true
    self.player?.heightAnchor.constraint(equalTo: self.safeAreaLayoutGuide.heightAnchor).isActive = true
    self.player?.delegate = self
  }

  func bbNativePlayerView(didTriggerPlaying playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerPlaying", body: [])
  }

  func bbNativePlayerView(didTriggerPlay playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerPlay", body: [])
  }

  func bbNativePlayerView(didTriggerPause playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerPause", body: [])
  }

  func bbNativePlayerView(didTriggerEnded playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerEnded", body: [])
  }

  func bbNativePlayerView(didTriggerSeeking playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerSeeking", body: [])
  }

  func bbNativePlayerView(didTriggerSeeked playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerSeeked", body: [])
  }

  func bbNativePlayerView(didTriggerAdLoaded playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAdLoaded", body: [])
  }

  func bbNativePlayerView(didTriggerAdStarted playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAdStarted", body: [])
  }

  func bbNativePlayerView(didTriggerAdFinished playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAdFinished", body: [])
  }

  func bbNativePlayerView(didTriggerAllAdsCompleted playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAllAdsCompleted", body: [])
  }

  func bbNativePlayerView(didRequestCollapse playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didRequestCollapse", body: [])
  }

  func bbNativePlayerView(didRequestExpand playerView: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didRequestExpand", body: [])
  }

  func destroy() {
    self.player?.destroy()
    self.player = nil
  }
}

@objc(EventEmitter)
open class EventEmitter: RCTEventEmitter {
  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    EventEmitter.emitter = self
  }

  open override func supportedEvents() -> [String] {
    [
      "didTriggerPlay",
      "didTriggerPause",
      "didTriggerSeeking",
      "didTriggerSeeked",
      "didTriggerPlaying",
      "didTriggerEnded",
      "didTriggerAdLoaded",
      "didTriggerAdStarted",
      "didTriggerAdFinished",
      "didTriggerAllAdsCompleted",
      "didRequestCollapse",
      "didRequestExpand",
    ]
  }

  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}