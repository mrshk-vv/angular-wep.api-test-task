import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { Category } from '../models/product-category.enum';
let CategoryPipe = class CategoryPipe {
    transform(value, ...args) {
        switch (value) {
            case Category.None:
                return 'None';
            case Category.Foods:
                return 'Foods';
            case Category.Drinks:
                return 'Drinks';
            case Category.Dessert:
                return 'Desserts';
            case Category.Vegetables:
                return 'Vegatables';
        }
    }
};
CategoryPipe = __decorate([
    Pipe({
        name: 'category'
    })
], CategoryPipe);
export { CategoryPipe };
//# sourceMappingURL=category.pipe.js.map