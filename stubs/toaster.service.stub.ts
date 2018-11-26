import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

export class ToastrStub {

  success(message?: string, title?: string, override?: Partial<IndividualConfig>): void {}

  error(message?: string, title?: string, override?: Partial<IndividualConfig>): void {}

}
