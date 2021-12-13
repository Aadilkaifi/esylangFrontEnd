import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { AddEditVocabComponent } from './add-edit-vocab/add-edit-vocab.component';
import { VocabListComponent } from './vocab-list/vocab-list.component';
import { AddEditVocabularyComponent } from './add-edit-vocabulary/add-edit-vocabulary.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonComponent } from './lesson.component';
import { AddEditLessonComponent } from './add-edit-lesson/add-edit-lesson.component';
import { AddEditChapterComponent } from './add-edit-chapter/add-edit-chapter.component';
import { AddEditFaqComponent } from './add-edit-faq/add-edit-faq.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lesson-list',
    pathMatch: 'full',
  },
  {
    path: '', component: LessonComponent,
    children: [
      { path: 'lesson-list', component: LessonListComponent },
      { path: 'add-lesson', component: AddEditLessonComponent },
      { path: 'edit-lesson/:id', component: AddEditLessonComponent },
      { path: 'edit-chapter/:id', component: AddEditChapterComponent },
      { path: 'chapter/:id', component: AddEditChapterComponent },
      { path: 'faq/:id', component: AddEditFaqComponent },
      { path: 'view-lesson/:id', component: ViewLessonComponent },
      { path: 'add-vocabulary', component: AddEditVocabularyComponent },
      { path: 'edit-vocabulary/:id', component: AddEditVocabularyComponent },
      { path: 'vocabulary-list', component: VocabularyListComponent },
      { path: 'vocab-list/:id', component: VocabListComponent },
      { path: 'add-vocab/:vid', component: AddEditVocabComponent },
      { path: 'edit-vocab/:id', component: AddEditVocabComponent },
      { path: 'conversation-list', component: ConversationListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
