import Foundation
import UIKit

@objc(BlueBillywigPlayerViewManager)
class BlueBillywigPlayerViewManager: RCTViewManager {
  private var playerView: BlueBillywigPlayerView?
  private var controller: UIViewController = UIViewController()

  override func view() -> BlueBillywigPlayerView? {
    playerView = BlueBillywigPlayerView(uiViewController: controller)
    controller.view = playerView
    return playerView
  }

  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}