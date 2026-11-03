/**
 * Selección encargos
 * Selección recursos
 * Lienzo
 * Feedback
 */

export const COLLAGE_STATE = {
    COMM_SELECT: 0,
    ASSETS_SELECT: 1,
    CANVAS: 2,
    FEEDBACK: 3
}

export class CollageStateMachine {
    constructor(enter_comm_select, enter_assets_select, enter_canvas, enter_feedback,
                exit_comm_select, exit_assets_select, exit_canvas, exit_feedback) {

        this.state = -1;

        this.params = [
            /* comm_select_params */ {
                
            },
            /* assets_select_params */ {
                selected_comm: undefined
            },
            /* canvas_params */ {
                selected_comm: undefined,
                selected_bg: undefined,
                selected_sheet: undefined
            },
            /* feedback_params */ {
                selected_comm: undefined,
                delivery: undefined
            }
        ]

        this.on_enter = [enter_comm_select, enter_assets_select, enter_canvas, enter_feedback];
        this.on_exit = [exit_comm_select, exit_assets_select, exit_canvas, exit_feedback];

    }

    init(state, params) {
        this.state = state;
        this.on_enter[state](params);
    }

    go_to(state, params) {
        this.on_exit[this.state]();
        this.state = state;
        this.params[state] = params;
        this.on_enter[state](this.params[state]);
    }
}