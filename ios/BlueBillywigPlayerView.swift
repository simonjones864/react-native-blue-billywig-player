import BBNativePlayerKit
import bbnativeshared

@objc(BlueBillywigPlayerView)
class BlueBillywigPlayerView : UIView, BBNativePlayerViewDelegate {
  private var autoPlay: Bool? = nil
  private var src: String = ""

  private var controller: UIViewController? = nil
  private var view: BBNativePlayerView? = nil

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  init(uiViewController: UIViewController) {
    super.init(frame: CGRect())
    self.controller = uiViewController
  }

  @objc(setAutoPlay:)
  func setAutoPlay(autoPlay: Bool) {
    self.autoPlay = autoPlay
  }

  @objc(setSrc:)
  func setSrc(src: String) {
    self.src = src
    self.view = BBNativePlayer.createPlayerView(
      uiViewController: self.controller!,
      frame: self.frame,
      jsonUrl: self.src,
      options: ["autoPlay": self.autoPlay]
    )

    self.addSubview(self.view!)
    self.view?.translatesAutoresizingMaskIntoConstraints = false
    self.view?.leftAnchor.constraint(equalTo: self.safeAreaLayoutGuide.leftAnchor).isActive = true
    self.view?.topAnchor.constraint(equalTo: self.safeAreaLayoutGuide.topAnchor, constant: 0 ).isActive = true
    self.view?.widthAnchor.constraint(equalTo: self.safeAreaLayoutGuide.widthAnchor).isActive = true
    self.view?.heightAnchor.constraint(equalTo: self.safeAreaLayoutGuide.heightAnchor).isActive = true
    self.view?.delegate = self
  }

  // func play() {
  //   self.view!.player.play()
  // }

  // func pause() {
  //   self.view!.player.pause()
  // }

  // func mute() {
  //   self.view!.player.muted = true
  // }

  // func unmute() {
  //   self.view!.player.muted = false
  // }

  func bbNativePlayerView(didTriggerPlaying view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerPlaying", body: [])
  }

  func bbNativePlayerView(didTriggerPlay view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerPlay", body: [])
  }

  func bbNativePlayerView(didTriggerPause view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerPause", body: [])
  }

  func bbNativePlayerView(didTriggerEnded view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerEnded", body: [])
  }

  func bbNativePlayerView(didTriggerSeeking view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerSeeking", body: [])
  }

  func bbNativePlayerView(didTriggerAdLoaded view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAdLoaded", body: [])
  }

  func bbNativePlayerView(didTriggerAdStarted view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAdStarted", body: [])
  }

  func bbNativePlayerView(didTriggerAdFinished view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAdFinished", body: [])
  }

  func bbNativePlayerView(didTriggerAllAdsCompleted view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didTriggerAllAdsCompleted", body: [])
  }

  func bbNativePlayerView(didRequestCollapse view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didRequestCollapse", body: [])
  }

  func bbNativePlayerView(didRequestExpand view: BBNativePlayerView) {
    EventEmitter.emitter.sendEvent(withName: "didRequestExpand", body: [])
  }

  func destroy() {
    self.view?.destroy()
    self.view = nil
  }
}
