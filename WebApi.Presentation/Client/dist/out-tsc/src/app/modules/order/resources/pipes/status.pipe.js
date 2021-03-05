import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { Status } from '../models/status.enum';
let StatusPipe = class StatusPipe {
    transform(value, ...args) {
        switch (value) {
            case Status.None:
                return 'None';
            case Status.New:
                return 'New';
            case Status.Paid:
                return 'Paid';
            case Status.Shipped:
                return 'Shipped';
            case Status.Delivered:
                return 'Delivered';
            case Status.Closed:
                return 'Closed';
        }
    }
};
StatusPipe = __decorate([
    Pipe({
        name: 'status'
    })
], StatusPipe);
export { StatusPipe };
//# sourceMappingURL=status.pipe.js.map