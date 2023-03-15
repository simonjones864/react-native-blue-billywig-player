import Foundation
import UIKit

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
