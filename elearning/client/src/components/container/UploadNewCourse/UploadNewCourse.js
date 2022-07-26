import React, { Component } from "react";
import classes from "./UploadNewCourse.module.css";
import "./util.css";
import UploadLessons from "./UploadLessons";
import UploadImages from "./UploadImages";
import { getPath, getBrand } from "../../../util/getPath";

class UploadNewCourse extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,

      formControls: {
        title: {
          value: "",
        },
        category: {
          value: "",
        },
        summary_title: {
          value: "",
        },
        summary: {
          value: "",
        },
        summary_list_title: {
          value: "",
        },
        summary_list: {
          value: "",
        },
        product_summary_title: {
          value: "",
        },
        product_summary: {
          value: "",
        },
        ebook_title: {
          value: "",
        },
      },
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${getPath()}admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formControls),
    }).then(
      this.setState({
        step: 2,
      })
    );
  };

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

  handleLastStep = () => {
    this.setState({
      step: 3,
    });
  };

  handleFinish = () => {
    this.setState({
      step: 4,
    });
  };

  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
  };

  render() {
    let step = this.state.step;

    return (
      <div>
        <h1>Step: {this.state.step}</h1>
        {step == 1 ? (
          <form className={classes.Form} onSubmit={this.handleSubmit}>
            <label>Title</label>
            <input
              required
              type="text"
              name="title"
              value={this.state.formControls.title.value}
              onChange={this.changeHandler}
              placeholder="Title"
            />
            <label>Category</label>
            <select
              name="category"
              value={this.state.formControls.category.value}
              onChange={this.changeHandler}
            >
              <option value="Marketing">Marketing</option>
              <option value="Mind &amp; Body">Mind &amp; Body</option>
              <option value="Business">Business</option>
              <option value="Health &amp; Beauty">Health &amp; Beauty</option>
              <option value="Home &amp; Garden">Home &amp; Garden</option>
              <option value="Personal Finance">Personal Finance</option>
              <option value="Recipes &amp; Cooking">
                Recipes &amp; Cooking
              </option>
              <option value="Relationships">Relationships</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
            </select>

            <label>Summary title</label>
            <input
              required
              type="text"
              name="summary_title"
              value={this.state.formControls.summary_title.value}
              onChange={this.changeHandler}
              placeholder="Summary title"
            />
            <label>Summary</label>
            <textarea
              required
              type="textarea"
              name="summary"
              value={this.state.formControls.summary.value}
              onChange={this.changeHandler}
              placeholder="Summary"
            />
            <label>Summary List Title</label>
            <input
              required
              type="text"
              name="summary_list_title"
              value={this.state.formControls.summary_list_title.value}
              onChange={this.changeHandler}
              placeholder="Summary List Title"
            />
            <label>Summary List</label>
            <textarea
              required
              type="textarea"
              name="summary_list"
              value={this.state.formControls.summary_list.value}
              onChange={this.changeHandler}
              placeholder="Summary List"
            />
            <label>Product Summary Title</label>
            <input
              required
              type="text"
              name="product_summary_title"
              value={this.state.formControls.product_summary_title.value}
              onChange={this.changeHandler}
              placeholder="Product Summary Title"
            />
            <label>Product Summary</label>
            <textarea
              required
              type="textarea"
              name="product_summary"
              value={this.state.formControls.product_summary.value}
              onChange={this.changeHandler}
              placeholder="Product Summary"
            />
            <label>eBook Title</label>
            <input
              required
              type="text"
              name="ebook_title"
              value={this.state.formControls.ebook_title.value}
              onChange={this.changeHandler}
              placeholder="eBook Title"
            />
            <button type="submit">Submit</button>
          </form>
        ) : step == 2 ? (
          <div>
            <button className={classes.Button} onClick={this.handleLastStep}>
              Done uploading
            </button>
            <UploadLessons />
          </div>
        ) : step == 3 ? (
          <div>
            <button className={classes.Button} onClick={this.handleFinish}>
              Done uploading
            </button>
            <UploadImages />
          </div>
        ) : (
          <div className={classes.LastScreen}>
            <h1>Done</h1>
            <img
              className={classes.Check}
              src={window.location.origin + "/check.png"}
            />
            <a href="/admin">Upload new Course</a>
          </div>
        )}
      </div>
    );
  }
}

export default UploadNewCourse;
