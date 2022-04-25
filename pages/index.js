import React  from "react";
import moment from "moment";


import Link from "next/link"
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "../lib/prisma";

import { ListGroup} from "react-bootstrap";

const index = ({ upcomingEvents}) => {
  
  
  return (
    <div>
      <h3 className="text-center fw-light fs-2 text-uppercase mt-4 pt-4">
        upcoming events
      </h3>

      <ListGroup as="ol" numbered>
        {upcomingEvents.length ? (
          upcomingEvents.map((i) => (
            <div key={i.id}>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-normal font-monospace">{i.title}</div>
                  <span className="fst-italic  text-secondary mark">
                    at {i.location}
                  </span>
                  {" | "}
                  <span className="small fw-bold font-monospace text-muted ">
                    {moment(new Date(i.date), "YYYYMMDDThhmmss").fromNow()}
                  </span>
                  {" | "}
                  <Link href={`/${i.id}`}>learn more</Link>
                </div>
              </ListGroup.Item>
            </div>
          ))
        ) : (
          <ListGroup.Item className="d-flex justify-content-start ">
            <div className="d-flex justify-content-between align-items-center py-2">
              <h4 className="me-5 text-muted">no events to show.</h4>{" "}
              <div>
                <Link href="/addevent" className="text-decoration-none">
                  add events
                </Link>{" "}
              </div>
            </div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export const getServerSideProps = async ({ context }) => {
  const  upcomingEvents= await prisma.event.findMany({
    where: { date: { gt: new Date() } },
  });

  return {
    props: { upcomingEvents: JSON.parse(JSON.stringify(upcomingEvents)) },
  };

  
};

export default index;
