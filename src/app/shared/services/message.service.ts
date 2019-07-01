import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) {
  }

  showErrorMessage(title: string, message: string) {
    this.toastr.error(message, title);
  }

  showSuccessMessage(title: string, message: string) {
    this.toastr.success(message, title);
  }
}
