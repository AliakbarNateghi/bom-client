import { DataGrid, GridRow } from "@mui/x-data-grid";
import Api from "@/pages/services/api";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import deletelogo from "@/public/logos/delete.png";

const useFakeMutation = () => {
  return useCallback(
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

export default function PermissionTable({ permissions, groups, page, group }) {
  const [updatedCell, setUpdatedCell] = useState({});
  const [snackbar, setSnackbar] = useState(null);

  const [pageNumber, setPageNumber] = useState(page);
  const [groupID, setgroupID] = useState(group);
  const [cell, setCell] = useState(true);
  const [deletedCells, setDeletedCells] = useState([]);

  const rows = [];
  for (let i = 15; i > 0; i--) {
    rows.push({
      id: page * 15 - i + 1,
      revision: null,
      ID: null,
      P_on_N_status_code: null,
      fig_no: null,
      item_no: null,
      module: null,
      level: null,
      code: null,
      parent_code: null,
      part_number: null,
      description: null,
      comment: null,
      sap_name: null,
      unit_per_assy: null,
      unit_per_end_item: null,
      corrected_units_per_end_item: null,
      gg_qty: null,
      srp: null,
      store_comment: null,
      assembly: null,
      standard_part: null,
      material: null,
      mfg_complexity_level: null,
      disassembled: null,
      supplying_or_manufacturing: null,
      internal_or_external_outsourcing: null,
      vendor: null,
      joining: null,
      manufacturing_process: null,
      raw_material_form: null,
      function: null,
      qc_criteria: null,
      manufacturing_priority: null,
      manufacturing_responsible_department: null,
      designing_responsible_department: null,
      usage_on_other_engines: null,
      manufacturing_parts_category: null,
      scope_matrix_category: null,
      requires_manufacturing_or_supplying_for_reassembly: null,
      system_D_requirements: null,
      percurment_state: null,
      details: null,
      joint_type: null,
      discarded_during_disassembly: null,
      expendables: null,
      discarded_or_unusable_according_to_docs: null,
      destroyed_for_analysis: null,
      rejected_by_qc_or_inspection: null,
      class_size_or_weight_as_required: null,
      EBOM: null,
    });
  }

  const editables = permissions;
  const merged = rows.map((o1) => {
    const o2 = editables.find((o2) => o2.id === o1.id);
    return o2 ? { ...o1, ...o2 } : o1;
  });

  // async function onDeletePermission(params) {
  //   // console.log("params1 :", params);

  //   const response = await Api.delete(
  //     "field-permission",
  //     `${params.id}/?field=${params.field}&group=${groupID}`
  //   );
  //   setDeletedCells([...deletedCells, params]);
  // }
  const onDeletePermission = async (params) => {
    try {
      await setDeletedCells([...deletedCells, params]);
      await Api.delete(
        "field-permission",
        `${params.id}/?field=${params.field}&group=${groupID}`
      );
      // window.location.reload();
      // return response.data[0];
      return null;
    } catch (err) {
      throw err;
    }
  };

  function ValueComponent({ color, params }) {
    console.log("deletedCells :", deletedCells);
    console.log("params :", params);
    const [test, setTest] = useState(params.formattedValue);
    return (
      <>
        {test ? (
          <div className="flex space-x-11 items-center">
            <div style={{ color }}>{params.formattedValue}</div>
            <div className="cursor-pointer opacity-60 hover:opacity-100">
              <Image
                src={deletelogo}
                alt="delete"
                height={12}
                width={12}
                onClick={() => setTest(null)}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }

  function getValue(params, field) {
    if (params.row[`${field}`] === true) {
      return <ValueComponent color={"green"} params={params} />;
    } else if (params.row[`${field}`] === false) {
      return <ValueComponent color={"red"} params={params} />;
    } else {
      return null;
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "id",
      width: 100,
      editable: false,
    },
    {
      field: "revision",
      headerName: "REVISION",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "revision");
      },
    },
    {
      field: "ID",
      headerName: "ID",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "ID");
      },
    },
    {
      field: "P_on_N_status_code",
      headerName: "P/N Status Code",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "P_on_N_status_code");
      },
    },
    {
      field: "fig_no",
      headerName: "Fig. No.",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "fig_no");
      },
    },
    {
      field: "item_no",
      headerName: "Item No.",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "item_no");
      },
    },
    {
      field: "module",
      headerName: "Module",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "module");
      },
    },
    {
      field: "level",
      headerName: "Level",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "level");
      },
    },
    {
      field: "code",
      headerName: "Code",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "code");
      },
    },
    {
      field: "parent_code",
      headerName: "Parent Code",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "parent_code");
      },
    },
    {
      field: "part_number",
      headerName: "Part Number",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "part_number");
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "description");
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "comment");
      },
    },
    {
      field: "sap_name",
      headerName: "SAP NAME",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "sap_name");
      },
    },
    {
      field: "unit_per_assy",
      headerName: "Units Per Assy",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "unit_per_assy");
      },
    },
    {
      field: "unit_per_end_item",
      headerName: "Units Per End Item",
      width: 150,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "unit_per_end_item");
      },
    },
    {
      field: "corrected_units_per_end_item",
      headerName: "Corrected Units Per End Item",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "corrected_units_per_end_item");
      },
    },
    {
      field: "gg_qty",
      headerName: "GG QTY",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "gg_qty");
      },
    },
    {
      field: "srp",
      headerName: "SRP",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "srp");
      },
    },
    {
      field: "store_comment",
      headerName: "Store Comment",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "store_comment");
      },
    },
    {
      field: "assembly",
      headerName: "Assembly",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "assembly");
      },
    },
    {
      field: "standard_part",
      headerName: "Standard Part",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "standard_part");
      },
    },
    {
      field: "material",
      headerName: "Material",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "material");
      },
    },
    {
      field: "mfg_complexity_level",
      headerName: "Mfg. Complexity Level",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "mfg_complexity_level");
      },
    },
    {
      field: "disassembled",
      headerName: "Disassembled",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "disassembled");
      },
    },
    {
      field: "supplying_or_manufacturing",
      headerName: "Supplying / Manufacturing ",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "supplying_or_manufacturing");
      },
    },
    {
      field: "internal_or_external_outsourcing",
      headerName: "Internal / External outsourcing",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "internal_or_external_outsourcing");
      },
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "vendor");
      },
    },
    {
      field: "joining",
      headerName: "Joining",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "joining");
      },
    },
    {
      field: "manufacturing_process",
      headerName: "Manufacturing Process",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "manufacturing_process");
      },
    },
    {
      field: "raw_material_form",
      headerName: "Raw Material Form",
      width: 150,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "raw_material_form");
      },
    },
    {
      field: "function",
      headerName: "Function",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "function");
      },
    },
    {
      field: "qc_criteria",
      headerName: "QC Criteria",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "qc_criteria");
      },
    },
    {
      field: "manufacturing_priority",
      headerName: "Manufacturing Priority ",
      width: 180,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "manufacturing_priority");
      },
    },
    {
      field: "manufacturing_responsible_department",
      headerName: "Manufacturing Responsible Department",
      width: 300,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "manufacturing_responsible_department");
      },
    },
    {
      field: "designing_responsible_department",
      headerName: "Designing Responsible Department",
      width: 300,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "designing_responsible_department");
      },
    },
    {
      field: "usage_on_other_engines",
      headerName: "USAGE ON OTHER ENGINES",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "usage_on_other_engines");
      },
    },
    {
      field: "manufacturing_parts_category",
      headerName: "MANUFACTURING PARTS Category",
      width: 280,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "manufacturing_parts_category");
      },
    },
    {
      field: "scope_matrix_category",
      headerName: "Scope Matrix Category",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "scope_matrix_category");
      },
    },
    {
      field: "requires_manufacturing_or_supplying_for_reassembly",
      headerName: "Requires Manufacturing/Supplying For Re-Assembly",
      width: 360,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(
          params,
          "requires_manufacturing_or_supplying_for_reassembly"
        );
      },
    },
    {
      field: "system_D_requirements",
      headerName: "System D. Requirement",
      width: 200,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "system_D_requirements");
      },
    },
    {
      field: "percurment_state",
      headerName: "PERCURMENT STATE",
      width: 200,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "percurment_state");
      },
    },
    {
      field: "details",
      headerName: "DETAILS",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "details");
      },
    },
    {
      field: "joint_type",
      headerName: "Joint Type",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "joint_type");
      },
    },
    {
      field: "discarded_during_disassembly",
      headerName: "DISCARDED DURING DISSASSEMBLY",
      width: 300,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "discarded_during_disassembly");
      },
    },
    {
      field: "expendables",
      headerName: "Expendables",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "expendables");
      },
    },
    {
      field: "discarded_or_unusable_according_to_docs",
      headerName: "Discarded/Unusable According To Docs",
      width: 300,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "discarded_or_unusable_according_to_docs");
      },
    },
    {
      field: "destroyed_for_analysis",
      headerName: "Destroyed For Analysis",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "destroyed_for_analysis");
      },
    },
    {
      field: "rejected_by_qc_or_inspection",
      headerName: "Rejected by QC/Inspection",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "rejected_by_qc_or_inspection");
      },
    },
    {
      field: "class_size_or_weight_as_required",
      headerName: "Class Size/Weight As Required",
      width: 220,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "class_size_or_weight_as_required");
      },
    },
    {
      field: "EBOM",
      headerName: "EBOM",
      width: 130,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return getValue(params, "EBOM");
      },
    },
  ];

  function findDifferentKey(obj1, obj2) {
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          return key;
        }
      } else if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        return key;
      }
    }
    return null;
  }

  const saveOnServer = useCallback(
    async (updatedRow, originalRow) => {
      Api.init();
      const diff_key = findDifferentKey(updatedRow, originalRow);
      const payload = {
        group: groupID,
        field: diff_key,
        instance_id: updatedRow.id,
        editable: updatedRow[diff_key],
      };
      const response = await Api.post("field-permission", payload);
      return response.data[0];
    },
    [Api]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const [textFieldValue, setTextFieldValue] = useState("");

  const getCellClassName = (e) => {
    return "item-center";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.history.pushState(null, "", `?page=${pageNumber}&group=${groupID}`);
    window.location.reload();
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={merged}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          saveOnServer(updatedRow, originalRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        hideFooter={true}
        showCellVerticalBorder
        showColumnVerticalBorder
        getCellClassName={getCellClassName}
        autoHeight
        // onCellClick={onDeletePermission}
      />
      <br />

      <div className="flex items-center">
        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-group"
              >
                Group
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:bg-white focus:border-gray-500"
                  id="grid-group"
                  onChange={(e) => {
                    setgroupID(e.target.value);
                  }}
                  value={groupID}
                >
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-page"
              >
                Page
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
                id="grid-page"
                type="number"
                placeholder={pageNumber}
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <br />
              <button
                className="appearance-none block w-full bg-gray-400 text-gray-800 border border-gray-400 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
