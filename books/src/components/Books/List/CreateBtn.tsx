import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface CreateBtnProps {
  onClick?: () => void;
}
const CreateBtn: React.FC<CreateBtnProps> = () => {
  return (
    <Button
      href="/books/create"
      style={{ marginBottom: 20 }}
      variant="contained"
      color="primary"
      endIcon={<Add />}
    >
      Create
    </Button>
  );
};

export default CreateBtn;
