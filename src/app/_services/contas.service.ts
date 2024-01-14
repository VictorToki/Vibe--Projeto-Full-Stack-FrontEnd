import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';

const API = 'http://localhost:8000/api/contas'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class ContasService{
  constructor(private http: HttpClient) {}

  getDados()
  {
    return this.http.get(API + `/conta`);
  }

  addDados(dados: any){
    return this.http.post(API + '/new',
    {
      logs: {
        date: new Date().toJSON(),
        version: 1,
        changes: ""
      },
      body: {
        name: dados.nome,
        age: dados.idade,
        cor: dados.cor,
        comida: dados.comida,
        bebida: dados.bebida,
        cidade: dados.cidade
      },
      version: 1
    },
    httpOptions)
  }

  editDados(_id: string, dados: any, changes: any){
    return this.http.put(API + '/' + _id,
    {
      logs: {
        date: new Date().toJSON(),
        version: dados.version,
        changes: changes
      },
      body: {
        name: dados.name,
        age: dados.age,
        cor: dados.cor,
        comida: dados.comida,
        bebida: dados.bebida,
        cidade: dados.cidade
      }
    },
    httpOptions)
  }
}