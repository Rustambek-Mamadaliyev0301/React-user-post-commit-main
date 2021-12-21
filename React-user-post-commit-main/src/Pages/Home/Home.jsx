import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../Home/Home.scss";
// Components

function Home() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const elBtn = useRef(1);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users?page=" + elBtn.current)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, [data]);

  return (
    <>
      <h2 className="heading-home">Home</h2>
      <div className="home_box">
        {loading && (
          <p>
            <>
              {/*?xml version="1.0" encoding="utf-8"?*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                  margin: "auto",
                  background: "#fff",
                  display: "block",
                  shapeRendering: "auto",
                }}
                width="100px"
                height="100px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid">
                <g>
                  <circle cx={60} cy={50} r={4} fill="#e4934b">
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      values="95;35"
                      keyTimes="0;1"
                      begin="-0.67s"
                    />
                    <animate
                      attributeName="fill-opacity"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0;1;1"
                      keyTimes="0;0.2;1"
                      begin="-0.67s"
                    />
                  </circle>
                  <circle cx={60} cy={50} r={4} fill="#fff">
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      values="95;35"
                      keyTimes="0;1"
                      begin="-0.33s"
                    />
                    <animate
                      attributeName="fill-opacity"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0;1;1"
                      keyTimes="0;0.2;1"
                      begin="-0.33s"
                    />
                  </circle>
                  <circle cx={60} cy={50} r={4} fill="#e4934b">
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      values="95;35"
                      keyTimes="0;1"
                      begin="0s"
                    />
                    <animate
                      attributeName="fill-opacity"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0;1;1"
                      keyTimes="0;0.2;1"
                      begin="0s"
                    />
                  </circle>
                </g>
                <g transform="translate(-15 0)">
                  <path
                    d="M50 50L20 50A30 30 0 0 0 80 50Z"
                    fill="#df1317"
                    transform="rotate(90 50 50)"
                  />
                  <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#df1317">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 50 50;45 50 50;0 50 50"
                      keyTimes="0;0.5;1"
                    />
                  </path>
                  <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#df1317">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 50 50;-45 50 50;0 50 50"
                      keyTimes="0;0.5;1"
                    />
                  </path>
                </g>
                {/* [ldio] generated by https://loading.io/ */}
              </svg>
            </>
          </p>
        )}
        {data.length > 0 &&
          data.map((row) => (
            <li key={row.id}>
              <Link to={`/profile/${row.id}`}>
                {row.id + ") " + row.first_name + " " + row.last_name}
              </Link>

              <div className="user_data ">
                <img
                  src={row.avatar}
                  alt={row.first_name + " " + row.last_name + "image"}
                  width={100}
                  height={100}
                />

                <button
                  className="btn_delete"
                  type="button"
                  style={{ display: "block" }}
                  onClick={() => {
                    fetch("https://reqres.in/api/users/" + row.id, {
                      method: "DELETE",
                    }).then((response) => {
                      if (response.status === 204) {
                        const filteredUsers = data.filter(
                          (user) => user.id !== row.id
                        );

                        setData([...filteredUsers]);
                      }
                    });
                  }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
      </div>
      <div className="page_box_btn">
        <button
          className="page_btn"
          onClick={() => {
            elBtn.current--;
            setData(data);
            setLoading(false);
          }}>
          Prev
        </button>
        <button
          className="page_btn"
          onClick={() => {
            elBtn.current++;
            setData(data);
            setLoading(false);
          }}>
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
