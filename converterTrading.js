function convert() {
  const input = document.getElementById("textToConvert").value;
  convertToTable(input);
}

function convertToTable(input) {
  // Remove all uppercase letters and text between = and ?
  input = input.replace(/[A-Z]+|=.*?€/g, ' ');
  console.log(input);

  // Split input into lines and create table header
  var lines = input.trim().split('\n');
  var table = '<table><thead><tr><th>Date</th><th>Text</th></tr></thead><tbody>';

  // Loop through each line and extract dates and text
  var currentDate = null;
  var currentText = '';

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
  
    // Check if line contains a date
    var match = line.match(/\d{1,2}\/\d{1,2}:$/);
    if (match !== null) {
      // Add current date and text to table if not null
      if (currentDate !== null && currentText !== '') {
        // Split currentText into rows
        var rows = currentText.split('\n');
        for (var j = 0; j < rows.length; j++) {
          table += '<tr><td>' + currentDate + '</td><td>' + rows[j].trim() + '</td></tr>';
        }
      }
  
      // Set new date and reset text
      currentDate = match[0];
      currentText = '';
    } else {
      // Add line to current text
      currentText += '\n' + line;
    }
  }
  
  // Add last date and text to table if not null
  if (currentDate !== null && currentText !== '') {
    // Split currentText into rows
    var rows = currentText.split('\n');
    for (var j = 0; j < rows.length; j++) {
      table += '<tr><td>' + currentDate + '</td><td>' + rows[j].trim() + '</td></tr>';
    }
  }
  

  // Close table and return output
  table += '</tbody></table>';
  document.getElementById('output').innerHTML = table;
}
