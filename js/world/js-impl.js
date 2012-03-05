
(function() {
    "use strict";

    var WebWorld = 
        MACHINE.modules['whalesong/web-world.rkt'].privateExports;
    var EventSource = WebWorld.EventSource;
    var EventHandler = WebWorld.EventHandler;

    var makeClosure = plt.runtime.makeClosure;
    var finalizeClosureCall = plt.runtime.finalizeClosureCall;


    /**
     * Creates an event source coupled to a JavaScript function.  Calling the function
     * should cause the event source to fire.
     */
    var makeJsEventSource = function() {
        var enabled = false;
        var fireEvent;

        var JsEventSource = function() {};
        JsEventSource.prototype = plt.baselib.heir(EventSource.prototype);
        JsEventSource.prototype.onStart = function(_fireEvent) {
            enabled = true;
            fireEvent = _fireEvent;
        };
        JsEventSource.prototype.onStop = function() {
            enabled = false;
            fireEvent = void(0);
        };

        var sender = function() {
            if (enabled) {
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift(void(0));
                fireEvent.apply(null, args);
            }
        };
        return { eventSource: new JsEventSource(),
                 sender: sender };
    };


    var makeJsWorldEvent = makeClosure(
        'make-js-world-event',
        0,
        function(M) {
            finalizeClosureCall(M, "first value", "second value");
            
        });


    EXPORTS['make-js-world-event'] = makeJsWorldEvent;

}());