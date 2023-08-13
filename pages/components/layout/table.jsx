import { DataGrid, GridRow } from "@mui/x-data-grid";
import Api from "@/pages/services/api";
import React, { useState, useEffect } from "react";
import { useDispatch, Provider } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { getCookies } from "@/pages/services/cookie";
import componentslice from "@/pages/redux/slices/componentslice";
import { successToast, errorToast, warningToast } from "@/pages/services/toast";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { colors } from "@mui/material";

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === "") {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    []
  );
};

export default function DataTable({ components }) {
  const [updatedCell, setUpdatedCell] = useState({});
  const [snackbar, setSnackbar] = React.useState(null);
  const mutateRow = useFakeMutation();
  const dispatch = useDispatch();
  // let rows = components[0];
  console.log("components :", components);
  // components["editable"].map((key) => {
  //   console.log("key:", key);
  // });

  const editables = components["editables"];
  const querysets = components["querysets"];

  function getColor(params, field) {
    let bool;
    for (let i = 0; i < querysets.length; i++) {
      if (querysets[i].id === params.id) {
        bool = editables[i][`${field}`];
      }
    }
    const cellColor = bool ? "green" : "red";
    return <div style={{ color: cellColor }}>{params.value}</div>;
  }

  const columns = [
    { field: "id", headerName: "id", width: 100, editable: false },
    {
      field: "revision",
      headerName: "REVISION",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "revision");
      },
    },
    {
      field: "ID",
      headerName: "ID",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "ID");
      },
    },
    {
      field: "P_on_N_status_code",
      headerName: "P/N Status Code",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "P_on_N_status_code");
      },
    },
    {
      field: "fig_no",
      headerName: "Fig. No.",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "fig_no");
      },
    },
    {
      field: "item_no",
      headerName: "Item No.",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "item_no");
      },
    },
    {
      field: "module",
      headerName: "Module",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "module");
      },
    },
    {
      field: "level",
      headerName: "Level",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "level");
      },
    },
    {
      field: "code",
      headerName: "Code",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "code");
      },
    },
    {
      field: "parent_code",
      headerName: "Parent Code",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "parent_code");
      },
    },
    {
      field: "part_number",
      headerName: "Part Number",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "part_number");
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "description");
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "comment");
      },
    },
    {
      field: "sap_name",
      headerName: "SAP NAME",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "sap_name");
      },
    },
    {
      field: "unit_per_assy",
      headerName: "Units Per Assy",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "unit_per_assy");
      },
    },
    {
      field: "unit_per_end_item",
      headerName: "Units Per End Item",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "unit_per_end_item");
      },
    },
    {
      field: "corrected_units_per_end_item",
      headerName: "Corrected Units Per End Item",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "corrected_units_per_end_item");
      },
    },
    {
      field: "gg_qty",
      headerName: "GG QTY",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "gg_qty");
      },
    },
    {
      field: "srp",
      headerName: "SRP",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "srp");
      },
    },
    {
      field: "store_comment",
      headerName: "Store Comment",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "store_comment");
      },
    },
    {
      field: "assembly",
      headerName: "Assembly",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "assembly");
      },
    },
    {
      field: "standard_part",
      headerName: "Standard Part",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "standard_part");
      },
    },
    {
      field: "material",
      headerName: "Material",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "material");
      },
    },
    {
      field: "mfg_complexity_level",
      headerName: "Mfg. Complexity Level",
      width: 260,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "mfg_complexity_level");
      },
    },
    {
      field: "disassembled",
      headerName: "Disassembled",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "disassembled");
      },
    },
    {
      field: "supplying_or_manufacturing",
      headerName: "Supplying / Manufacturing ",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "supplying_or_manufacturing");
      },
    },
    {
      field: "internal_or_external_outsourcing",
      headerName: "Internal / External outsourcing",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "internal_or_external_outsourcing");
      },
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "vendor");
      },
    },
    {
      field: "joining",
      headerName: "Joining",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "joining");
      },
    },
    {
      field: "manufacturing_process",
      headerName: "Manufacturing Process",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "manufacturing_process");
      },
    },
    {
      field: "raw_material_form",
      headerName: "Raw Material Form",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "raw_material_form");
      },
    },
    {
      field: "function",
      headerName: "Function",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "function");
      },
    },
    {
      field: "qc_criteria",
      headerName: "QC Criteria",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "qc_criteria");
      },
    },
    {
      field: "manufacturing_priority",
      headerName: "Manufacturing Priority ",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "manufacturing_priority");
      },
    },
    {
      field: "manufacturing_responsible_department",
      headerName: "Manufacturing Responsible Department",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "manufacturing_responsible_department");
      },
    },
    {
      field: "designing_responsible_department",
      headerName: "Designing Responsible Department",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "designing_responsible_department");
      },
    },
    {
      field: "usage_on_other_engines",
      headerName: "USAGE ON OTHER ENGINES",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "usage_on_other_engines");
      },
    },
    {
      field: "manufacturing_parts_category",
      headerName: "MANUFACTURING PARTS Category",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "manufacturing_parts_category");
      },
    },
    {
      field: "scope_matrix_category",
      headerName: "Scope Matrix Category",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "scope_matrix_category");
      },
    },
    {
      field: "requires_manufacturing_or_supplying_for_reassembly",
      headerName: "Requires Manufacturing/Supplying For Re-Assembly",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(
          params,
          "requires_manufacturing_or_supplying_for_reassembly"
        );
      },
    },
    {
      field: "system_D_requirements",
      headerName: "System D. Requirement",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "system_D_requirements");
      },
    },
    {
      field: "percurment_state",
      headerName: "PERCURMENT STATE",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "percurment_state");
      },
    },
    {
      field: "details",
      headerName: "DETAILS",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "details");
      },
    },
    {
      field: "joint_type",
      headerName: "Joint Type",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "joint_type");
      },
    },
    {
      field: "discarded_during_disassembly",
      headerName: "DISCARDED DURING DISSASSEMBLY",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "discarded_during_disassembly");
      },
    },
    {
      field: "expendables",
      headerName: "Expendables",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "expendables");
      },
    },
    {
      field: "discarded_or_unusable_according_to_docs",
      headerName: "Discarded/Unusable According To Docs",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "discarded_or_unusable_according_to_docs");
      },
    },
    {
      field: "destroyed_for_analysis",
      headerName: "Destroyed For Analysis",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "destroyed_for_analysis");
      },
    },
    {
      field: "rejected_by_qc_or_inspection",
      headerName: "Rejected by QC/Inspection",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "rejected_by_qc_or_inspection");
      },
    },
    {
      field: "class_size_or_weight_as_required",
      headerName: "Class Size/Weight As Required",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "class_size_or_weight_as_required");
      },
    },
    {
      field: "EBOM",
      headerName: "EBOM",
      width: 130,
      editable: true,
      renderCell: (params) => {
        return getColor(params, "EBOM");
      },
    },
  ];

  // rows = newArray;
  // if (components.length > 0) {
  //   // const length = components.length
  //   const sortedComponents = [...components];
  //   sortedComponents.sort((a, b) => a.id - b.id);
  //   rows = sortedComponents;
  // } else {
  //   rows = components;
  // }

  const saveOnServer = React.useCallback(
    async (newRow) => {
      Api.init();
      const response = await Api.patch("components", `${newRow.id}/`, newRow);
      console.log("response : ", response.data.message);
      if (response.data.message === "success") {
        successToast("آپدیت شد");
      } else if (response.data.message === "type") {
        errorToast("لطفا عدد وارد نمایید");
      } else if (response.data.message === "permission") {
        warningToast("عدم دسترسی ادیت سلول");
      } else if (response.data.message === "anyAccess") {
        warningToast("شما دسترسی ادیت سلول های این ردیف را ندارید");
        window.location.reload();
      }
      return response.data.data[0];
    },
    [Api]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = (event) => {
    // console.log("test:", event);
    setTextFieldValue(event.target.value);
  };

  const [page, setPage] = useState(1);

  const handleInputClick = (e) => {
    const newPage = setPage(e); // calculate the new page value
    window.history.pushState(null, "", `?page=${e}`);
    window.location.reload();
  };

  function CustomRow(props) {
    console.log("props :", props);
    return <GridRow {...props} style={{ color: "red" }} />;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        // getRowId={(row) => row.props.children.id}
        // rows={components["querysets"].map((component) => (
        //   <p style={{ color: "red" }}>{component}</p>
        // ))}
        rows={components["querysets"]}
        columns={columns}
        // components={{
        //   Row: CustomRow,
        // }}
        processRowUpdate={(updatedRow, originalRow) =>
          saveOnServer(updatedRow, originalRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        hideFooter={true}
      />
      <br />

      <div className="flex items-center">
        {/* <Pagination count={1001} shape="rounded" onClick={onInput} /> */}
        {/* <Button variant="contained">1</Button> */}
        <TextField
          id="outlined-number"
          label="page"
          type="number"
          size="small"
          value={textFieldValue}
          onChange={handleTextFieldChange}
        />
        <Button
          variant="outlined"
          onClick={() => handleInputClick(textFieldValue)}
        >
          search
        </Button>
        {/* <Button variant="contained">{length}</Button> */}
      </div>
    </div>
  );
}
