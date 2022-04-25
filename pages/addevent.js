import React from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import { datetime } from "../lib/date";

const validate = (values) => {
  const errors = {};
  const d1 = new Date(datetime);
  const d2 = new Date(values.date);
  if (!values.title) {
    errors.title = "this field is required";
  } else if (values.title.length < 10) {
    errors.title = "this field must be 10 characters or more";
  }

  if (!values.location) {
    errors.location = "this field is required";
  } else if (values.location.length < 5) {
    errors.location = "this field must be atleast 5 characters long";
  }

  if (!values.description) {
    errors.description = "this field is required";
  } else if (values.description.length < 20) {
    errors.description = "this field must atleast 20 characters";
  }

  if (!values.date) {
    errors.date = "this field is required";
  }

  if (d1 > d2) {
    errors.date = "cannot post past events, please select another date";
  }

  return errors;
};

const addevent = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      location: "",
      description: "",
      date: "",
    },
    validate,
    onSubmit: async (values) => {
      const event = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(values),
      });
      router.push("/");
    },
  });
  return (
    <>
      <h3 className="text-center mt-2 text-muted fw-light text-uppercase mt-4 pt-4">
        add an event
      </h3>
      <Form className="col-8 m-auto" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className=" text-muted">title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            className="fst-italic"
            placeholder="input the name of the event"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <Form.Text className=" text-danger">
              {formik.errors.title}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className=" text-muted">location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="input a place where the event will be held"
            className="fst-italic"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location ? (
            <Form.Text className=" text-danger">
              {formik.errors.location}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className=" text-muted">description</Form.Label>
          <Form.Control
            className="fst-italic"
            as="textarea"
            rows={4}
            placeholder="add a little description about this event"
            name="description"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <Form.Text className=" text-danger">
              {formik.errors.description}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className=" text-muted">date</Form.Label>
          <Form.Control
            type="datetime-local"
            placeholder="pleace input date of the event"
            name="date"
            {...formik.getFieldProps("date")}
          />
          {formik.touched.date && formik.errors.date ? (
            <Form.Text className=" text-danger">{formik.errors.date}</Form.Text>
          ) : null}
        </Form.Group>
        <div className="d-grid">
          <Button variant="outline-primary" type="submit">
            submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default addevent;
