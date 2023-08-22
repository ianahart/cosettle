import {Box} from "@chakra-ui/react";
import HeadingStack from "../HeadingStack";
import MenuLink from "./MenuLink";
import {AiOutlinePlus} from "react-icons/ai";

const Spaces = () => {
    return (
        <Box>
            <HeadingStack heading="Spaces" />
            <MenuLink
                to="/spaces/create"
                text="Create"
                icon={<AiOutlinePlus />}
            />
        </Box>
    )
}

export default Spaces;
