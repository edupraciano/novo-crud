// Constantes Globais
const SS = SpreadsheetApp.openById(
  "1kWX6wvA1rVyzMFRRo6O1ikbksvN2gMvdrntv09nhCY8"
);
const main = SS.getSheetByName("main");
/////////////////////////////////////////////////////////////////////////////////

function doPost(e) {
  if (e.parameters.qualFuncao == "entradaDeFuncionario") {
    entradaDeFuncionario(e);
  } else if (e.parameters.qualFuncao == "lerFuncionarios") {
    return ContentService.createTextOutput(JSON.stringify(lerFuncionarios(e)));
  }
}

function entradaDeFuncionario(e) {
  var ultimaLinha = main.getLastRow();
  var colunaId = main.getRange("A2:A").getValues();
  var id = "";

  if (id == "") {
    id = Math.max.apply(null, colunaId) + 1;
  }

  if (e.parameters.idDoFuncionario == "") {
    // Adicionar funcuonário
    main.getRange(ultimaLinha + 1, 1).setValue(id);
    main.getRange(ultimaLinha + 1, 2).setValue(e.parameters.nomeDoFuncionario);
    main.getRange(ultimaLinha + 1, 3).setValue(e.parameters.cargoDoFuncionario);
    main
      .getRange(ultimaLinha + 1, 4)
      .setValue(e.parameters.salarioDoFuncionario);
    // Alerar Funcionaário
  } else {
    for (i = 1; i <= ultimaLinha; i++) {
      if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
        main.getRange(i, 1).setValue(e.parameters.idDoFuncionario);
        main.getRange(i, 2).setValue(e.parameters.nomeDoFuncionario);
        main.getRange(i, 3).setValue(e.parameters.cargoDoFuncionario);
        main.getRange(i, 4).setValue(e.parameters.salarioDoFuncionario);
      }
    }
  }
}

function lerFuncionarios(e) {
  var ultimaLinha = main.getLastRow();
  var ultimaColuna = main.getLastColumn();
  var todaATabela = main
    .getRange(2, 1, ultimaLinha - 1, ultimaColuna)
    .getValues();

  return todaATabela;
}