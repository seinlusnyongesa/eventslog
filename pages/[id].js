import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { prisma } from "../lib/prisma";
import moment from "moment";
import { useRouter } from "next/router";

const index = ({ data }) => {
  const router = useRouter();
  const { id, title, location, date, description } = data;
  async function handleDelete() {
    const res = await fetch(`/api/hello`, {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    const response = await res;
    console.log(await response);
    router.replace("/");
    return;
  }

  return (
    <div>
      <Row>
        <Col className="col-md-6 m-auto bg-light">
          <div className="d-flex pt-5 justify-content-between ">
            <h2 className="fw-light fs-2 font-monospace ">{title}</h2>
            <Button onClick={handleDelete}>delete</Button>
          </div>

          <p className="mb-3  text-muted">
            <strong className="text-decoration-underline ">{location}</strong>{" "}
            {" | "}{" "}
            <strong className="text-decoration-underline">
              {moment(date).format("llll")}
            </strong>
          </p>
          <p className="fs-5">{description}</p>
        </Col>
      </Row>
    </div>
  );
};
export async function getServerSideProps(context) {
  const id = parseInt(context.params.id);
  const res = await await prisma.$queryRaw`
  select id, title,location, description,date from event
  where id = ${id}
  `;
  const data = res[0];
  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

// export async function getStaticPaths() {
//   const res = await await prisma.$queryRaw`
//     select id from event
//     `;

//   const paths = res.map((r) => ({
//     params: { id: r.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }
export default index;
