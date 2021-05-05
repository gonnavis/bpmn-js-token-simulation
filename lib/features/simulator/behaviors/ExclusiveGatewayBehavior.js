export default function ExclusiveGatewayBehavior(simulator) {
  this._simulator = simulator;

  simulator.registerBehavior('bpmn:ExclusiveGateway', this);
}

ExclusiveGatewayBehavior.prototype.enter = function(context) {
  this._simulator.exit(context);
};

ExclusiveGatewayBehavior.prototype.exit = function(context) {

  const {
    element,
    scope
  } = context;

  // depends on UI to properly configure activeOutgoing for
  // each exclusive gateway

  const outgoings = element.outgoing;

  if (outgoings.length === 1) {
    return this._simulator.enter({
      element: outgoings[0],
      scope
    });
  }

  const config = this._simulator.getConfig(element);

  const activeOutgoing = config && config.activeOutgoing;

  const outgoing = outgoings.find(o => o === activeOutgoing);

  if (!outgoing) {
    throw new Error('no outgoing configured');
  }

  return this._simulator.enter({
    element: outgoing,
    scope
  });
};

ExclusiveGatewayBehavior.$inject = [ 'simulator' ];