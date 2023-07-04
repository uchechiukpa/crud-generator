import { UpdateProductDTO } from "../../dto/update-product/update-product-request.dto";

export class UpdateProductCommand {
    constructor(
        public readonly id: number,
        public readonly updateProductDto: Partial<UpdateProductDTO>
    ) {}
}