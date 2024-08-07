import { CrownFilled } from "@ant-design/icons";
import { Result } from "antd";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="text-2xl font-bold">HomePage</div>
     
        <Result icon={<CrownFilled />} title="JSON WEB TOKEN (MERN)" />
    
    </>
  );
}

export default HomePage;
