const fs = require('fs')
const path = require('path')
const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      console.log('directory', path.join(dir, file));
      var odir = {
        file: dirFile,
        files: []
      }
      odir.files = walkSync(dirFile, dir.files);
      filelist.push(odir);
    } else {
      filelist.push({
        file: dirFile
      });
    }
  }
  return filelist;
};

module.exports = walkSync
