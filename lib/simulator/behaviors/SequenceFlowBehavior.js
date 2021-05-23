export default function SequenceFlowBehavior(
    simulator,
    scopeBehavior) {

  this._simulator = simulator;
  this._scopeBehavior = scopeBehavior;

  simulator.registerBehavior('bpmn:SequenceFlow', this);
}

SequenceFlowBehavior.prototype.enter = function(context) {
  const {
    scope
  } = context;

  this._simulator.exit({
    ...context,
    initiator: scope
  });
};

SequenceFlowBehavior.prototype.exit = function(context) {
  const {
    element,
    scope
  } = context;

  this._simulator.enter({
    element: element.target,
    scope: scope.parent,
    initiator: scope
  });
};

SequenceFlowBehavior.$inject = [
  'simulator',
  'scopeBehavior'
];