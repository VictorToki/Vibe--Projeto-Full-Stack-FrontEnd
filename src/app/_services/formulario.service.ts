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

  getDadosById(id: string | undefined)
  {
    return this.http.get(API + `/${id}`);
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
          dataEmissao: dados.liberacao.dataEmissao,
          dataVencimentoPrimeiraParcela: dados.liberacao.dataVencimentoPrimeiraParcela,
          dataVencimentoUltimaParcela: dados.liberacao.dataVencimentoUltimaParcela,
        }
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
        emitente: {
          cep: dados.body.emitente.cep,
          cidade: dados.body.emitente.cidade,
          cnpj: dados.body.emitente.cnpj,
          email: dados.body.emitente.email,
          logradouro: dados.body.emitente.logradouro,
          razaoSocial: dados.body.emitente.razaoSocial,
          telefone: dados.body.emitente.telefone,
          uf: dados.body.emitente.uf
        },
        proprietario: {
          cep: dados.body.proprietario.cep,
          cidade: dados.body.proprietario.cidade,
          cnpj: dados.body.proprietario.cnpj,
          email: dados.body.proprietario.email,
          logradouro: dados.body.proprietario.logradouro,
          razaoSocial: dados.body.proprietario.razaoSocial,
          telefone: dados.body.proprietario.telefone,
          uf: dados.body.proprietario.uf
        },
        avalista: {
          descricaoBem: dados.body.avalista.descricaoBem,
          valorBem: dados.body.avalista.valorBem,
        },
        liberacao: {
          numeroParcelas: dados.body.liberacao.numeroParcelas,
          valorFinanciado: dados.body.liberacao.valorFinanciado,
          valorParcela: dados.body.liberacao.valorParcela,
          valorSolicitado: dados.body.liberacao.valorSolicitado,
          valorTotalParcelas: dados.body.liberacao.valorTotalParcelas,
          dataEmissao: dados.body.liberacao.dataEmissao,
          dataVencimentoPrimeiraParcela: dados.body.liberacao.dataVencimentoPrimeiraParcela,
          dataVencimentoUltimaParcela: dados.body.liberacao.dataVencimentoUltimaParcela,
        }
      },
    },
    httpOptions)
  }

  confirmContract(_id: string){
    return this.http.put(API + '/' + _id,
    {
      confirm: true
    },
    httpOptions)
  }
}