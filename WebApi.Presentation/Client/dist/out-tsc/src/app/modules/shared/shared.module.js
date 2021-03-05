import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../order/resources/pipes/status.pipe';
import { CategoryPipe } from '../product/resources/pipes/category.pipe';
import { SizePipe } from '../product/resources/pipes/size.pipe';
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [
            StatusPipe,
            SizePipe,
            CategoryPipe
        ],
        imports: [
            CommonModule,
        ],
        exports: [
            StatusPipe,
            SizePipe,
            CategoryPipe
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map