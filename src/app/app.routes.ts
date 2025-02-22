import { Routes } from '@angular/router';
import { VisualizarAgendaComponent } from './visualizar-agenda/visualizar-agenda.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { component: HomeComponent, path: "" },
    { component: VisualizarAgendaComponent, path: "visualizar" }
];
