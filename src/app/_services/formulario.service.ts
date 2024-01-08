import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';

const API = 'http://localhost:8000/api/formularios'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class FormularioService{
  constructor(private http: HttpClient) {}

  getDados()
  {
    return this.http.get(API + `/formulario`);
  }

  addForm(dados: any){
    return this.http.post(API + '/new',
    {
      logs: {
        date: new Date().toJSON(),
        version: 1,
        changes: ""
      },
      body: {
        emitente: {
          cep: dados.emitente.cep,
          cidade: dados.emitente.cidade,
          cnpj: dados.emitente.cnpj,
          email: dados.emitente.email,
          logradouro: dados.emitente.logradouro,
          razaoSocial: dados.emitente.razaoSocial,
          telefone: dados.emitente.telefone,
          uf: dados.emitente.uf
        },
        proprietario: {
          cep: dados.proprietario.cep,
          cidade: dados.proprietario.cidade,
          cnpj: dados.proprietario.cnpj,
          email: dados.proprietario.email,
          logradouro: dados.proprietario.logradouro,
          razaoSocial: dados.proprietario.razaoSocial,
          telefone: dados.proprietario.telefone,
          uf: dados.proprietario.uf
        },
        avalista: {
          descricaoBem: dados.avalista.descricaoBem,
          valorBem: dados.avalista.valorBem,
        },
        liberacao: {
          numeroParcelas: dados.liberacao.numeroParcelas,
          valorFinanciado: dados.liberacao.valorFinanciado,
          valorParcela: dados.liberacao.valorParcela,
          valorSolicitado: dados.liberacao.valorSolicitado,
          valorTotalParcelas: dados.liberacao.valorTotalParcelas,
        }
      },
      version: 1
    },
    httpOptions)
  }

  editDados(_id: string, dados: any, changes: any){
    debugger;
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