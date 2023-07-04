import { ApiProperty } from "@nestjs/swagger";

export class GetProductsReponseDto {
  @ApiProperty({
    description: "the status of the request",
    example: "Success",
  })
  public readonly status: string;
  @ApiProperty({
    description: "the message of the request",
    example: "products retrived successfully",
  })
  public readonly message: string;
  @ApiProperty({
    description: "the responseCode of the request",
    example: 200,
  })
  public readonly responseCode: number;

  @ApiProperty({
    description: "the responseData of the request",
    example: [
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
  })
  public readonly data: Array<responseData>;

  constructor(response: productResponse) {
    this.status = response.status;
    this.message = response.message;
    this.responseCode = response.responseCode;
    this.data = response.data;
  }
}
interface productResponse {
  status: string;
  responseCode: number;
  message: string;
  data: Array<responseData>;
}
interface responseData {
  id: number;
}
