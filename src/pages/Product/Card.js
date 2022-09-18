import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardProduct({ product }) {
  console.log(product);
  const handleButtonOrder = ({
    inventory_quantity,
    inventory_policy,
    inventory_management,
  }) => {
    if (
      !inventory_management ||
      inventory_quantity > 0 ||
      inventory_policy === "allow"
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          Đặt hàng
        </Button>
      );
    }
    if (inventory_quantity <= 0 && inventory_policy === "deny") {
      return (
        <Button variant="outlined" color="error" sx={{ cursor: "not-allowed" }}>
          Không thể đặt hàng
        </Button>
      );
    }
  };
  return (
    <Card sx={{  }}>
      <CardMedia
        component="img"
        height="140"
        src={product?.image?.src}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Mã sản phẩm: {product?.id}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Tên sản phẩm: {product?.title}
        </Typography>
        <Typography variant="body2" color="text.error" sx={{textDecoration: "line-through", color: "red"}}>
          Giá gốc: {product?.variants[0]?.compare_at_price} VND
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Giá khuyến mãi: {product?.variants[0]?.price} VND
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sản phẩm được giảm:{" "}
          {(
            ((parseInt(product?.variants[0]?.price) /
              parseInt(product?.variants[0]?.compare_at_price)) || 0) *
            100
          ).toFixed(2)}
          %
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Số lượng hàng còn lại: {product?.variants[0]?.inventory_quantity || 0}
        </Typography>
      </CardContent>
      <CardActions>{handleButtonOrder(product?.variants[0])}</CardActions>
    </Card>
  );
}
