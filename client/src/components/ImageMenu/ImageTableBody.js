import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import ImageTableRow from './ImageTableRow';
import ImageContextMenu from './ImageContextMenu';

const initialContextState = {
    mouseX: null,
    mouseY: null,
};

export default function ImageTableBody(props) {
    const {columns, images, updateThumbnail, selectImageById, setImageVisibleById, zoomToImage, toggleThumbnailDialogOpen} = props;
    const [state, setState] = React.useState(initialContextState);

    const handleContextClick = (event) => {
        event.preventDefault();
        setState({
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
        });
    };
    
      const handleContextClose = () => {
        setState(initialContextState);
    };
    
    return (
        <TableBody>
            {images.map((image) => (
                <ImageTableRow 
                    columns={columns} 
                    image={image}
                    handleContextClick={handleContextClick} 
                    selectImageById={selectImageById}
                    setImageVisibleById={setImageVisibleById}
                    updateThumbnail={updateThumbnail}
                    zoomToImage={zoomToImage}
                />
            ))}
            <ImageContextMenu
                    handleContextClose={handleContextClose}
                    state={state}
                    toggleThumbnailDialogOpen={toggleThumbnailDialogOpen}
            />
        </TableBody>
    )
}