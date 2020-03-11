import saveAs from 'file-saver';

export const onSave = workbook => {
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Fact.xlsx');
  });
};
