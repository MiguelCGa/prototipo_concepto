import { CollageStateMachine, COLLAGE_STATE } from './collage_state_machine.js'; 



export default class CollageStateController {

    constructor(state_machine) {
        this.state_machine = state_machine;
    }

    init() {
        this.state_machine.init(COLLAGE_STATE.COMM_SELECT);
    }

    select_commision(commision) {
        if (this.state_machine.state !== COLLAGE_STATE.COMM_SELECT)
            return;
        
        this.state_machine.go_to(COLLAGE_STATE.ASSETS_SELECT, {
            selected_comm: commision
        });
    }


    start_commision(commision, background, sheet, sheet_info) {
        if (this.state_machine.state !== COLLAGE_STATE.ASSETS_SELECT)
            return;
        
        this.state_machine.go_to(COLLAGE_STATE.CANVAS, {
            selected_comm: commision,
            selected_bg: background,
            selected_sheet: sheet,
            sheet_info: sheet_info
        });
    }

    send_commision(commision, canvas) {
        if (this.state_machine.state !== COLLAGE_STATE.CANVAS)
            return;
        
        this.state_machine.go_to(COLLAGE_STATE.FEEDBACK, {
            commision: commision,
            painting: canvas,
        });
    }

    end_commision() {
        if (this.state_machine.state !== COLLAGE_STATE.FEEDBACK)
            return;
        
        this.state_machine.go_to(COLLAGE_STATE.COMM_SELECT, { });
    }
}
