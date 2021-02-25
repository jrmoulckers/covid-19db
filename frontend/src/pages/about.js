import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import ProjectInfo from "./../components/projectInfo";
import "../styling/about.css";

const GITLAB_API_BASE = "https://gitlab.com/api/v4";
const REPO_ID = "21269899";

const GROUP_MEMBERS = [
  {
    name: "Shrivu Shankar",
    gitlab: "sshh12",
    role: "Full Stack Developer",
    bio: "Junior Computer Science Major from Houston, TX",
    url: "https://www.linkedin.com/in/shrivushankar/",
    unitTests: 8,
  },
  {
    name: "Cameron Doggett",
    gitlab: "camd99",
    role: "Back-end Developer",
    bio: "Junior Computer Science Major from Katy, TX",
    unitTests: 34,
    url: "https://www.linkedin.com/in/cameron-doggett-186761164/",
  },
  {
    name: "Yash Kakodkar",
    gitlab: "YashKakodkar",
    role: "Full Stack Developer",
    bio: "Junior Computer Science Major from Katy, TX",
    unitTests: 5,
    url: "https://www.linkedin.com/in/yashkakodkar/",
  },
  {
    name: "Jeffrey Moulckers",
    gitlab: "jrmoulckers",
    role: "Full Stack Developer",
    bio: "Junior Computer Science/Spanish Dual Major from Austin, TX",
    lead: true,
    unitTests: 0,
    url: "https://www.linkedin.com/in/jeffreymoulckers/",
  },
  {
    name: "Vassi Gianitsos",
    gitlab: "vassi_gianitsos",
    role: "Front-end Developer",
    bio: "Senior Computer Science Major from Flower Mound, TX",
    unitTests: 17,
    url: "https://www.linkedin.com/in/vassi-gianitsos-a3881b167/",
  },
];

const TOOLS = [
  {
    name: "React",
    url: "https://reactjs.org/",
    desc: "For creating interactive UIs in JSX.",
    logo: "/icons/react.png",
  },
  {
    name: "Antd",
    url: "https://ant.design/",
    desc: "A React UI library for clean composable components.",
    logo: "/icons/antd.png",
  },
  {
    name: "Nivo",
    url: "https://nivo.rocks/",
    desc: "A React UI library for animated and interactive charts.",
    logo: "/icons/nivo.png",
  },
  {
    name: "Jest",
    url: "https://jestjs.io/",
    desc: "A JavaScript testing framework.",
    logo: "/icons/jest.jpg",
  },
  {
    name: "Axios",
    url: "https://github.com/axios/axios",
    desc: "For doing browser-side HTTP requests to our API.",
    logo: "/icons/axios.png",
  },
  {
    name: "Flask",
    url: "https://flask.palletsprojects.com/en/1.1.x/",
    desc: "For serving our API data in a RESTful way.",
    logo: "/icons/flask.png",
  },
  {
    name: "SQLAlchemy",
    url: "https://www.sqlalchemy.org/",
    desc: "A Python ORM for creating and interacting with our SQL models.",
    logo: "/icons/sqla.png",
  },
  {
    name: "GCP",
    url: "https://cloud.google.com",
    desc: "For hosting our site on the cloud.",
    logo: "/icons/gcp.png",
  },
  {
    name: "Postman",
    url: "https://www.postman.com",
    desc: "For building and testing API's.",
    logo: "/icons/postman.png",
  },
  {
    name: "GitLab",
    url: "https://gitlab.com/explore",
    desc:
      "DevOps tool for issue-tracking, continuous integration, testing, and deployment.",
    logo: "/icons/gitlab.png",
  },
  {
    name: "Selenium",
    url: "https://www.selenium.dev/",
    desc: "For end-to-end automated GUI testing.",
    logo: "/icons/selenium.png",
  },
];

const DATA_SOURCES = [
  {
    name: "COVID-19 API",
    url: "https://api.covid19api.com",
  },
  {
    name: "REST Countries",
    url: "https://restcountries.eu",
  },
  {
    name: "NewsAPI",
    url: "https://newsapi.org",
  },
  {
    name: "OWID COVID-19 Dataset",
    url: "https://covid.ourworldindata.org/data/owid-covid-data.json",
  },
];

export default function About() {
  let [issues, setIssues] = useState([]);
  let [commits, setCommits] = useState([]);
  useEffect(() => {
    fetch(`${GITLAB_API_BASE}/projects/${REPO_ID}/issues?state=closed`)
      .then((resp) => resp.json())
      .then((issues) => setIssues(issues));
    fetch(
      `${GITLAB_API_BASE}/projects/${REPO_ID}/repository/commits?all=true&per_page=1000`
    )
      .then((resp) => resp.json())
      .then((commits) => setCommits(commits));
  }, []);
  let totalUnitTests = GROUP_MEMBERS.reduce(
    (acc, person) => acc + person.unitTests,
    0
  );
  let loaded = issues.length > 0 && commits.length > 0;

  const memberCardGroup = (
    <div>
      {GROUP_MEMBERS.map((person) => {
        let personIssues = issues.filter((issue) =>
          issue.assignees.find((assignee) => assignee.username == person.gitlab)
        );
        let personCommits = commits.filter(
          (commit) => commit.author_name == person.name
        );
        return (
          <Card
            key={person.name}
            style={{
              margin: "10px",
              width: "22rem",
              display: "inline-block",
            }}
          >
            <a href={person.url}>
              <Card.Img variant="top" src={`/imgs/${person.gitlab}.jpg`} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href={person.url} className="hyperlink">
                  {person.name}
                </a>
              </Card.Title>
              <Card.Text>
                {person.bio}
                <hr />
                <b>Role</b> {person.role} {person.lead && <b>(Team Lead)</b>}
                <hr />
                {loaded ? (
                  <>
                    <b>Commits</b> {personCommits.length} | <b>Issues</b>{" "}
                    {personIssues.length} | <b>Unit Tests</b> {person.unitTests}
                  </>
                ) : (
                  <Spinner animation="border" variant="primary" />
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="App">
      <div className="about-page-header">
        <div className="about-page-header-content">
          <h1 className="about-page-title">About</h1>
          <div className="about-page-description">
            Our COVID-19 Database site allows users to gather quick statistics
            on the coronavirus in terms of country, cases, and potential risks.
            This website is intended for those susceptible to contracting the
            virus (that means you!), and our aim is to keep users informed about
            the coronavirus. Integrating disparate data sets allows us to form a
            broad overview of how countries have handled the COVID-19 pandemic,
            present some of the unique risks each country's population faces,
            and possibly indicate the near future trajectory of the pandemic.
          </div>
        </div>
      </div>

      <hr />
      <ProjectInfo tools={TOOLS} dataSources={DATA_SOURCES} />
      <hr />
      <div style={{ marginTop: "18px", paddingBottom: "18px" }}>
        <h4>GitLab Statistics</h4>
        {loaded ? (
          <>
            <b>Commits</b> {commits.length} | <b>Issues</b> {issues.length} |{" "}
            <b>Unit Tests</b> {totalUnitTests}
          </>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
        <br />
        <a href="https://gitlab.com/jrmoulckers/covid19db-net">
          <img src="/icons/gitlab.png" width={"100rem"} height={"100rem"} />
        </a>
        <br />
        <a href="https://documenter.getpostman.com/view/12799044/TVKJxuP4">
          <img src="/icons/postman.png" width={"100rem"} height={"100rem"} />
        </a>
      </div>
      <hr />
      {memberCardGroup}
    </div>
  );
}
