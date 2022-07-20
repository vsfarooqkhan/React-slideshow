import React from "react";
import classes from "./Slider.module.css";
var images = require("./Config.json");
const Slider = () => {
  const [allImages, setAllImages] = React.useState(images.images);
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  const [isAutoPlay, setIsAutoPlay] = React.useState(true);
  const [isShowSettings, setIsShowSettings] = React.useState(false);
  //Handle autoplay
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentImgIndex >= allImages.length - 1) {
        setCurrentImgIndex((prevInd) => 0);
      } else {
        setCurrentImgIndex((prevInd) => prevInd + 1);
      }
    }, 3000);
    if (!isAutoPlay) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [currentImgIndex, isAutoPlay]);

  //Handle previous Image
  const showPrevImage = () => {
    if (currentImgIndex > 0) {
      let ind = currentImgIndex - 1;
      setCurrentImgIndex(ind);
    } else {
      setCurrentImgIndex(allImages.length - 1);
    }
  };

  //Handle Next Image
  const showNextImage = () => {
    if (currentImgIndex < allImages.length - 1) {
      let ind = currentImgIndex + 1;
      setCurrentImgIndex(ind);
    } else {
      setCurrentImgIndex(0);
    }
  };

  // URL Input Handlers
  const changeUrl = (e, url, index) => {
    let images = [...allImages];
    images[index].url = e.target.value;
    setAllImages(images);
  };
  // AutoPlay Checkbox
  const handleAutoPlay = (e) => {
    setIsAutoPlay(!isAutoPlay);
  };
  // Add New Image Handler
  const addNewImage = (e) => {
    let images = [...allImages];
    images[allImages.length] = {
      url: "",
      title: "new",
    };
    setAllImages(images);
  };
  // Delete Image
  const removeImage = (e, url, index) => {
    let images = [...allImages];
    images.splice(index, 1);
    setAllImages(images);
  };
  const handleSettings = (e) => {
    setIsShowSettings(!isShowSettings);
  };
  return (
    <div>
      <h1> Hello Slider! </h1>
      <section className={classes.wrapper}>
        <div className={classes.slideshow}>
          <div className={classes.slider}>
            {allImages.map((key, index) => {
              return (
                index === currentImgIndex && (
                  <img key={index} src={key.url} alt={key.title} />
                )
              );
            })}
          </div>
          <div className={classes.arrows}>
            <i onClick={showPrevImage} id="Prev" aria-hidden="true">
              ❮
            </i>
            <i id="Next" onClick={showNextImage} aria-hidden="true">
              ❯
            </i>
          </div>
        </div>
      </section>
      <div>
        <button
          type="button"
          className={classes.addBtn}
          onClick={handleSettings}
        >
          {" "}
          {isShowSettings ? "Hide" : "Show"} Settings
        </button>
        {isShowSettings && (
          <>
            <h2> Settings </h2>
            <label htmlFor="AutoPlay"> AutoPlay : </label>
            <label className={classes.switch}>
              <input
                id="AutoPlay"
                type="checkbox"
                onClick={handleAutoPlay}
                defaultChecked={isAutoPlay}
              />
              <span className={classes.sliderround}></span>
            </label>
            <br />
            {allImages.map((key, ind) => {
              return (
                <div key={ind}>
                  <label htmlFor="url">Url {ind + 1} : </label>
                  <input
                    type="text"
                    onChange={(e) => changeUrl(e, key.url, ind)}
                    id="url"
                    value={key.url}
                  ></input>{" "}
                  <button
                    className={classes.deleteBtn}
                    onClick={(e) => removeImage(e, key.url, ind)}
                  >
                    Remove
                  </button>
                  <br />
                </div>
              );
            })}
            <button
              type="button"
              className={classes.addBtn}
              onClick={addNewImage}
            >
              {" "}
              + Add New Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Slider;
