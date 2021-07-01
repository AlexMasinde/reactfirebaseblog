export default function searchArticle(uploadedFiles, articleContent) {
  return new Promise(function (resolve, reject) {
    const article = articleContent.content;
    const files = uploadedFiles.map((uploadedFile) => {
      const used = article.search(uploadedFile.url);
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
