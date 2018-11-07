import {AdminService} from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService();
  });

  it('should create the AdminService', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to return a random number', () => {
    expect(service.getAmountOfPages('')).toBeTruthy();
  });
});
