import profileImage from "../images/defaultProfileImage.png"
import logo from "../images/logoMain.svg"

export const defaultProfile = (e:React.SyntheticEvent<HTMLImageElement>)=>{
    e.currentTarget.src = profileImage
}
export const defaultImage = (e:React.SyntheticEvent<HTMLImageElement>)=>{
    e.currentTarget.src = logo
}
