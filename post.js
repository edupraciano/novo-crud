// Constantes Globais
const SS = SpreadsheetApp.openById(
  "1kWX6wvA1rVyzMFRRo6O1ikbksvN2gMvdrntv09nhCY8"
);
const main = SS.getSheetByName("main");
const usuarios = SS.getSheetByName("usuários");
/////////////////////////////////////////////////////////////////////////////////

function doPost(e) {
  if (e.parameters.qualFuncao == "cadastrar_estabelecimento") {
    cadastrar_estabelecimento(e);
  } else if (e.parameters.qualFuncao == "ler_estabelecimentos") {
    return ContentService.createTextOutput(
      JSON.stringify(ler_estabelecimentos(e))
    );
  } else if (e.parameters.qualFuncao == "excluir_estabelecimento") {
    excluir_estabelecimento(e);
  } else if (e.parameters.qualFuncao == "autenticacao") {
    return ContentService.createTextOutput(JSON.stringify(autenticacao(e)));
  }
}

function autenticacao(e) {
  let ultima_linha_usuarios = usuarios.getLastRow();

  let dados_usuario = e.parameters.dados_usuario;
  let senha_do_usuario = e.parameters.senha_do_usuario;

  let usuario_autenticado = false;
  usuario_autenticado = "Usuário Não Autenticado.";

  for (let i = 1; i <= ultima_linha_usuarios; i++) {
    if (usuarios.getRange(i, 1).getValue() == dados_usuario) {
      if (usuarios.getRange(i, 2).getValue() == senha_do_usuario) {
        usuario_autenticado = true;
        usuario_autenticado = "Usuário Autenticado.";
      }
    }
  }
  console.log(usuario_autenticado);
  return usuario_autenticado;
}

function cadastrar_estabelecimento(e) {
  let ultima_linha_main = main.getLastRow();
  let colunaId = main.getRange("A2:A").getValues();
  let data_de_hoje = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy");

  let id = "";

  if (id == "") {
    id = Math.max.apply(null, colunaId) + 1;
  }

  if (e.parameters.id_do_estabelecimento == "") {
    // Adicionar Estabelecimento
    main.getRange(ultima_linha_main + 1, 1).setValue(id);
    main
      .getRange(ultima_linha_main + 1, 2)
      .setValue(e.parameters.nome_do_estabelecimento);
    main.getRange(ultima_linha_main + 1, 3).setValue(e.parameters.produto);
    main.getRange(ultima_linha_main + 1, 4).setValue(e.parameters.chave);
    main.getRange(ultima_linha_main + 1, 5).setValue(e.parameters.maquina);
    main.getRange(ultima_linha_main + 1, 6).setValue(e.parameters.endereco);
    main.getRange(ultima_linha_main + 1, 7).setValue(e.parameters.responsavel);
    main.getRange(ultima_linha_main + 1, 8).setValue(e.parameters.contato);
    main.getRange(ultima_linha_main + 1, 9).setValue(data_de_hoje);
    // Alerar Estabelecimento
  } else {
    for (i = 1; i <= ultima_linha_main; i++) {
      if (
        main.getRange(i, 1).getValue() == e.parameters.id_do_estabelecimento
      ) {
        main.getRange(i, 2).setValue(e.parameters.nome_do_estabelecimento);
        main.getRange(i, 3).setValue(e.parameters.produto);
        main.getRange(i, 4).setValue(e.parameters.chave);
        main.getRange(i, 5).setValue(e.parameters.maquina);
        main.getRange(i, 6).setValue(e.parameters.endereco);
        main.getRange(i, 7).setValue(e.parameters.responsavel);
        main.getRange(i, 8).setValue(e.parameters.contato);
        main.getRange(i, 9).setValue(data_de_hoje);
      }
    }
  }
}

function ler_estabelecimentos(e) {
  let ultima_linha_main = main.getLastRow();
  let ultimaColuna = main.getLastColumn();
  let todaATabela = main
    .getRange(2, 1, ultima_linha_main - 1, ultimaColuna)
    .getValues();
  return todaATabela;
}

function excluir_estabelecimento(e) {
  let ultima_linha_main = main.getLastRow();
  for (var i = 1; i <= ultima_linha_main; i++) {
    if (main.getRange(i, 1).getValue() == e.parameters.id_do_estabelecimento) {
      main.deleteRow(i);
      break;
    }
  }
}
