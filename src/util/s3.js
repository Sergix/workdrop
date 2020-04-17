const putObject = {
  ACL: 'public-read',
  Bucket: 'workdrop-submissions',
}

const readFile = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      console.log(event.target.result)
      resolve(fileReader.result)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

export { putObject, readFile }
