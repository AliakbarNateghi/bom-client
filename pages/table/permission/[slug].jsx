import { useState } from "react";
import Api from "../../services/api";
import Cookies from "universal-cookie";
import Permission from "@/pages/components/layout/permission";
import Image from "next/image";
import deletelogo from "@/public/logos/delete.png";
import { useRouter } from "next/router";

export function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  return null;
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const { req } = context;
  const cookies = new Cookies(req.headers.cookie);
  if (!cookies.get("access_token")) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }
  Api.init(cookies);
  const page = context.query.page || context.params?.page;
  const group = context.query.group || context.params?.group;
  const response = await Api.get(
    `field-permission/${slug}/?page=${page}&group=${group}`
  );
  const permissions = response.data;
  const groupsResponse = await Api.get(`groups`);
  const groups = groupsResponse.data;
  return {
    props: {
      permissions,
      groups,
      page,
      group,
      slug,
    },
  };
}

export default function ScopePermission({
  permissions,
  groups,
  page,
  group,
  slug,
}) {
  function ValueComponent({ color, params }) {
    const [deletedCell, setDeletedCell] = useState(params.formattedValue);
    const onDeletePermission = async () => {
      setDeletedCell(null);
      try {
        await Api.delete(
          `field-permission/${slug}`,
          `${params.id}/?field=${params.field}&group=${group}`
        );
      } catch (err) {
        throw err;
      }
    };
    return (
      <>
        {deletedCell ? (
          <div className="flex space-x-11 items-center">
            <div style={{ color }}>{params.formattedValue}</div>
            <div className="cursor-pointer opacity-60 hover:opacity-100">
              <Image
                src={deletelogo}
                alt="delete"
                height={12}
                width={12}
                className="hover:scale-150"
                onClick={onDeletePermission}
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

  let columns;
  if (slug === "bom") {
    columns = [
      {
        field: "id",
        headerName: "id",
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: "revision",
        headerName: "REVISION",
        width: 130,
        type: "boolean",
        editable: true,
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "EBOM");
        },
      },
    ];
  } else if (slug === "provide") {
    columns = [
      {
        field: "id",
        headerName: "id",
        width: 100,
        editable: false,
      },
      {
        field: "application_type",
        headerName: "نوع درخواست (گزارش خريد/قرارداد)",
        width: 260,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "application_type");
        },
      },
      {
        field: "supply_stage",
        headerName: "مرحله تامين",
        width: 400,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "supply_stage");
        },
      },
      {
        field: "material_supplier",
        headerName: "تامين كننده متريال",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "material_supplier");
        },
      },
      {
        field: "pr",
        headerName: " PR شماره",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "pr");
        },
      },
      {
        field: "po",
        headerName: "PO شماره",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "po");
        },
      },
      {
        field: "subject",
        headerName: "موضوع",
        width: 500,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "subject");
        },
      },
      {
        field: "request_type",
        headerName: "جنس درخواست",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "request_type");
        },
      },
      {
        field: "customer_management",
        headerName: "مديريت سفارش دهنده",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "customer_management");
        },
      },

      {
        field: "contract_number",
        headerName: "شماره قرارداد",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "contract_number");
        },
      },
      {
        field: "supplier",
        headerName: "تامين كننده",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "supplier");
        },
      },
      {
        field: "amount",
        headerName: "مبلغ",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "amount");
        },
      },
      {
        field: "adjustment_amount",
        headerName: "مبلغ تعديل",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "adjustment_amount");
        },
      },
      // {
      //   field: "revision",
      //   headerName: "جمع مبلغ",
      //   width: 130,
      //   editable: true,
      //   type: "boolean",
      //   sortable: false,
      //   renderCell: (params) => {
      //     return getValue(params, "revision");
      //   },
      // },
      {
        field: "currency",
        headerName: "نوع ارز",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "currency");
        },
      },
      {
        field: "expert",
        headerName: "كارشناس مسئول",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "expert");
        },
      },
      {
        field: "prepayment_percentage",
        headerName: "درصد پيش‌پرداخت",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_percentage");
        },
      },
      {
        field: "prepayment_according_to_contract",
        headerName: "مبلغ پيش‌پرداخت طبق قرارداد",
        width: 300,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_according_to_contract");
        },
      },

      {
        field: "prepaid_by_toga",
        headerName: "پيش پرداخت توسط توگا",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepaid_by_toga");
        },
      },
      {
        field: "prepaid_by_air_engine",
        headerName: "پيش پرداخت توسط موتور هوايي",
        width: 300,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepaid_by_air_engine");
        },
      },
      // {
      //   field: "revision",
      //   headerName: " جمع پيش پرداخت ها- ريالي",
      //   width: 260,
      //   editable: true,
      //   type: "boolean",
      //   sortable: false,
      //   renderCell: (params) => {
      //     return getValue(params, "revision");
      //   },
      // },
      {
        field: "prepayment_guarantee_check",
        headerName: "چك تضمين پيش پرداخت",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_guarantee_check");
        },
      },
      {
        field: "prepayment_guarantee",
        headerName: "ضمانتنامه پيش پرداخت",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_guarantee");
        },
      },
      {
        field: "mortgage_document_guarantee",
        headerName: "ضمانت نامه سند رهني",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "mortgage_document_guarantee");
        },
      },
      // {
      //   field: "revision",
      //   headerName: "جمع ضمانت نامه هاي پيش پرداخت",
      //   width: 230,
      //   editable: true,
      //   type: "boolean",
      //   sortable: false,
      //   renderCell: (params) => {
      //     return getValue(params, "revision");
      //   },
      // },
      {
        field: "financial_situation",
        headerName: "وضعيت در معاونت مالي",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "financial_situation");
        },
      },
      {
        field: "prepayment_request_date",
        headerName: "تاريخ درخواست پيش پرداخت",
        width: 220,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_request_date");
        },
      },
      {
        field: "prepayment_amount",
        headerName: "مبلغ پيش پرداخت",
        width: 130,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_amount");
        },
      },
      {
        field: "currency_type",
        headerName: "نوع ارز",
        width: 160,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "currency_type");
        },
      },
      {
        field: "prepayment_date",
        headerName: "تاريخ پرداخت پيش پرداخت",
        width: 260,
        editable: true,
        type: "boolean",
        sortable: false,
        renderCell: (params) => {
          return getValue(params, "prepayment_date");
        },
      },
    ];
  }

  const rows = [];
  for (let i = 100; i > 0; i--) {
    rows.push({
      id: page * 100 - i + 1,
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

  return (
    <Permission
      permissions={permissions}
      groups={groups}
      page={page}
      group={group}
      rows={rows}
      columns={columns}
      server={`field-permission/${slug}`}
      massServer={`mass-permission/${slug}`}
      slug={slug}
    />
  );
}
