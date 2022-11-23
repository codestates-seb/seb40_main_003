import {
    CategoryButton,
    CategoryWrapper
} from "../../Components/GlobalComponents";
import {
    MainCenterWrapper,
    MainContentContainer,
    MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";


const ProductCategory = () => {
    usePageTitle("거래 카테고리")
    return(
        <MainContentContainer>
        <MainCenterWrapper>
            <CategoryWrapper>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
            </CategoryWrapper>
        </MainCenterWrapper>

        <MainRightWrapper>
        </MainRightWrapper>
        </MainContentContainer>
    ) 
};

export default ProductCategory;
