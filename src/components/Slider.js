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
  }, [currentImgIndex, isAutoPlay, allImages.length]);

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
      isAdd: false
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
  const saveImage = (e,url, index) => {
    let images = [...allImages];
    images[index].url = url;
    images[index].isAdd = true;
    setAllImages(images);
  }
  return (
    <div>
      <h1> Hello Slider! </h1>
      <section className={classes.wrapper}>
        <div className={classes.slideshow}>
          <div className={classes.slider}>
            {allImages.filter(key => key.isAdd ).map((key,index) => {
              if(index === currentImgIndex && key.isAdd ) {
              return( 
                <img key={index} src={key.url} alt={key.title} />
              )
              }
            })}
          </div>
          <div className={classes.arrows}>
            <i onClick={showPrevImage} aria-hidden="true">
              ❮
            </i>
            <i onClick={showNextImage} aria-hidden="true">
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
                  {(!key.isAdd && key.url !== "") &&
                  <button type = " button" onClick = {(e) => saveImage(e, key.url,ind)} className = {classes.addBtn}> Save Image </button> }
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
