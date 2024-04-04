import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './components/events-list/events-list.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { isLoggedInGuard } from '../guards/is-logged-in.guard';
import { onlyPrincipalTeacherGuard } from '../guards/only-principal-teacher.guard';

const EVENTS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [isLoggedInGuard, onlyPrincipalTeacherGuard],
    component: EventsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(EVENTS_ROUTES)],
  exports: [RouterModule],
})
export class EventRouting {}
