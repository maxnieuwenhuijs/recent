import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import './Dropzone.css'; 

const Basic = (props) => {
  // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
        console.log("2134: "+meta)
        return {
            url: 'https://adminportal.dating/api/postImage/1/'
        }
    }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log("status: " + status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
          accept="image/*"
          submitButtonContent ="Upload photo's"
          
    />
  )
}

export default Basic; 