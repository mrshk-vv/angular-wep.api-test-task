import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { Size } from '../models/product-size.enum';
let SizePipe = class SizePipe {
    transform(value, ...args) {
        switch (value) {
            case Size.None:
                return 'None';
            case Size.Small:
                return 'Small';
            case Size.Medium:
                return 'Medium';
            case Size.Large:
                return 'Large';
        }
    }
};
SizePipe = __decorate([
    Pipe({
        name: 'size'
    })
], SizePipe);
export { SizePipe };
//# sourceMappingURL=size.pipe.js.map