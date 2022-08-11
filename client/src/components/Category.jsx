import { useState } from "react";
import {
  CategoryContainer,
  CategoryBlock,
  CategoryIcon,
  CategoryTxt,
} from "./CategoryStyled";
export default function Category(props) {
  const categoryImg = [
    "/images/lawIcon.png",
    "/images/moneyIcon.png",
    "/images/eduIcon.png",
    "/images/scienceIcon.png",
    "/images/worldIcon.png",
    "/images/adminIcon.png",
    "/images/artIcon.png",
    "/images/farmIcon.png",
    "/images/landIcon.png",
    "/images/firmIcon.png",
    "/images/healthIcon.png",
    "/images/peopleIcon.png",
    "/images/etcIcon.png",
  ];

  let colorArr = Array(13).fill("white");
  const [color, setColor] = useState(colorArr);
  const [targetId, setTargetId] = useState();
  const handleClickedCategory = (e) => {
    props.onClick(e.target.id);
  };

  const handleColorChange = (e) => {
    let currentId = Number(e.target.id);
    setTargetId(currentId);
    if (color[currentId] === "white") {
      colorArr[currentId] = "#414144";
      setColor(colorArr);
      console.log(color);
    } else {
      setColor("white");
    }
  };
  return (
    <CategoryContainer>
      {props.allCategory.map((category, idx) => (
        <CategoryBlock
          id={idx}
          onClick={(e) => {
            handleClickedCategory(e);
            handleColorChange(e);
          }}
        >
          <CategoryIcon
            id={idx}
            targetId={targetId}
            backgroundColor={color[idx]}
          >
            <img id={idx} src={categoryImg[idx]} alt={category[idx]} />
          </CategoryIcon>
          <CategoryTxt id={idx}>{category[idx]}</CategoryTxt>
        </CategoryBlock>
      ))}
    </CategoryContainer>
  );
}
