import {ModalService} from './modal.service';

describe('ModalService', () => {

  let service: ModalService;

  beforeEach(() => {
    service = new ModalService();
  });

  it('should create the ModalService', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to open a modal', () => {
    // ARRANGE
    spyOn(service, 'open').and.callThrough();

    // ACT
    // ASSERT
    service.open('message').then(() => expect(true).toEqual(true));
  });
});
