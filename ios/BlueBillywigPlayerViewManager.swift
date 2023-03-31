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

  @objc func play(_ node: NSNumber) {
    DispatchQueue.main.async {
        let playerView = self.bridge.uiManager.view(
            forReactTag: node
        ) as! BlueBillywigPlayerView
        playerView.play()
    }
  }

  @objc func pause(_ node: NSNumber) {
    DispatchQueue.main.async {
        let playerView = self.bridge.uiManager.view(
            forReactTag: node
        ) as! BlueBillywigPlayerView
        playerView.pause()
    }
  }

  @objc func mute(_ node: NSNumber) {
    DispatchQueue.main.async {
        let playerView = self.bridge.uiManager.view(
            forReactTag: node
        ) as! BlueBillywigPlayerView
        playerView.mute()
    }
  }

  @objc func unmute(_ node: NSNumber) {
    DispatchQueue.main.async {
        let playerView = self.bridge.uiManager.view(
            forReactTag: node
        ) as! BlueBillywigPlayerView
        playerView.unmute()
    }
  }

  @objc func seek(_ node: NSNumber, offsetInSeconds: NSNumber) {
    DispatchQueue.main.async {
        let playerView = self.bridge.uiManager.view(
            forReactTag: node
        ) as! BlueBillywigPlayerView
        playerView.seek(offsetInSeconds: offsetInSeconds)
    }
  }

  // @objc func enterFullscreen(_ node: NSNumber) {
  //   DispatchQueue.main.async {
  //       let playerView = self.bridge.uiManager.view(
  //           forReactTag: node
  //       ) as! BlueBillywigPlayerView
  //       playerView.enterFullscreen()
  //   }
  // }

  // @objc func exitFullscreen(_ node: NSNumber) {
  //   DispatchQueue.main.async {
  //       let playerView = self.bridge.uiManager.view(
  //           forReactTag: node
  //       ) as! BlueBillywigPlayerView
  //       playerView.exitFullscreen()
  //   }
  // }
}

