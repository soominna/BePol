import {
  CategoryContainer,
  CategoryBlock,
  CategoryIcon,
  CategoryTxt,
} from "./CategoryStyled";
export default function Category({ allCategory, clickedCategory }) {
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

  const handleClickedCategory = (e) => {
    clickedCategory.onClick(e.target.id);
  };
  return (
    <CategoryContainer>
      {allCategory.map((category, idx) => (
        <CategoryBlock onClick={handleClickedCategory}>
          <CategoryIcon>
            <img src={categoryImg[idx]} alt={category[idx]} />
          </CategoryIcon>
          <CategoryTxt>{category[idx]}</CategoryTxt>
        </CategoryBlock>
      ))}
    </CategoryContainer>
  );
}
