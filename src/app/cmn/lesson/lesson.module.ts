import { BreadcrumModule } from './../breadcrum/breadcrum.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditLessonComponent } from './add-edit-lesson/add-edit-lesson.component';
import { FormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AddEditChapterComponent } from './add-edit-chapter/add-edit-chapter.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AddEditFaqComponent } from './add-edit-faq/add-edit-faq.component';
import { AccordionModule } from 'ngx-bootstrap';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { AddEditVocabularyComponent } from './add-edit-vocabulary/add-edit-vocabulary.component';
import { VocabListComponent } from './vocab-list/vocab-list.component';
import { AddEditVocabComponent } from './add-edit-vocab/add-edit-vocab.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { AddEditConversationComponent } from './add-edit-conversation/add-edit-conversation.component';


@NgModule({
  declarations: [LessonComponent,
    LessonListComponent,
    AddEditLessonComponent,
    AddEditChapterComponent,
    AddEditFaqComponent,
    ViewLessonComponent,
    VocabularyListComponent,
    AddEditVocabularyComponent,
    VocabListComponent,
    AddEditVocabComponent,
    ConversationListComponent,
    AddEditConversationComponent],
  imports: [
    CommonModule,
    LessonRoutingModule,
    NgxPaginationModule,
    FormsModule,
    BreadcrumModule,
    NgxIntlTelInputModule,
    CKEditorModule,
    AccordionModule,

  ]
})
export class LessonModule { }
