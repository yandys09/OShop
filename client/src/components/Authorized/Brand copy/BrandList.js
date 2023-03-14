import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  resetMutationResult,
  selectAllBrands,
  selectBrandMutationResult,
} from "../../../redux/features/brandSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import BoxShadowLoader from "../../Skeletons/BoxShadowLoader";
import { deleteBrand } from "../../../redux/features/brandSlice";

const BrandList = () => {
  const dispatch = useDispatch();
  const { loading, brands } = useSelector(selectAllBrands);
  const { success } = useSelector(selectBrandMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteBrand({ id, toast }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Brands",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "gridHeader",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "gridHeader",
      flex: 0.5,
      minWidth: 80,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/authorized/brand/${params.row.id}`}>
              <Tooltip title="Edit" placement="top">
                <EditIcon
                  sx={{ width: "20px", height: "20px", color: "#1976d2" }}
                />
              </Tooltip>
            </Link>
            <Tooltip title="Delete" placement="top">
              <IconButton
                color="error"
                component="span"
                onClick={() => deleteHandler(params.row.id)}
              >
                <DeleteForeeverIcon sx={{ width: "20px", height: "20px" }} />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const rows = [];
  brands &&
    brands.forEach((brand) => {
      rows.push({
        id: brand._id,
        title: brand.title,
        description: brand.description,
      });
    });
  useEffect(
    (success) => {
      if (success) {
        dispatch(resetMutationResult());
      }
      dispatch(getBrands({ toast }));
    },
    [dispatch, success]
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "15px",
        textAlign: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Full list of brands
      </Typography>
      {loading ? (
        <BoxShadowLoader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight
        />
      )}
    </Box>
  );
};

export default BrandList;
