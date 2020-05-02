var path = require('path');
const { execSync } = require('child_process');

class ThumbnailUtility{
    constructor() {
    }

    //Returns the path of the newly generated thumbnail
    //imagePath - Path to image to generate thumbnail for
    //command - The command in order to make the thumbnail with two '{}' to be replaced
    //              with imagePath and a new filePath for new thumbnail
    //imageExt - The extension the new thumbnail should be
    async generateThumbnail(command, imageExt, imagePath){
        let thumbnailPath, newCommand;
        let output;

        if(imagePath !== undefined) {
            //ToDo - remove '.ntf' and replace with some sort of image extension, might need server work.
            //if passing in just imagePath from base_path then no need for replace, just add +'thumb'+imageExt
            //However, will need to add +img ext to the imagePath where img ext is something like '.ntf'...
            thumbnailPath = imagePath.replace(path.extname(imagePath), 'thumb'+imageExt);

            newCommand = command.replace('{}', imagePath);
            newCommand = newCommand.replace('{}', thumbnailPath);

            try {
                output = execSync(newCommand);
                console.log("made single thumbnail");
            } catch (err) {
                console.log("error in generating thumbnails:");
                console.log(err);
            }
        }
        return thumbnailPath;
    }

    async generateAllThumbnails(command, imageExt, allImagePaths){
        let newThumbList = {};
        let imagePath, thumbnailPath, newCommand;
        let output;

        let imageList = allImagePaths;
        //console.log(JSON.stringify(allImagePaths));
        let i;
        if(imageList !== undefined) {
            for (i = 0; i < imageList.length; ++i) {
                if (imageList[i].thumbnail_path === "Unknown") {

                    //Todo change imagePath to this once server is updated.
                    //imagePath = imageList[i].replace(path.extname(imageList[i].file_path), imageList[i].file_extension);

                    //ToDo - remove '.ntf' and replace with some sort of image extension, might need server work.
                    imagePath = imageList[i].base_path + '.ntf'; //.replace(path.extname(imageList[i].file_path), '.ntf');
                    thumbnailPath = imagePath.replace(path.extname(imagePath), 'thumb'+imageExt);

                    newCommand = command.replace('{}', imagePath);
                    newCommand = newCommand.replace('{}', thumbnailPath);

                    try {
                        output = execSync(newCommand);
                        console.log("made thumbnail");
                    } catch (err) {
                        console.log("error in generating thumbnails:");
                        console.log(err);
                    }

                    newThumbList[imageList[i]._id] = thumbnailPath;
                }
            }
        }
        return newThumbList;
    }
};
module.exports = ThumbnailUtility;