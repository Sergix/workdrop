const putObject = {
  ACL: 'public-read',
  Bucket: 'workdrop-submissions',
}

const readFile = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      resolve(fileReader.result)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

// https://stackoverflow.com/questions/25354313/saving-a-uint8array-to-a-binary-file
const downloadBlob = (data, fileName, mimeType) => {
  const blob = new Blob([data], {
    type: mimeType,
  })
  const url = window.URL.createObjectURL(blob)
  downloadURL(url, fileName)
  setTimeout(function() {
    return window.URL.revokeObjectURL(url)
  }, 1000)
}
const downloadURL = (data, fileName) => {
  const a = document.createElement('a')
  a.href = data
  a.download = fileName
  document.body.appendChild(a)
  a.style = 'display: none'
  a.click()
  a.remove()
}

export { putObject, readFile, downloadBlob }
