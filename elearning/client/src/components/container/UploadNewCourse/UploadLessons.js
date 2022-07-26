import React, { Component } from "react";
import axios from "axios";
import classes from "./UploadNewCourse.module.css";
import { getPath, getBrand } from "../../../util/getPath";

class UploadLessons extends Component {
  constructor() {
    super();
    this.state = {
      course: 2,
      lessonId: 1,
      lessonOrder: 0,
      selectedFile: null,
      loaded: false,

      formControls: {
        video_title: {
          value: "",
        },
      },
    };
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: value,
      },
    });
  };

  onChangeHandler = (event) => {
    let file = event.target.files[0];
    console.log(file);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: false,
    });
  };

  onClickHandler = (lessonID) => {
    var element = document.getElementById(lessonID);
    element.classList.add("loading");

    const data = new FormData();
    const json = JSON.stringify(this.state.formControls);
    data.append("file", this.state.selectedFile);
    axios
      .post(`${getPath()}admin/upload/${lessonID}`, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        axios.post(`${getPath()}admin/upload/${lessonID}`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // then print response status
        console.log(res.statusText);
        element.classList.remove("loading");
        element.classList.add("valid");
      });
  };
  render() {
    let loaded = this.state.loaded;

    return (
      <div>
        <form id="1" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 1</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(1)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="2" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 2</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(2)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="3" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 3</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(3)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="4" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 4</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(4)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="5" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 5</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(5)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="6" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 6</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(6)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="7" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 7</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(7)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="8" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 8</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(8)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="9" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 9</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(9)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="10" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 10</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(10)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="11" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 11</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(11)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="12" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 12</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(12)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="13" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 13</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(13)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="14" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 14</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(14)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="15" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 15</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(15)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="16" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 16</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(16)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="17" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 17</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(17)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="18" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 18</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(18)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="19" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 19</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(19)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>

        <form id="20" className={classes.Form} onSubmit={this.handleSubmit}>
          <h3>Video Lesson 20</h3>
          <input
            type="text"
            name="video_title"
            // value={this.state.formControls.video_title.value}
            onChange={this.changeHandler}
            placeholder="Title"
          />
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => this.onClickHandler(20)}
          >
            Upload
          </button>
          <img class="loader" src={window.location.origin + "/loader.gif"} />
        </form>
      </div>
    );
  }
}
export default UploadLessons;
