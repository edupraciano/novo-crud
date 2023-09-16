// Constantes Globais
const SS = SpreadsheetApp.openById(
  "1kWX6wvA1rVyzMFRRo6O1ikbksvN2gMvdrntv09nhCY8"
);
const main = SS.getSheetByName("main");
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
  }
}

function cadastrar_estabelecimento(e) {
  var ultimaLinha = main.getLastRow();
  var colunaId = main.getRange("A2:A").getValues();
  let data_de_hoje = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy");

  var id = "";

  if (id == "") {
    id = Math.max.apply(null, colunaId) + 1;
  }

  if (e.parameters.id_do_estabelecimento == "") {
    // Adicionar funcuonário
    main.getRange(ultimaLinha + 1, 1).setValue(id);
    main
      .getRange(ultimaLinha + 1, 2)
      .setValue(e.parameters.nome_do_estabelecimento);
    main.getRange(ultimaLinha + 1, 3).setValue(e.parameters.produto);
    main.getRange(ultimaLinha + 1, 4).setValue(e.parameters.chave);
    main.getRange(ultimaLinha + 1, 5).setValue(e.parameters.maquina);
    main.getRange(ultimaLinha + 1, 6).setValue(e.parameters.endereco);
    main.getRange(ultimaLinha + 1, 7).setValue(e.parameters.responsavel);
    main.getRange(ultimaLinha + 1, 8).setValue(e.parameters.contato);
    main.getRange(ultimaLinha + 1, 9).setValue(data_de_hoje);
    // Alerar Funcionaário
  } else {
    for (i = 1; i <= ultimaLinha; i++) {
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
  var ultimaLinha = main.getLastRow();
  var ultimaColuna = main.getLastColumn();
  var todaATabela = main
    .getRange(2, 1, ultimaLinha - 1, ultimaColuna)
    .getValues();
  return todaATabela;
}

function excluir_estabelecimento(e) {
  var ultimaLinha = main.getLastRow();
  for (var i = 1; i <= ultimaLinha; i++) {
    if (main.getRange(i, 1).getValue() == e.parameters.id_do_estabelecimento) {
      main.deleteRow(i);
      break;
    }
  }
}
