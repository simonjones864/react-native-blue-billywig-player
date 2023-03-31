#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(EventEmitter, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

@end

@interface RCT_EXTERN_MODULE(BlueBillywigPlayerViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(src, NSString)
RCT_EXPORT_VIEW_PROPERTY(autoPlay, BOOL)
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);

RCT_EXTERN_METHOD(play:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(pause:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(mute:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(unmute:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(seek:(nonnull NSNumber *)node offsetInSeconds:(nonnull NSNumber *)offset)
// RCT_EXTERN_METHOD(enterFullscreen:(nonnull NSNumber *)node)
// RCT_EXTERN_METHOD(exitFullscreen:(nonnull NSNumber *)node)


@end
