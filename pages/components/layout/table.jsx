import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "id", width: 70 },
  { field: "revision", headerName: "REVISION", width: 130 },
  { field: "ID", headerName: "ID", width: 130 },
  { field: "P_on_N_status_code", headerName: "P/N Status Code", width: 130 },
  { field: "fig_no", headerName: "Fig. No.", width: 130 },
  { field: "item_no", headerName: "Item No.", width: 130 },
  { field: "module", headerName: "Module", width: 130 },
  { field: "level", headerName: "Level", width: 130 },
  { field: "code", headerName: "Code", width: 130 },
  { field: "parent_code", headerName: "Parent Code", width: 130 },
  { field: "part_number", headerName: "Part Number", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "comment", headerName: "Comment", width: 130 },
  { field: "sap_name", headerName: "SAP NAME", width: 130 },
  { field: "unit_per_assy", headerName: "Units Per Assy", width: 130 },
  { field: "unit_per_end_item", headerName: "Units Per End Item", width: 130 },
  {
    field: "corrected_units_per_end_item",
    headerName: "Corrected Units Per End Item",
    width: 130,
  },
  { field: "gg_qty", headerName: "GG QTY", width: 130 },
  { field: "srp", headerName: "SRP", width: 130 },
  { field: "store_comment", headerName: "Store Comment", width: 130 },
  { field: "assembly", headerName: "Assembly", width: 130 },
  { field: "standard_part", headerName: "Standard Part", width: 130 },
  { field: "material", headerName: "Material", width: 130 },
  {
    field: "mfg_complexity_level",
    headerName: "Mfg. Complexity Level",
    width: 260,
  },
  { field: "disassembled", headerName: "Disassembled", width: 130 },
  {
    field: "supplying_or_manufacturing",
    headerName: "Supplying / Manufacturing ",
    width: 130,
  },
  {
    field: "internal_or_external_outsourcing",
    headerName: "Internal / External outsourcing",
    width: 130,
  },
  { field: "vendor", headerName: "Vendor", width: 130 },
  { field: "joining", headerName: "Joining", width: 130 },
  {
    field: "manufacturing_process",
    headerName: "Manufacturing Process",
    width: 130,
  },
  { field: "raw_material_form", headerName: "Raw Material Form", width: 130 },
  { field: "function", headerName: "Function", width: 130 },
  { field: "qc_criteria", headerName: "QC Criteria", width: 130 },
  {
    field: "manufacturing_priority",
    headerName: "Manufacturing Priority ",
    width: 130,
  },
  {
    field: "manufacturing_responsible_department",
    headerName: "Manufacturing Responsible Department",
    width: 130,
  },
  {
    field: "designing_responsible_department",
    headerName: "Designing Responsible Department",
    width: 130,
  },
  {
    field: "usage_on_other_engines",
    headerName: "USAGE ON OTHER ENGINES",
    width: 130,
  },
  {
    field: "manufacturing_parts_category",
    headerName: "MANUFACTURING PARTS Category",
    width: 130,
  },
  {
    field: "scope_matrix_category",
    headerName: "Scope Matrix Category",
    width: 130,
  },
  {
    field: "requires_manufacturing_or_supplying_for_reassembly",
    headerName: "Requires Manufacturing/Supplying For Re-Assembly",
    width: 130,
  },
  {
    field: "system_D_requirements",
    headerName: "System D. Requirement",
    width: 130,
  },
  { field: "percurment_state", headerName: "PERCURMENT STATE", width: 130 },
  { field: "details", headerName: "DETAILS", width: 130 },
  { field: "joint_type", headerName: "Joint Type", width: 130 },
  {
    field: "discarded_during_disassembly",
    headerName: "DISCARDED DURING DISSASSEMBLY",
    width: 130,
  },
  { field: "expendables", headerName: "Expendables", width: 130 },
  {
    field: "discarded_or_unusable_according_to_docs",
    headerName: "Discarded/Unusable According To Docs",
    width: 130,
  },
  {
    field: "destroyed_for_analysis",
    headerName: "Destroyed For Analysis",
    width: 130,
  },
  {
    field: "rejected_by_qc_or_inspection",
    headerName: "Rejected by QC/Inspection",
    width: 130,
  },
  {
    field: "class_size_or_weight_as_required",
    headerName: "Class Size/Weight As Required",
    width: 130,
  },
  { field: "EBOM", headerName: "EBOM", width: 130 },

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

export default function DataTable({ components }) {
  const rows = components;

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
        checkboxSelection
      />
    </div>
  );
}
