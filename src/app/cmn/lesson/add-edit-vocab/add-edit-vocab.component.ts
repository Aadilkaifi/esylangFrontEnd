import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Vocab } from 'src/app/@core/models/p-lessons/vocab.model';
import { VocabService } from 'src/app/@core/services/p-lessons/vocab.service';

@Component({
  selector: 'app-add-edit-vocab',
  templateUrl: './add-edit-vocab.component.html',
  styleUrls: ['./add-edit-vocab.component.css']
})
export class AddEditVocabComponent implements OnInit {
  id: string;
  model: Vocab = new Vocab();
  titleHead = '';
  days = [];
  sizeErrorMessageDocC = '';
  audio: File = null;
  vocId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private service: VocabService,
    private toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.vocId = param.get('vid');
    });
    if (this.id != null) {
      this.getSingleVocab(this.id);
      this.titleHead = 'Edit';
    } else {
      this.titleHead = 'Add';

    }
  }



  formFo(form: NgForm) {
    if (this.id != null) {
      const formData = new FormData();
      if (this.audio != null) {
        formData.append('audio', this.audio, this.audio.name);
      }
      formData.append('theForm', this.model.theForm);
      formData.append('anForm', this.model.anForm);
      formData.append('word', this.model.word);
      formData.append('meaning', this.model.meaning);
      formData.append('vid', this.model.vid);
      formData.append('id', this.id);
      this.service.update(formData).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getSingleVocab(this.id);
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
      const formData = new FormData();
      if (this.audio != null) {
        formData.append('audio', this.audio, this.audio.name);
      }
      formData.append('theForm', this.model.theForm);
      formData.append('anForm', this.model.anForm);
      formData.append('word', this.model.word);
      formData.append('meaning', this.model.meaning);
      formData.append('vid', this.vocId);
      this.service.add(formData).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.audio = null;
          form.resetForm();
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

  getSingleVocab(e) {
    this.service.single(e).subscribe(res => {
      const data = res.data;
      if (res.status === 1) {
        this.model = data;
      } else if (res.status === 0) {
        this.toaster.open({
          text: 'Opps! Could not get Vocab',
          caption: '401' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }

  uploadAudio(event) {
    this.audio = event.target.files[0];
    if (this.audio.size !== null && this.audio.size <= 3000000) {
      this.sizeErrorMessageDocC = '';
    } else {
      this.sizeErrorMessageDocC = 'File Exceed the size of 3 Mb';
    }
  }


}
