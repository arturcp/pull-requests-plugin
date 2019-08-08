function saveOptions() {
  LocalStorage.write('authors', document.getElementById('authors').value);
  alert('Dados salvos com sucesso');
}

function restoreOptions() {
  var authors = LocalStorage.read('authors');
  document.getElementById('authors').value = authors;
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();

  document.getElementById('save').addEventListener('click', saveOptions);
});
