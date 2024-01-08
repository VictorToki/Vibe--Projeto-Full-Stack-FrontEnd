import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { Component1Component } from './_components/component-1/component-1.component';
import { Component2Component } from './_components/component-2/component-2.component';
import { HomeComponent } from './_components/home/home.component';
import { NgModule } from '@angular/core';
import { FormularioCreditoComponent } from './_components/formulario-credito/formulario-credito.component';
import { EmitenteProprietarioComponent } from './_components/formulario-credito/emitente-proprietario/emitente-proprietario.component';
import { AvalistaComponent } from './_components/formulario-credito/avalista/avalista.component';
import { LiberacaoComponent } from './_components/formulario-credito/liberacao/liberacao.component';
import { ConfirmacaoComponent } from './_components/formulario-credito/confirmacao/confirmacao.component';
import { ListaFormulariosCreditoComponent } from './_components/lista-formularios-credito/lista-formularios-credito.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, children: [
    {path: 'sidenav', component: SidenavComponent,pathMatch: 'full'}
  ]},
  { path: 'component-1', component: Component1Component},
  { path: 'component-2', component: Component2Component},
  { path: 'listaFormulario', component: ListaFormulariosCreditoComponent},
  { path: 'formulario', component: FormularioCreditoComponent, children: [
    {path: 'emitente', component: EmitenteProprietarioComponent, data: {dado: 'emitente'}},
    {path: 'proprietario', component: EmitenteProprietarioComponent, data: {dado: 'proprietario'}},
    {path: 'avalista', component: AvalistaComponent},
    {path: 'liberacao', component: LiberacaoComponent},
    {path: 'confirmacao', component: ConfirmacaoComponent},
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
