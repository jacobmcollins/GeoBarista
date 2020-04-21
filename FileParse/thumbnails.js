var path = require('path');
const {execSync} = require("child_process");

class thumbnails{
    //Returns the path of the newly generated thumbnail
    //imagePath - Path to image to generate thumbnail for
    //command - The command in order to make the thumbnail with two '{}' to be replaced
    //              with imagePath and a new filePath for new thumbnail
    //imageExt - The extension the new thumbnail should be
    generateThumbnails(imagePath, command, imageEXT){
        let newPath = imagePath.replace(path.extname(imagePath), imageEXT);

        let newCommand = command.replace('{}', imagePath);
        newCommand = newCommand.replace('{}', newPath);

        //Can be parsed in order to determine if an error occured. However, this error
        //relies on the specific command. I.E. gets tricky to implement correctly.
        let output = execSync(newCommand);

        return newPath;
    }
}
module.exports = thumbnails;