import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Faq } from 'src/app/@core/models/p-lessons/faq.model';
import { FaqService } from 'src/app/@core/services/p-lessons/faq.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.css']
})
export class AddEditFaqComponent implements OnInit {
  lid: string;
  model: Faq = new Faq();
  titleHead = '';
  exType = [];
  exist = false;
  faq: Faq[];

  constructor(private activatedRoute: ActivatedRoute,
              private toaster: Toaster,
              private service: FaqService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.lid = param.get('id');
    });
    if (this.lid != null) {
      this.model.lessonId = this.lid;
      this.getFaqs(this.lid);
      this.titleHead = 'Add';
    }

  }


  formFo(form: NgForm) {
    if (this.model.id != null) {
      this.service.update(this.model).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getFaqs(this.lid);
          form.resetForm();
          this.model.lessonId = this.lid;
        } else if (data.status === 0) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Error Occured!',
            type: 'danger',
          });
        } else {
          this.toaster.open({
            text: 'Something went Wrong',
            caption: '401' + ' Error Occured!',
            type: 'danger',
          });
        }
      });
    } else {
      this.service.add(this.model).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getFaqs(this.lid);
          form.resetForm();
          this.model.lessonId = this.lid;
        } else if (data.status === 0) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Error Occured!',
            type: 'danger',
          });
        } else {
          this.toaster.open({
            text: 'Something went Wrong',
            caption: '401' + ' Error Occured!',
            type: 'danger',
          });
        }
      });
    }

  }

  getSingle(e) {
    this.service.single(e).subscribe(res => {
      const data = res.data;
      if (res.status === 1) {
        this.model = data;
        this.titleHead = 'Edit';
      } else if (res.status === 0) {
        this.toaster.open({
          text: res.message,
          caption: 'Error Occured!!',
          type: 'danger',
        });
      }
    });
  }

  public getFaqs(e) {
    this.service.getallNp(e).subscribe(res => {
      const data = res;
      if (data.data && data.data.length > 0) {
        this.faq = data.data;
        this.model.lessonId = this.lid;
        this.exist = false;
      } else {
        this.exist = true;
        this.faq = data.data;
      }
    });
  }

  public editFaq(e) {
    this.getSingle(e);
  }

  public removeFaq(e) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wont be able to revert this',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(e).subscribe(res => {
          const data = res;
          if (data.status === 1) {
            this.model.lessonId = this.lid;
            this.getFaqs(this.lid);
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Ok!',
              type: 'light',
              position: 'bottom-center',
            });
          } else if (data.status === 0) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Error Occured!',
              type: 'danger',
              position: 'bottom-center',
            });
          } else {
            this.toaster.open({
              text: 'Something went Wrong',
              caption: data.code + ' Error Occured!',
              type: 'danger',
              position: 'bottom-center',
            });
          }
        });
      }
    });
  }

}
