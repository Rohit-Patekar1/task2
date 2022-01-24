import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Listbox from './Listbox';

const FileUpload = ({ history }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  const onClick = () => {
    history.push("/fetchedproducts")
  }


  return (
    <Fragment>
      <h4 className='display-4 text-center mb-4'>
        <i className='fab fa-react' /> Import Files
      </h4>
      <h5 className='mg-1'>Step 1:  Choose a file</h5>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      <h5 className='mg-1'>Step 2:  Specify Format</h5>
      <div>

        <label> File  Type</label>
        <select className='pd-3' name="type">
          <option value="csv">CSV</option>
          <option value="json">.JSON</option>
        </select>
      </div>

      <div>

        <label> Character Encoding</label>
        <select className='pd-1' name="type">
          <option value="csv">UTF-8</option>
          <option value="json">UTF-16</option>
          <option value="json">UTF-32</option>
        </select>
      </div>

      <div>

        <label> Delimilter</label>
        <select className='pd-2' name="type">
          <option value="csv">comma</option>
          <option value="json">.JSON</option>
        </select>
      </div>

      <div>
        <label>Has Header</label>
        <input className='pd-0' type="checkbox" name="header"
          checked />
      </div>
      <div className='pd-6'>
        <h5>Step3: Display Handling</h5>
        <p className='pd-4'>Select Fields to be displayed</p>
        <Listbox />
      </div>
      <div className='mg3'>
        <button type="button" onClick={onClick} class="btn btn-success">Procced</button>
      </div>
    </Fragment>
  );
};

export default FileUpload;
