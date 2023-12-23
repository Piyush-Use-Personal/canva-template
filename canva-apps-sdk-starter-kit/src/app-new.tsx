<TabContainer container='' activeTab={activeTab}>
<div className="tabs">
  <Tab
    id="textTab"
    active
    title="Text Animations"
    onClick={() => handleTabChange("textTab")}
  />
  <Tab
    active={false}
    id="motionTab"
    title="Motion Animations"
    onClick={() => handleTabChange("motionTab")}
  />
</div>

<TabPanel id="textTab" active={activeTab === "textTab"}>
  <div id="previewBox">

    <FormField
      control={function noRefCheck(){}}
      description="FormField with a TextInput component as the control"
      label="TextInput"
    />
    {/* <Text
      value={text}
      onChange={handleTextChange}
      fontFamily={fontFamily}
      color={textColor}
      bold={bold}
      hollow={hollow}
    /> */}
  </div>
  <div className="controls">
    <Select
      options={
        [
          /* Populate font options dynamically */
        ]
      }
      onChange={handleFontChange}
    />
    <ColorPicker value={textColor} onChange={handleColorChange} />
    <Button variant="primary" onClick={handleBoldToggle}>
      Bold
    </Button>
    <Button
    variant="primary"
      onClick={handleHollowToggle}
    >
      Hollow
    </Button>
  </div>
  {/* <Slider id="textAnimations" /> */}
</TabPanel>

<TabPanel id="motionTab" active={activeTab === "motionTab"}>
  <div id="imageBox">
    {uploadedImage ? (
      <Image src={uploadedImage} alt="Uploaded Image" />
    ) : (
      <span>Upload an image to animate</span>
    )}
  </div>
  <Upload onChange={handleImageUpload} accept="image/*" />
  {/* <Slider id="motionAnimations" /> */}
</TabPanel>
</TabContainer>