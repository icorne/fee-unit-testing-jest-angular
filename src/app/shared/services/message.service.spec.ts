import {MessageService} from './message.service';
import {ToastrService} from 'ngx-toastr';
import {ToastrStub} from '../stubs/toaster.service.stub';

describe('MessageService', () => {
  let service: MessageService;
  let stubbedService: ToastrStub;

  beforeEach(() => {
    stubbedService = new ToastrStub();
    service = new MessageService(stubbedService as ToastrService);
  });

  it('should create the MessageService', () => {
    expect(service).toBeTruthy();
  });

  it('should show error message', () => {
    // ARRANGE
    spyOn(stubbedService, 'error').and.callThrough();
    const message = 'message';
    const title = 'test';

    // ACT
    service.showErrorMessage(title, message);

    // ASSERT
    expect(stubbedService.error).toHaveBeenCalledWith(message, title);
  });

  it('should show success message', () => {
    // ARRANGE
    spyOn(stubbedService, 'success');

    const message = 'message';
    const title = 'test';

    // ACT
    service.showSuccessMessage(title, message);

    // ASSERT
    expect(stubbedService.success).toHaveBeenCalledWith(message, title);
  });
});
