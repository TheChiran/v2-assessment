import styled from "@emotion/styled";
import { Card } from "@mui/material";

const CustomCard = ({ children }) => {
  return <CustomizedCard>{children}</CustomizedCard>;
};

const CustomizedCard = styled(Card)`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export default CustomCard;
