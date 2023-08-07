import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import Api from "@/pages/services/api";
import React, { useState, useEffect } from "react";
import { useDispatch, Provider } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { getCookies } from "@/pages/services/cookie";
import componentslice from "@/pages/redux/slices/componentslice";
import { infoToast, successToast } from "@/pages/services/toast";

const columns = [
  { field: "id", headerName: "id", width: 70, editable: false },
  { field: "revision", headerName: "REVISION", width: 130, editable: true },
  { field: "ID", headerName: "ID", width: 130, editable: true },
  {
    field: "P_on_N_status_code",
    headerName: "P/N Status Code",
    width: 130,
    editable: true,
  },
  { field: "fig_no", headerName: "Fig. No.", width: 130, editable: true },
  { field: "item_no", headerName: "Item No.", width: 130, editable: true },
  { field: "module", headerName: "Module", width: 130, editable: true },
  { field: "level", headerName: "Level", width: 130, editable: true },
  { field: "code", headerName: "Code", width: 130, editable: true },
  {
    field: "parent_code",
    headerName: "Parent Code",
    width: 130,
    editable: true,
  },
  {
    field: "part_number",
    headerName: "Part Number",
    width: 130,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 130,
    editable: true,
  },
  { field: "comment", headerName: "Comment", width: 130, editable: true },
  { field: "sap_name", headerName: "SAP NAME", width: 130, editable: true },
  {
    field: "unit_per_assy",
    headerName: "Units Per Assy",
    width: 130,
    editable: true,
  },
  {
    field: "unit_per_end_item",
    headerName: "Units Per End Item",
    width: 130,
    editable: true,
  },
  {
    field: "corrected_units_per_end_item",
    headerName: "Corrected Units Per End Item",
    width: 130,
    editable: true,
  },
  { field: "gg_qty", headerName: "GG QTY", width: 130, editable: true },
  { field: "srp", headerName: "SRP", width: 130, editable: true },
  {
    field: "store_comment",
    headerName: "Store Comment",
    width: 130,
    editable: true,
  },
  { field: "assembly", headerName: "Assembly", width: 130, editable: true },
  {
    field: "standard_part",
    headerName: "Standard Part",
    width: 130,
    editable: true,
  },
  { field: "material", headerName: "Material", width: 130, editable: true },
  {
    field: "mfg_complexity_level",
    headerName: "Mfg. Complexity Level",
    width: 260,
    editable: true,
  },
  {
    field: "disassembled",
    headerName: "Disassembled",
    width: 130,
    editable: true,
  },
  {
    field: "supplying_or_manufacturing",
    headerName: "Supplying / Manufacturing ",
    width: 130,
    editable: true,
  },
  {
    field: "internal_or_external_outsourcing",
    headerName: "Internal / External outsourcing",
    width: 130,
    editable: true,
  },
  { field: "vendor", headerName: "Vendor", width: 130, editable: true },
  { field: "joining", headerName: "Joining", width: 130, editable: true },
  {
    field: "manufacturing_process",
    headerName: "Manufacturing Process",
    width: 130,
    editable: true,
  },
  {
    field: "raw_material_form",
    headerName: "Raw Material Form",
    width: 130,
    editable: true,
  },
  { field: "function", headerName: "Function", width: 130, editable: true },
  {
    field: "qc_criteria",
    headerName: "QC Criteria",
    width: 130,
    editable: true,
  },
  {
    field: "manufacturing_priority",
    headerName: "Manufacturing Priority ",
    width: 130,
    editable: true,
  },
  {
    field: "manufacturing_responsible_department",
    headerName: "Manufacturing Responsible Department",
    width: 130,
    editable: true,
  },
  {
    field: "designing_responsible_department",
    headerName: "Designing Responsible Department",
    width: 130,
    editable: true,
  },
  {
    field: "usage_on_other_engines",
    headerName: "USAGE ON OTHER ENGINES",
    width: 130,
    editable: true,
  },
  {
    field: "manufacturing_parts_category",
    headerName: "MANUFACTURING PARTS Category",
    width: 130,
    editable: true,
  },
  {
    field: "scope_matrix_category",
    headerName: "Scope Matrix Category",
    width: 130,
    editable: true,
  },
  {
    field: "requires_manufacturing_or_supplying_for_reassembly",
    headerName: "Requires Manufacturing/Supplying For Re-Assembly",
    width: 130,
    editable: true,
  },
  {
    field: "system_D_requirements",
    headerName: "System D. Requirement",
    width: 130,
    editable: true,
  },
  {
    field: "percurment_state",
    headerName: "PERCURMENT STATE",
    width: 130,
    editable: true,
  },
  { field: "details", headerName: "DETAILS", width: 130, editable: true },
  { field: "joint_type", headerName: "Joint Type", width: 130, editable: true },
  {
    field: "discarded_during_disassembly",
    headerName: "DISCARDED DURING DISSASSEMBLY",
    width: 130,
    editable: true,
  },
  {
    field: "expendables",
    headerName: "Expendables",
    width: 130,
    editable: true,
  },
  {
    field: "discarded_or_unusable_according_to_docs",
    headerName: "Discarded/Unusable According To Docs",
    width: 130,
    editable: true,
  },
  {
    field: "destroyed_for_analysis",
    headerName: "Destroyed For Analysis",
    width: 130,
    editable: true,
  },
  {
    field: "rejected_by_qc_or_inspection",
    headerName: "Rejected by QC/Inspection",
    width: 130,
    editable: true,
  },
  {
    field: "class_size_or_weight_as_required",
    headerName: "Class Size/Weight As Required",
    width: 130,
    editable: true,
  },
  { field: "EBOM", headerName: "EBOM", width: 130, editable: true },

  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

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
  console.log("updatedCell-test:", updatedCell);
  const dispatch = useDispatch();
  let rows;
  if (components) {
    const sortedComponents = [...components];
    sortedComponents.sort((a, b) => a.id - b.id);
    rows = sortedComponents;
  } else {
    rows = components;
  }

  const save = async (updatedRow, originalRow) => {
    console.log("originalRow :", originalRow.id);
    console.log("updatedRow :", updatedRow);
    const payload = JSON.stringify(updatedRow);
    try {
      const res = await dispatch(
        componentslice({
          payload: payload,
          slug: originalRow.id,
        })
      );
      unwrapResult(res);
    } catch (err) {
      throw err;
    }
    return updatedRow;
  };

  const saveOnServer = React.useCallback(
    async (newRow) => {
      Api.init();
      const response = await Api.patch("components", `${newRow.id}/`, newRow);
      console.log("response : ", response.data.message);
      // if (newRow != response.data.data) {
      //   successToast("آپدیت شد");
      // } else {
      //   infoToast("عدم دسترسی ادیت سلول");
      // }
      infoToast(response.data.message);
      console.log("newRow :", newRow);
      console.log("response.data[0] :", response.data[0]);
      return response.data.data[0];

      // const res = await dispatch(
      //   componentslice({
      //     payload: newRow,
      //     slug: newRow.id,
      //   })
      // );
      // unwrapResult(res);
      // // Make the HTTP request to save in the backend
      // const response = await mutateRow(newRow);
      // setSnackbar({ children: "User successfully saved", severity: "success" });
      // return res;
    },
    [Api]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  return (
    <div style={{ height: 900, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        processRowUpdate={(updatedRow, originalRow) =>
          saveOnServer(updatedRow, originalRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </div>
  );
}
