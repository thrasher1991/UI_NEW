import { Component, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [MessageService]
})
export class FileUploadComponent {

  uploadedFiles: any[] = [];
  display: boolean = false;

  // showDialog() {
  //   this.display = true;
  // }

  constructor(private messageService: MessageService, private http: HttpClient, private route: Router) { }

  onUpload = (event) => {
    this.uploadedFiles = event.target.file[0];
  }

  fileUpload = () => {
    console.log(this.uploadedFiles)
    this.http.post(environment.baseurl+'/INGProduct/api/upload', this.uploadedFiles).subscribe((response) => {
      if (response) {

        console.log(response);
      }
    });
  }

  
  fileChange(event) {
    console.log(event)
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        /** In Angular 5, including the header Content-Type can invalidate your request */
      
        this.http.post(environment.baseurl+'/INGProduct/api/upload', formData).subscribe((response) => {
          if (response) {
    
            console.log(response);
            alert(response['message']);
          }
        });
      
    }
}
}
