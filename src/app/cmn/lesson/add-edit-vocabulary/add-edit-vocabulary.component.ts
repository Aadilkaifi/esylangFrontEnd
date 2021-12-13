import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Language } from 'src/app/@core/models/language/language.model';
import { Vocabularies } from 'src/app/@core/models/p-lessons/vocabularies.model';
import { LanguageService } from 'src/app/@core/services/languages/language.service';
import { VocabulariesService } from 'src/app/@core/services/p-lessons/vocabularies.service';

@Component({
  selector: 'app-add-edit-vocabulary',
  templateUrl: './add-edit-vocabulary.component.html',
  styleUrls: ['./add-edit-vocabulary.component.css']
})
export class AddEditVocabularyComponent implements OnInit {
  id: string;
  model: Vocabularies = new Vocabularies();
  lang: Language[];
  titleHead = '';
  image: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              private langService: LanguageService,
              private toaster: Toaster,
              private service: VocabulariesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
    if (this.id != null) {
      this.getSingle(this.id);
      this.titleHead = 'Edit';
    } else {
      this.titleHead = 'Add';

    }
    this.getLanguages();
  }



  formFo(form: NgForm) {
    if (this.id != null) {
      this.service.update(this.model).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getSingle(this.id);
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
          this.image = null;
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


  public getLanguages() {
    this.langService.getallNp().subscribe(res => {
      const data = res.data as Array<Language>;
      if (data && data.length > 0) {
        this.lang = data;
      } else {
        this.toaster.open({
          text: 'languages not Found',
          caption: '404' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }

  getSingle(e) {
    this.service.single(e).subscribe(res => {
      const data = res.data;
      if (res.status === 1) {
        this.model = data;
      } else if (res.status === 0) {
        this.toaster.open({
          text: 'Opps! Could not get Conversation',
          caption: '401' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }


}
