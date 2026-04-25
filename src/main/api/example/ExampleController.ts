import { BaseController, Request } from 'cuakx-express-core/api';
import express from 'express';
import { BaseResponse } from 'cuakx-express-core/facade/response.util';
import ExampleValidation from './validation/ExampleValidation';
import AdditionParamsRequestValidation from "./validation/AdditionParamsRequestValidation";
import ExampleAgeInputRequestValidation from "./validation/ExampleAgeInputRequestValidation";
import ExampleMultipartUploadValidation from './validation/ExampleMultipartUploadValidation';
import {ExampleControllerHandler} from "./ExampleControllerHandler";
import { ExampleRequestDTO } from './dto/request/ExampleRequestDTO';
import { ExampleMultipartUploadRequestDTO } from './dto/request/ExampleMultipartUploadRequestDTO';
// import {DB} from 'cuakx-express-core/config';


// import { MessagingProducer } from '../../messaging/pusher/MessagingPusher';

class ExampleController extends BaseController {

  public routes = (): express.Router => {

    /**
     * @method GET
     * exampleValidatedRest
     *
     * This API will return every request that sent to body, with constraint of validation provided.
     * @see ExampleValidation
     */
    this.get<ExampleRequestDTO>("/example", (dto: Request<ExampleRequestDTO>): BaseResponse<ExampleRequestDTO> => {
      console.log("Kinthil")
      return BaseResponse.ok(dto.body, "Success")
    });

    /**
     * @method POST
     * exampleValidatedRest
     *
     * This API will return every request that sent to body, with constraint of validation provided.
     * @see ExampleValidation
     */
    this.post<ExampleRequestDTO>("/example", ExampleValidation, (dto: Request<ExampleRequestDTO>): BaseResponse => {
      return BaseResponse.ok(dto.body, "Success");
    });

    /**
     * @method POST
     * addition
     *
     * This API will make an addition from param_1 with param_2
     */
    this.post<any>("/addition", AdditionParamsRequestValidation, (dto: Request<any>): BaseResponse => {
      return BaseResponse.ok(
        (new ExampleControllerHandler().addition(dto.body.param_1, dto.body.param_2)),
        "Success"
      );
    });

    /**
     * @method POST
     * exceptionHandlingTest
     *
     * This function will show how an exception will be behaviour.
     */
    this.post<any>("/exception-handling-test", ExampleAgeInputRequestValidation, (dto: Request<any>): BaseResponse => {
      return BaseResponse.ok(
        (new ExampleControllerHandler().ageValidation(dto.body.age)),
        "Success"
      );
    });

    /**
     * @method POST
     * multipartUploadExample
     *
     * This API demonstrates multipart/form-data handling end-to-end.
     *
     * Required multipart fields:
     * - title: string
     * - document: file
     *
     * Optional multipart fields:
     * - description: string
     */
    this.post<ExampleMultipartUploadRequestDTO>(
      "/example/upload",
      this.multipartSingle('document'),
      ExampleMultipartUploadValidation,
      (dto: Request<ExampleMultipartUploadRequestDTO>): BaseResponse => {
        return BaseResponse.ok(
          {
            title: dto.body.title,
            description: dto.body.description ?? null,
            file: dto.file ? {
              field_name: dto.file.fieldname,
              original_name: dto.file.originalname,
              mime_type: dto.file.mimetype,
              size: dto.file.size
            } : null
          },
          'Multipart upload received successfully'
        );
      }
    );

    // app.post("/sample-db3", async (request: Request, response: Response) => {

    //   return BaseResponse.ok(
    //     (await DB.connection('main').query("SELECT TOP 1 t.* FROM some_tablename t"))[0],
    //     "Success",
    //     response
    //   );
    // });

    return this.app;
  }

}

export default new ExampleController().routes();
