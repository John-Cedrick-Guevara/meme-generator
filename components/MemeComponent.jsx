import React, { useEffect, useState } from "react";

const FormComponent = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMeme, setAllMeme] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));

    // console.log();
  }

  function handleChange() {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  const [Position, setPosition] = useState({
    TopTextleft: "",
    TopTexttop: "",
    TopTextsize: "",

    BottomTextSize: "",
    BottomTextBottom: "",
    BottomTextLeft: "",
  });

  function textPositioning(event) {
    const { name, value } = event.target;
    setPosition((prevSize) => ({
      ...prevSize,
      [name]: value,
    }));
  }

  const topStyle = {
    fontSize: Position.TopTextsize + "px",
    top: Position.TopTexttop + "px",
    left: Position.TopTextleft + "%",
  };



  const bottomStyle = {
    fontSize: Position.BottomTextSize + "px",
    bottom: Position.BottomTextBottom + "px",
    left: Position.BottomTextLeft + "%",
  };


  return (
    <>
      <section className="form">
        <div className="input-container">
          <input
            value={meme.topText}
            name="topText"
            placeholder="top - text"
            type="text"
            onChange={handleChange}
          />
          <input
            value={meme.bottomText}
            name="bottomText"
            placeholder="bottom - text"
            type="text"
            onChange={handleChange}
          />
        </div>

        <button onClick={getMemeImage}>Get a new meme image 🖼</button>

        <div className="meme-container">
          <img
            className="meme-image"
            src={meme.randomImage}
            alt="Source file cannot be accessed"
          />
          <h2 style={topStyle} className="topText Text">
            {meme.topText}
          </h2>
          <h2 style={bottomStyle} className="bottomText Text">
            {meme.bottomText}
          </h2>
        </div>

        <form action="">
          <div className="positioning top">
            <label htmlFor="top">top:</label>
            <input
              type="number"
              name="TopTexttop"
              value={Position.TopTexttop}
              onChange={textPositioning}
            />
            <label htmlFor="">left:</label>
            <input
              type="number"
              name="TopTextleft"
              value={Position.TopTextleft}
              onChange={textPositioning}
            />
            <label htmlFor="">font-size:</label>
            <input
              type="number"
              name="TopTextsize"
              value={Position.TopTextsize}
              onChange={textPositioning}
            />
          </div>

          <div className="positioning bottom">
            <label htmlFor="">bottom:</label>
            <input
              type="number"
              name="BottomTextBottom"
              value={Position.BottomTextBottom}
              onChange={textPositioning}
            />
            <label htmlFor="">left:</label>
            <input
              type="number"
              name="BottomTextLeft"
              value={Position.BottomTextLeft}
              onChange={textPositioning}
            />
            <label htmlFor="">font-size:</label>
            <input
              type="number"
              name="BottomTextSize"
              value={Position.BottomTextSize}
              onChange={textPositioning}
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default FormComponent;
