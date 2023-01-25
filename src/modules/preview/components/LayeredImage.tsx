const LayeredImage = ({ layers, containerClassNames }: any) => {

  //---------------
  // const options = ['black' , 'blue', 'red', 'yellow'];
  // const defaultOption = options[0];
  return (
    <div className={containerClassNames}
      style={{
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // transform: "translateY(-50%)",
        // overflow: "hidden",
        // backgroundColor: "red"
      }}>
        {
          layers.map((layer: any, index: any) => {
            console.log("layer:", layer);
            return <div
              key={"layer-" + index}
              className="masking"
              style={{
                position: "absolute",
                zIndex: 300 + index,

                backgroundImage: `url('${layer.src}')`,
                backgroundColor: layer.backgroundColor,
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                mixBlendMode: "multiply",
                objectFit: "cover",

                WebkitMaskImage: `url('${layer.src}')`,
                maskImage: `url('${layer.src}')`,

                WebkitMaskSize: "cover",
                maskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}>
              <div style={{
                backgroundColor: layer.color,
                mixBlendMode: "multiply",
                width: "100%",
                height: "100%",
                backgroundSize: "cover"
              }}>
              </div>
            </div>
          })}
      </div>

    </div>

  );
}
export default LayeredImage;    