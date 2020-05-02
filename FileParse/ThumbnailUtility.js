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
    generateThumbnail(imagePath, command, imageEXT){
        let newPath = imagePath.replace(path.extname(imagePath), imageEXT);

        let newCommand = command.replace('{}', imagePath);
        newCommand = newCommand.replace('{}', newPath);

        //Can be parsed in order to determine if an error occured. However, this error
        //relies on the specific command. I.E. gets tricky to implement correctly.
        let output = execSync(newCommand);

        return newPath;
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

                    imagePath = imageList[i].file_path.replace(path.extname(imageList[i].file_path), '.ntf');
                    thumbnailPath = imagePath.replace(path.extname(imagePath), imageExt);

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
                    //let temp = await Client.update(imageList[i].base_name, 'thumbnail_path', Thumbnail.generateThumbnails(imageList[i].file_path.split('.')[0]+'.ntf', ))
                }
            }
        }

        //ToDo return a key value pair of basname of image with new thumbnail path so calling function can assign those new paths to the server with client.update
        //ToDo actually have this return the key value pairs to the server call and update in there so no client side updating is needed
        return newThumbList;
    }
};
module.exports = ThumbnailUtility;