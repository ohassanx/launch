import React, { useState, useEffect } from "react";
import "./style.css";

const Launch = () => {
  const [launch, setLaunch] = useState([]);
  useEffect(() => {
    fetch(`https://launchlibrary.net/docs/1.4/api.html#launch`).then(
      (response) => console.log(response)
    );
  }, []);
};

export default Launch;
