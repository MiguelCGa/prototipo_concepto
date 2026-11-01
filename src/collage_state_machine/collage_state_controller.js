import { CollageStateMachine, COLLAGE_STATE } from './collage_state_machine.js'; 



export default class CollageStateController {

    constructor(state_machine, init_state) {
        this.state_machine = state_machine;
    }

    init() {
        this.state_machine.init(COLLAGE_STATE.COMM_SELECT);
    }

    select_commision(commision) {
        if (this.state_machine.state !== COLLAGE_STATE.COMM_SELECT)
            return;
        
        this.state_machine._go_to(COLLAGE_STATE.ASSETS_SELECT, {
            selected_comm: commision
        });
    }

}