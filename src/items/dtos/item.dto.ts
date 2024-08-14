import { Expose, Transform } from "class-transformer";

export class ItemDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    @Expose()
    location: string;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number
}