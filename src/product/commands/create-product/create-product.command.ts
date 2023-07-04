import { createProductDto } from "../../dto/create-product/create-product-request.dto";

export class CreateProductCommand {
    constructor(
        public readonly createProductDto: createProductDto
    ) {}
}