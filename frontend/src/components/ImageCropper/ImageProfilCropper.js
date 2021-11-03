import React, {useState} from "react";
import styles from './ImageProfilCropper.module.css';
import ImageCropper from "./ImageCropper";

function ImageProfilCropper({setFile, setNewImage, setIsModifyAvatar, setNewFile}) {
	const [imageToCrop, setImageToCrop] = useState(undefined);
	const [croppedImage, setCroppedImage] = useState(undefined);
	const [croppedFile, setCroppedFile] = useState(undefined);

	const onUploadFile = (event) => {
		 if (event.target.files && event.target.files.length > 0) {
			  const reader = new FileReader();

			  reader.addEventListener('load', () =>
					setImageToCrop(reader.result)
			  );

			  reader.readAsDataURL(event.target.files[0]);
		 }
	};

	const onSelectPhoto = () => {
		setNewImage(croppedImage);
		setFile(croppedFile);
		setNewFile(croppedFile);
		setIsModifyAvatar(false);
	}

	return (
		 <div className = {styles.frame}>
			  <div className = {styles.file__addbtn} aria-label ="Ajouter une image" role = "button" title = "Ajoutez une image">
				<label htmlFor="image" >
					<i className="far fa-image"></i> Cliquer ici pour ajouter votre photo
				</label>
				<input 	id = "image" 
							accept = "image/*" 
							type = "file" 
							name = "image" 
							className ={styles.file__input}
							onChange={onUploadFile} />
		 	  </div>

			  <div>
					<ImageCropper
						 imageToCrop={imageToCrop}
						 onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
						 onFileCropped = {setCroppedFile}
					/>
			  </div>
			  
  			  {
					croppedImage &&
					<div  >
						 <h3>Votre photo</h3>
						 <img
							  alt="Cropped Img"
							  src={croppedImage}
						 />
					</div>
			  }
			  {
					croppedImage &&
					<div  className = {styles.file__addbtn} 
							onClick = {onSelectPhoto} 
							aria-label ="Changer la photo" role = "button" 
							title = "Changer la photo">Enrégistrer la nouvelle photo
					</div>
			  }
		 </div>
	);
}

export default ImageProfilCropper;