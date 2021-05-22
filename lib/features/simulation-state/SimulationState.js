import {
  SCOPE_DESTROYED_EVENT
} from '../../util/EventHelper';


export default function SimulationState(
    eventBus,
    simulator,
    elementNotifications) {

  eventBus.on(SCOPE_DESTROYED_EVENT, event => {
    const {
      scope
    } = event;

    const {
      destroyContext,
      element: scopeElement
    } = scope;

    const {
      initiator,
      reason
    } = destroyContext;

    const initiatingElement = initiator && initiator.element;

    if (reason !== 'complete' || !initiatingElement) {
      return;
    }

    const processScopes = [
      'bpmn:Process',
      'bpmn:Participant'
    ];

    if (!processScopes.includes(scopeElement.type)) {
      return;
    }

    elementNotifications.addElementNotification(initiatingElement, {
      type: 'success',
      icon: 'fa-check-circle',
      text: 'Finished',
      scope
    });
  });
}

SimulationState.$inject = [
  'eventBus',
  'simulator',
  'elementNotifications'
];