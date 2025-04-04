import { observer } from "mobx-react-lite";
import SpacerPropType from "./SpacerPropType";

const Spacer: React.FC<SpacerPropType> = observer((props: SpacerPropType) => {
  const {
    flex = 0,
    width = 0,
    height = 0
  } = props

  const style: React.CSSProperties = {
  }

  if (flex > 0) {
    style.flex = flex
  }

  else if (width > 0) {
    style.width = width
  }

  else if (height > 0) {
    style.height = height
  }
  
  

  return <div style={style} />
})

export default Spacer