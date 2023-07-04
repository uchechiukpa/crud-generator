import { Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number
}