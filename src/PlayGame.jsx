import React, { useState } from "react";
import PlayingCard from "./PlayingCard";
import { Modal, Space, Card, Button, Alert, Spin } from "antd";

export default function PlayGame({ setPlay, islogin, user, setUser }) {
  const [random_no, setRandomNo] = useState(["3", "3", "3"]);
  const [message, setMessage] = useState("Playing with casino ...");
  const [isloading, setLoading] = useState(false);

  const spinHandler = () => {
    setMessage("Please wait...");
    if (parseFloat(user.price) < 2) {
      alert("You dont have sufficient balance");
      setMessage("You dont have sufficient balance");
      return;
    }
    if (!isloading) {
      setLoading(true);
      console.log(Math.floor((Math.random() * 10) / 3));
      const randno = [];
      for (let i = 0; i < 3; i++) {
        randno.push(Math.floor((Math.random() * 10) / 3).toString());
      }
      let result = "0";
      if (randno[0] == "3" && randno[1] == "3" && randno[2] == "3") {
        console.log("you won 5& ");
        setMessage("Congratulation you won 5$ ");
        result = "5";
      } else {
        if (randno[0] == randno[1] && randno[1] == randno[2]) {
          console.log("all are equal");
          setMessage("Congratulation you won 2$");
          result = "2";
        } else {
          if (
            randno[0] == randno[1] ||
            randno[1] == randno[2] ||
            randno[2] == randno[0]
          ) {
            console.log("any two are equals");
            setMessage("Congratulation you won 0.5$ ");
            result = "0.5";
          } else {
            console.log("you losses sorry");
            setMessage("Sorry You loss ");
          }
        }
      }

      setTimeout(() => {
        if (islogin) {
          const total_price =
            parseFloat(user.price) - parseFloat("2.00") + parseFloat(result);
          setUser((preval) => ({ ...preval, price: total_price.toFixed(2) }));
          localStorage.setItem(
            user.id,
            user.password + "=" + user.name + "=" + total_price.toFixed(2)
          );
          const history = localStorage.getItem(user.id + "-history");
          if (history) {
            localStorage.setItem(
              user.id + "-history",
              history +
              randno[0] +
              "-" +
              randno[1] +
              "-" +
              randno[2] +
              "-" +
              new Date() +
              "="
            );
          } else {
            localStorage.setItem(
              user.id + "-history",
              randno[0] +
              "-" +
              randno[1] +
              "-" +
              randno[2] +
              "-" +
              new Date() +
              "="
            );
          }
        }
        setRandomNo(randno);
        console.log("result:", result);
        setLoading(false);
      }, 2000);

      console.log(randno);
    }
  };

  return (
    <Modal
      footer={null}
      onCancel={() => {
        setPlay(false);
      }}
      visible={true}
      bodyStyle={{
        padding: "0px",
        margin: "0px",
        textAlign: "center",
        backgroundColor: "blue",
      }}
      closable={false}
      style={{
        padding: "0px",
        width: "700px",
      }}
      maskClosable={false}
      width="700px"
    >
      <Card
        style={{
          backgroundImage: 'linear-gradient(to right bottom, #6E2C00,#000000 , black)',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
        headStyle={{ border: "none" }}
        title={
          <div className="d-block">
            <h4 className="">
              <span
                className=" p-1 px-4 ant-card-hoverable  rounded border  rounded-pill  text-white"
                style={{
                  backgroundImage: "linear-gradient(to right, #6E2C00,#000000 , black)",
                  color: "white",
                }}
              >
                {isloading ? "Please wait..." : message}
              </span>
            </h4>
            <span style={{ fontSize: "40px", color: "white" }}>
              ${user.price || "00.00"}
            </span>
          </div>
          // <div >
          //   <Alert
          //     message={isloading ? "Please wait..." : message}
          //     type="success"
          //     size="large"
          //     showIcon
          //     closable
          //   />
          //   <span style={{ fontSize: "40px", color: "white" }}>
          //     ${user.price || "00.00"}
          //   </span>
          // </div>
        }
      >
        <div>
          <Space>
            <Spin spinning={isloading} size="large">
              <PlayingCard option={random_no[0]} size="large" />
            </Spin>
            <Spin spinning={isloading}>
              <PlayingCard option={random_no[1]} size="large" />
            </Spin>
            <Spin spinning={isloading}>
              <PlayingCard option={random_no[2]} size="large" />
            </Spin>
          </Space>
          <h6 className="text-white mt-4 ">
            <b style={{ color: "white " }}>Note: </b>
            <i style={{ color: "white" }}>Each spin costs $2 from your balance</i>
          </h6>
          <div className="d-flex justify-content-around mt-3">
            {" "}
            <Button
              size="large"
              shape="round"
              className="ant-card-hoverable border-0"
              style={{
                backgroundImage: "linear-gradient(to right, #6E2C00,#000000 , black)",
                height: "50px",
                width: "150px",
              }}
              onClick={() => {
                console.log("clicked");
                spinHandler();
              }}
            >
              <h6 style={{ fontSize: "24px", color: "white" }}>Spin</h6>
            </Button>
            <Button
              size="large"
              shape="round"
              className="ant-card-hoverable border-0"
              style={{
                backgroundImage: "linear-gradient(to right, #6E2C00,#000000 , black)",
                height: "50px",
                width: "200px",
              }}
              onClick={() => {
                console.log("clicked");
                setRandomNo(["3", "3", "3"]);
              }}
            >
              <h6 style={{ fontSize: "24px", color: "white" }}>Reset</h6>
            </Button>
            <Button
              size="large"
              shape="round"
              className="ant-card-hoverable border-0"
              style={{
                backgroundImage: "linear-gradient(to right, #6E2C00,#000000 , black)",
                height: "50px",
                width: "150px",
              }}
              onClick={() => {
                console.log("clicked");
                setPlay(false);
              }}
            >
              <h6 style={{ fontSize: "24px", color: "white" }}>Cancel</h6>
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
}
