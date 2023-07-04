import { ApiProperty } from '@nestjs/swagger';

export class UpdatedProductReponseObject {
  @ApiProperty({
    description: 'the status of the request',
    example: 'Success',
  })
  public readonly status: string;
  @ApiProperty({
    description: 'the message of the request',
    example: 'product update successfully',
  })
  public readonly message: string;
  @ApiProperty({
    description: 'the responseCode of the request',
    example: 201,
  })
  public readonly responseCode: number;

  constructor(response: productResponse ) {
    this.status = response.status;
    this.message = response.message;
    this.responseCode = response.responseCode;

  }

}
interface productResponse {
  status: string;
  responseCode: number;
  message: string;
}