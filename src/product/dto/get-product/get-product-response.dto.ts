import { ApiProperty } from '@nestjs/swagger';

export class GetProductReponseDto {
  @ApiProperty({
    description: 'the status of the request',
    example: 'Success',
  })
  public readonly status: string;
  @ApiProperty({
    description: 'the message of the request',
    example: 'product retrived successfully',
  })
  public readonly message: string;
  @ApiProperty({
    description: 'the responseCode of the request',
    example: 200,
  })
  public readonly responseCode: number;

  @ApiProperty({
    description: 'the responseData of the request',
    example: {
      id: 2
    },
  })
  public readonly data: responseData;

  constructor(response: productResponse ) {
    this.status = response.status;
    this.message = response.message;
    this.responseCode = response.responseCode;
    this.data = response.data

  }

}
interface function toLowerCase() { [native code] }Response {
  status: string;
  responseCode: number;
  message: string;
  data: responseData
}
interface responseData {
  id: number;
}