import { Button, FormControl, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dropdown from "./Dropdown";
import searchConfig from "./../../mock/searchConfig.json";
import products from "./../../mock/products.json";
import { useState } from "react";
import makeFilter from "../../hooks/useFilter";
import CardProduct from "./Card";
const Product = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [priceFrom, setPriceFrom] = useState(undefined);
  const [priceTo, setPriceTo] = useState(undefined);
  const [filter, setFilter] = useState([]);
  const [productSearch, setProductSearch] = useState([]);

  const handleSearch = () => {
    let data = [];
    if (
      priceFrom &&
      priceTo &&
      priceFrom > 0 &&
      priceTo > 0 &&
      priceFrom < priceTo
    ) {
      data = makeFilter(
        [...products.products],
        filter,
        inputSearch,
        priceFrom,
        priceTo
      );
    } else {
      data = makeFilter(products.products, filter, inputSearch);
    }
    setProductSearch(data);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: "100vh" }}>
        <h1>Tìm kiếm sản phẩm</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-error"
                label=""
                fullWidth
                placeholder="Nhập thông tin sản phẩm cần tìm"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Dropdown list={searchConfig.config} setFilter={setFilter} />
          </Grid>
        </Grid>
        <h2>Khoảng giá (Nếu có)</h2>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                value={priceFrom}
                onChange={(e) => setPriceFrom(parseInt(e.target.value))}
                id="price-from"
                label=""
                fullWidth
                placeholder="Từ"
                type={"number"}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                onChange={(e) => setPriceTo(parseInt(e.target.value))}
                value={priceTo}
                id="price-to"
                label=""
                fullWidth
                placeholder="Đến"
                type={"number"}

              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{ height: "56px" }}
              fullWidth
              variant="outlined"
              onClick={() => handleSearch()}
            >
              Tìm kiếm
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: "16px 0 0 0" }}>
          {productSearch.map((product) => (
            <Grid item xs={3}>
              <CardProduct product={product} key={product.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Product;
