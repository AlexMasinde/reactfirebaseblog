export default function searchArticle(uploadedFiles, articleContent) {
  return new Promise(function (resolve, reject) {
    const files = uploadedFiles.map((uploadedFile) => {
      const used = articleContent.search(uploadedFile.url);
      if (used === -1) {
        const unuploaded = {
          url: uploadedFile.url,
          used: false,
          publicId: uploadedFile.publicId,
        };
        return unuploaded;
      } else {
        return uploadedFile;
      }
    });
    files ? resolve(files) : reject({ message: "Could not search article" });
  });
}
