import Api from "../../services/api";
import Cookies from "universal-cookie";
import Table from "@/pages/components/layout/table";
import { useRouter } from "next/router";
// import { DatePicker } from "react-persian-datepicker";

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
        permanent: false, // Set to true if the redirect is permanent
      },
    };
  }
  Api.init(cookies);
  const page = context.query.page || context.params?.page;
  const response = await Api.get(`components/${slug}/?page=${page}`);
  const components = response.data;
  const responsecols = await Api.get(`hidden-columns`);
  const hiddencols = responsecols.data;
  return {
    props: {
      components,
      hiddencols,
      page,
      slug,
    },
  };
}

export default function ScopeTable({ components, hiddencols, page, slug }) {
  const editables = components["editables"];
  const querysets = components["querysets"];

  function getColor(params, field) {
    // let bool;
    // for (let i = 0; i < querysets.length; i++) {
    //   if (querysets[i].id === params.id) {
    //     bool = editables[i][`${field}`];
    //   }
    // }
    // const cellColor = bool ? "green" : "red";
    return (
      <div
        className="bkoodak text-base font-medium"
        // style={{ color: cellColor }}
      >
        {/* {params.value != "nan" && params.value ? params.value : ""} */}
        {params.value}
      </div>
    );
  }

  function getClassName(params, field) {
    let bool;

    for (let i = 0; i < querysets.length; i++) {
      if (querysets[i].id === params.id) {
        bool = editables[i][`${field}`];
      }
    }
    if (bool == null) {
      return "pointer-events-none";
      // cursor-not-allowed
    }
    return bool
      ? "bg-green-400 hover:bg-green-500 cursor-pointer"
      : "bg-sky-400 hover:bg-sky-700 pointer-events-none";
  }

  let columns;
  if (slug === "bom") {
    columns = [
      {
        field: "id",
        headerName: "id",
        width: 100,
        editable: false,
        align: "center",
        headerAlign: "center",
        cellClassName: () => {
          return "bg-f0f0f0 font-bold";
        },
      },
      {
        field: "revision",
        headerName: "REVISION",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "revision");
        },
        renderCell: (params) => {
          return getColor(params, "revision");
        },
      },
      {
        field: "ID",
        headerName: "ID",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "ID");
        },
        renderCell: (params) => {
          return getColor(params, "ID");
        },
      },
      {
        field: "P_on_N_status_code",
        headerName: "P/N Status Code",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "P_on_N_status_code");
        },
        renderCell: (params) => {
          return getColor(params, "P_on_N_status_code");
        },
      },
      {
        field: "fig_no",
        headerName: "Fig. No.",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "fig_no");
        },
        renderCell: (params) => {
          return getColor(params, "fig_no");
        },
      },
      {
        field: "item_no",
        headerName: "Item No.",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "item_no");
        },
        renderCell: (params) => {
          return getColor(params, "item_no");
        },
      },
      {
        field: "module",
        headerName: "Module",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "module");
        },
        renderCell: (params) => {
          return getColor(params, "module");
        },
      },
      {
        field: "level",
        headerName: "Level",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "level");
        },
        renderCell: (params) => {
          return getColor(params, "level");
        },
      },
      {
        field: "code",
        headerName: "Code",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "code");
        },
        renderCell: (params) => {
          return getColor(params, "code");
        },
      },
      {
        field: "parent_code",
        headerName: "Parent Code",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "parent_code");
        },
        renderCell: (params) => {
          return getColor(params, "parent_code");
        },
      },
      {
        field: "part_number",
        headerName: "Part Number",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "part_number");
        },
        renderCell: (params) => {
          return getColor(params, "part_number");
        },
      },
      {
        field: "description",
        headerName: "Description",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "description");
        },
        renderCell: (params) => {
          return getColor(params, "description");
        },
      },
      {
        field: "comment",
        headerName: "Comment",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "comment");
        },
        renderCell: (params) => {
          return getColor(params, "comment");
        },
      },
      {
        field: "sap_name",
        headerName: "SAP NAME",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "sap_name");
        },
        renderCell: (params) => {
          return getColor(params, "sap_name");
        },
      },
      {
        field: "unit_per_assy",
        headerName: "Units Per Assy",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "unit_per_assy");
        },
        renderCell: (params) => {
          return getColor(params, "unit_per_assy");
        },
      },
      {
        field: "unit_per_end_item",
        headerName: "Units Per End Item",
        width: 150,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "unit_per_end_item");
        },
        renderCell: (params) => {
          return getColor(params, "unit_per_end_item");
        },
      },
      {
        field: "corrected_units_per_end_item",
        headerName: "Corrected Units Per End Item",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "corrected_units_per_end_item");
        },
        renderCell: (params) => {
          return getColor(params, "corrected_units_per_end_item");
        },
      },
      {
        field: "gg_qty",
        headerName: "GG QTY",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "gg_qty");
        },
        renderCell: (params) => {
          return getColor(params, "gg_qty");
        },
      },
      {
        field: "srp",
        headerName: "SRP",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "srp");
        },
        renderCell: (params) => {
          return getColor(params, "srp");
        },
      },
      {
        field: "store_comment",
        headerName: "Store Comment",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "store_comment");
        },
        renderCell: (params) => {
          return getColor(params, "store_comment");
        },
      },
      {
        field: "assembly",
        headerName: "Assembly",
        width: 130,
        type: "boolean",
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "assembly");
        },
        // renderCell: (params) => {
        //   return getColor(params, "assembly");
        // },
      },
      {
        field: "standard_part",
        headerName: "Standard Part",
        width: 130,
        type: "boolean",
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "standard_part");
        },
        // renderCell: (params) => {
        //   return getColor(params, "standard_part");
        // },
      },
      {
        field: "material",
        headerName: "Material",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "material");
        },
        renderCell: (params) => {
          return getColor(params, "material");
        },
      },
      {
        field: "mfg_complexity_level",
        headerName: "Mfg. Complexity Level",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "mfg_complexity_level");
        },
        renderCell: (params) => {
          return getColor(params, "mfg_complexity_level");
        },
      },
      {
        field: "disassembled",
        headerName: "Disassembled",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "disassembled");
        },
        renderCell: (params) => {
          return getColor(params, "disassembled");
        },
      },
      {
        field: "supplying_or_manufacturing",
        headerName: "Supplying / Manufacturing ",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "supplying_or_manufacturing");
        },
        renderCell: (params) => {
          return getColor(params, "supplying_or_manufacturing");
        },
      },
      {
        field: "internal_or_external_outsourcing",
        headerName: "Internal / External outsourcing",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "internal_or_external_outsourcing");
        },
        renderCell: (params) => {
          return getColor(params, "internal_or_external_outsourcing");
        },
      },
      {
        field: "vendor",
        headerName: "Vendor",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "vendor");
        },
        renderCell: (params) => {
          return getColor(params, "vendor");
        },
      },
      {
        field: "joining",
        headerName: "Joining",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "joining");
        },
        renderCell: (params) => {
          return getColor(params, "joining");
        },
      },
      {
        field: "manufacturing_process",
        headerName: "Manufacturing Process",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "manufacturing_process");
        },
        renderCell: (params) => {
          return getColor(params, "manufacturing_process");
        },
      },
      {
        field: "raw_material_form",
        headerName: "Raw Material Form",
        width: 150,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "raw_material_form");
        },
        renderCell: (params) => {
          return getColor(params, "raw_material_form");
        },
      },
      {
        field: "function",
        headerName: "Function",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "function");
        },
        renderCell: (params) => {
          return getColor(params, "function");
        },
      },
      {
        field: "qc_criteria",
        headerName: "QC Criteria",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "qc_criteria");
        },
        renderCell: (params) => {
          return getColor(params, "qc_criteria");
        },
      },
      {
        field: "manufacturing_priority",
        headerName: "Manufacturing Priority ",
        width: 180,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "manufacturing_priority");
        },
        renderCell: (params) => {
          return getColor(params, "manufacturing_priority");
        },
      },
      {
        field: "manufacturing_responsible_department",
        headerName: "Manufacturing Responsible Department",
        width: 300,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "manufacturing_responsible_department");
        },
        renderCell: (params) => {
          return getColor(params, "manufacturing_responsible_department");
        },
      },
      {
        field: "designing_responsible_department",
        headerName: "Designing Responsible Department",
        width: 300,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "designing_responsible_department");
        },
        renderCell: (params) => {
          return getColor(params, "designing_responsible_department");
        },
      },
      {
        field: "usage_on_other_engines",
        headerName: "USAGE ON OTHER ENGINES",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "usage_on_other_engines");
        },
        renderCell: (params) => {
          return getColor(params, "usage_on_other_engines");
        },
      },
      {
        field: "manufacturing_parts_category",
        headerName: "MANUFACTURING PARTS Category",
        width: 280,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "manufacturing_parts_category");
        },
        renderCell: (params) => {
          return getColor(params, "manufacturing_parts_category");
        },
      },
      {
        field: "scope_matrix_category",
        headerName: "Scope Matrix Category",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "scope_matrix_category");
        },
        renderCell: (params) => {
          return getColor(params, "scope_matrix_category");
        },
      },
      {
        field: "requires_manufacturing_or_supplying_for_reassembly",
        headerName: "Requires Manufacturing/Supplying For Re-Assembly",
        width: 360,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(
            params,
            "requires_manufacturing_or_supplying_for_reassembly"
          );
        },
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
        width: 200,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "system_D_requirements");
        },
        renderCell: (params) => {
          return getColor(params, "system_D_requirements");
        },
      },
      {
        field: "percurment_state",
        headerName: "PERCURMENT STATE",
        width: 200,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "percurment_state");
        },
        renderCell: (params) => {
          return getColor(params, "percurment_state");
        },
      },
      {
        field: "details",
        headerName: "DETAILS",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "details");
        },
        renderCell: (params) => {
          return getColor(params, "details");
        },
      },
      {
        field: "joint_type",
        headerName: "Joint Type",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "joint_type");
        },
        renderCell: (params) => {
          return getColor(params, "joint_type");
        },
      },
      {
        field: "discarded_during_disassembly",
        headerName: "DISCARDED DURING DISSASSEMBLY",
        width: 300,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "discarded_during_disassembly");
        },
        renderCell: (params) => {
          return getColor(params, "discarded_during_disassembly");
        },
      },
      {
        field: "expendables",
        headerName: "Expendables",
        width: 130,
        type: "boolean",
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "expendables");
        },
        // renderCell: (params) => {
        //   return getColor(params, "expendables");
        // },
      },
      {
        field: "discarded_or_unusable_according_to_docs",
        headerName: "Discarded/Unusable According To Docs",
        width: 300,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(
            params,
            "discarded_or_unusable_according_to_docs"
          );
        },
        renderCell: (params) => {
          return getColor(params, "discarded_or_unusable_according_to_docs");
        },
      },
      {
        field: "destroyed_for_analysis",
        headerName: "Destroyed For Analysis",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "destroyed_for_analysis");
        },
        renderCell: (params) => {
          return getColor(params, "destroyed_for_analysis");
        },
      },
      {
        field: "rejected_by_qc_or_inspection",
        headerName: "Rejected by QC/Inspection",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "rejected_by_qc_or_inspection");
        },
        renderCell: (params) => {
          return getColor(params, "rejected_by_qc_or_inspection");
        },
      },
      {
        field: "class_size_or_weight_as_required",
        headerName: "Class Size/Weight As Required",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "class_size_or_weight_as_required");
        },
        renderCell: (params) => {
          return getColor(params, "class_size_or_weight_as_required");
        },
      },
      {
        field: "EBOM",
        headerName: "EBOM",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "EBOM");
        },
        renderCell: (params) => {
          return getColor(params, "EBOM");
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
        align: "center",
        headerAlign: "center",
        cellClassName: () => {
          return "bg-f0f0f0 font-bold";
        },
      },
      {
        field: "application_type",
        headerName: "نوع درخواست (گزارش خرید/قرارداد)",
        width: 260,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: ["قرارداد", "پیمانکار"],
        cellClassName: (params) => {
          return getClassName(params, "application_type");
        },
        renderCell: (params) => {
          return getColor(params, "application_type");
        },
      },
      {
        field: "supply_stage",
        headerName: "مرحله تامین",
        width: 400,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: [
          "یافتن پیمانكاران و تایید صلاحیت پیمانكار",
          "درخواست استعلام/مناقصه",
          "دریافت پیشنهاد قیمت/پاكات",
          "دریافت تایید فنی از واحد درخواست دهنده",
          "تهیه گزارش كمیسیون معاملات/گزارش خرید",
          "برگزاری كمیسیون معاملات",
          "تایید كمیسیون معاملات",
          "ابلاغ سفارش",
          "تهیه پیش نویس قرارداد",
          "تایید پیش نویس قرارداد توسط درخواست دهنده",
          "امضای پیمانكار",
          "امضای داخلی",
          "ابلاغ قرارداد",
          "تحویل گردید",
          "حذف شد",
          "دریافت تضامین",
          "ارجاع به مالی",
        ],
        cellClassName: (params) => {
          return getClassName(params, "supply_stage");
        },
        renderCell: (params) => {
          return getColor(params, "supply_stage");
        },
      },
      {
        field: "material_supplier",
        headerName: "تامین كننده متریال",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: ["پیمانکار", "کارفرما"],
        cellClassName: (params) => {
          return getClassName(params, "material_supplier");
        },
        renderCell: (params) => {
          return getColor(params, "material_supplier");
        },
      },
      {
        field: "pr",
        headerName: " PR شماره",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "pr");
        },
        renderCell: (params) => {
          return getColor(params, "pr");
        },
      },
      {
        field: "po",
        headerName: "PO شماره",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "po");
        },
        renderCell: (params) => {
          return getColor(params, "po");
        },
      },
      {
        field: "subject",
        headerName: "موضوع",
        width: 500,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "subject");
        },
        renderCell: (params) => {
          return getColor(params, "subject");
        },
      },
      {
        field: "request_type",
        headerName: "جنس درخواست",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: [
          "ماده اولیه",
          "ماده نیمه آماده",
          "تامین قطعه",
          "ساخت",
          "ابزار و ماشین آلات",
          "خدمت",
        ],
        cellClassName: (params) => {
          return getClassName(params, "request_type");
        },
        renderCell: (params) => {
          return getColor(params, "request_type");
        },
      },
      {
        field: "customer_management",
        headerName: "مدیریت سفارش دهنده",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: [
          "فن و کمپرسور",
          "جانبی",
          "توربین",
          "ماینور پارت",
          "محفظه احتراق",
          "طراحی سازه موتور",
          "استاندارد و كیفیت",
        ],
        cellClassName: (params) => {
          return getClassName(params, "customer_management");
        },
        renderCell: (params) => {
          return getColor(params, "customer_management");
        },
      },

      {
        field: "contract_number",
        headerName: "شماره قرارداد",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "contract_number");
        },
        renderCell: (params) => {
          return getColor(params, "contract_number");
        },
      },
      {
        field: "supplier",
        headerName: "تامین كننده",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "supplier");
        },
        renderCell: (params) => {
          return getColor(params, "supplier");
        },
      },
      {
        field: "amount",
        headerName: "مبلغ",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "amount");
        },
        renderCell: (params) => {
          return getColor(params, "amount");
        },
      },
      {
        field: "adjustment_amount",
        headerName: "مبلغ تعدیل",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "adjustment_amount");
        },
        renderCell: (params) => {
          return getColor(params, "adjustment_amount");
        },
      },
      // {
      //   field: "revision",
      //   headerName: "جمع مبلغ",
      //   width: 130,
      //   editable: true,
      //   align: "center",
      //   headerAlign: "center",
      //   renderCell: (params) => {
      //     return getColor(params, "revision");
      //   },
      // },
      {
        field: "currency",
        headerName: "نوع ارز",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: ["ریال", "یورو", "دلار", "یوان", "درهم"],
        cellClassName: (params) => {
          return getClassName(params, "currency");
        },
        renderCell: (params) => {
          return getColor(params, "currency");
        },
      },
      {
        field: "expert",
        headerName: "كارشناس مسئول",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: ["غنی آبادی", "محمد زاده", "روشن دل"],
        cellClassName: (params) => {
          return getClassName(params, "expert");
        },
        renderCell: (params) => {
          return getColor(params, "expert");
        },
      },
      {
        field: "prepayment_percentage",
        headerName: "درصد پیش‌پرداخت",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_percentage");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_percentage");
        },
      },
      {
        field: "prepayment_according_to_contract",
        headerName: "مبلغ پیش‌پرداخت طبق قرارداد",
        width: 300,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_according_to_contract");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_according_to_contract");
        },
      },
      {
        field: "prepaid_by_toga",
        headerName: "پیش پرداخت توسط توگا",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepaid_by_toga");
        },
        renderCell: (params) => {
          return getColor(params, "prepaid_by_toga");
        },
      },
      {
        field: "prepaid_by_air_engine",
        headerName: "پیش پرداخت توسط موتور هوایی",
        width: 300,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepaid_by_air_engine");
        },
        renderCell: (params) => {
          return getColor(params, "prepaid_by_air_engine");
        },
      },
      // {
      //   field: "revision",
      //   headerName: " جمع پیش پرداخت ها- ریالی",
      //   width: 260,
      //   editable: true,
      //   align: "center",
      //   headerAlign: "center"
      //   renderCell: (params) => {
      //     return getColor(params, "revision");
      //   },
      // },
      {
        field: "prepayment_guarantee_check",
        headerName: "چك تضمین پیش پرداخت",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_guarantee_check");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_guarantee_check");
        },
      },
      {
        field: "prepayment_guarantee",
        headerName: "ضمانتنامه پیش پرداخت",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_guarantee");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_guarantee");
        },
      },
      {
        field: "mortgage_document_guarantee",
        headerName: "ضمانت نامه سند رهنی",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "mortgage_document_guarantee");
        },
        renderCell: (params) => {
          return getColor(params, "mortgage_document_guarantee");
        },
      },
      // {
      //   field: "revision",
      //   headerName: "جمع ضمانت نامه های پیش پرداخت",
      //   width: 230,
      //   editable: true,
      //   align: "center",
      //   headerAlign: "center",
      //   renderCell: (params) => {
      //     return getColor(params, "revision");
      //   },
      // },
      {
        field: "financial_situation",
        headerName: "وضعیت در معاونت مالی",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: [
          "دریافت تضامین",
          "درخواست پیش پرداخت",
          "تعیین نوع ارز",
          "توافق با تامین كننده",
          "دریافت مستندات ارزی",
          "درخواست ارز از مپنا بین الملل",
          "ارسال مدارك به مپنا بین الملل",
          "پیگیری درخواست ارز",
          "پرداخت شده",
        ],
        cellClassName: (params) => {
          return getClassName(params, "financial_situation");
        },
        renderCell: (params) => {
          return getColor(params, "financial_situation");
        },
      },
      {
        field: "prepayment_request_date",
        headerName: "تاریخ درخواست پیش پرداخت",
        width: 220,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_request_date");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_request_date");
        },
      },
      {
        field: "prepayment_amount",
        headerName: "مبلغ پیش پرداخت",
        width: 130,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_amount");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_amount");
        },
      },
      {
        field: "currency_type",
        headerName: "نوع ارز",
        width: 160,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "currency_type");
        },
        renderCell: (params) => {
          return getColor(params, "currency_type");
        },
      },
      {
        field: "prepayment_date",
        headerName: "تاریخ پرداخت پیش پرداخت",
        width: 260,
        editable: true,
        align: "center",
        headerAlign: "center",
        cellClassName: (params) => {
          return getClassName(params, "prepayment_date");
        },
        renderCell: (params) => {
          return getColor(params, "prepayment_date");
        },
      },
    ];
  }

  return (
    <Table
      components={components}
      hiddencols={hiddencols[0]}
      page={page}
      columns={columns}
      server={`components/${slug}`}
      slug={slug}
    />
  );
}
