import React, { Component } from "react";
import axios from "axios";
import classes from "./UploadNewCourse.module.css";
import { getPath, getBrand } from "../../../util/getPath";

class UploadImages extends Component {
  constructor() {
    super();
    this.state = {
      course: 2,
      lessonId: 1,
      lessonOrder: 0,
      selectedFile: null,
      loaded: false,
    };
  }

  onChangeHandler = (event) => {
    let file = event.target.files[0];
    console.log(file);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: false,
    });
  };

  onClickHandler = (lessonID, fileID) => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(`${getPath()}admin/image/${fileID}`, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        var element = document.getElementById(lessonID);
        element.classList.add("valid");
      });
  };

  onClickHandlerEbook = (lessonID) => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(`${getPath()}admin/ebook/`, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        var element = document.getElementById(lessonID);
        element.classList.add("valid");
      });
  };

  render() {
    let loaded = this.state.loaded;

    return (
      <div>
        <form id="1" className={classes.Form} onSubmit={this.handleSubmit}>
          <img src={window.location.origin + "/img.png"} />
          <h3>Please upload Banner IMG</h3>
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            class="btn btn-success btn-block"
            onClick={() => this.onClickHandler(1, "banner")}
          >
            Upload
          </button>
        </form>

        <form id="2" className={classes.Form} onSubmit={this.handleSubmit}>
          <img src={window.location.origin + "/img.png"} />
          <h3>Please upload Video Poster</h3>
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            class="btn btn-success btn-block"
            onClick={() => this.onClickHandler(2, "image")}
          >
            Upload
          </button>
        </form>

        <form id="3" className={classes.Form} onSubmit={this.handleSubmit}>
          <img src={window.location.origin + "/img.png"} />
          <h3>Please upload Ebook IMG</h3>
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            class="btn btn-success btn-block"
            onClick={() => this.onClickHandler(3, "ebook")}
          >
            Upload
          </button>
        </form>

        <form id="4" className={classes.Form} onSubmit={this.handleSubmit}>
          <img src={window.location.origin + "/pdf.png"} />
          <h3>Please upload eBook PDF</h3>
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            class="btn btn-success btn-block"
            onClick={() => this.onClickHandlerEbook(4)}
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}
export default UploadImages;
