import Api from "../../services/api";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import MoreLess from "@/pages/filters/moreless";
import dynamic from "next/dynamic";
import CircularIndeterminate from "@/pages/components/layout/loading";
import { type } from "os";
const Table = dynamic(() => import("@/pages/components/parts/table"), {
  loading: () => <CircularIndeterminate />,
});

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

export default function TableRoot({ components, hiddencols, page, slug }) {
  const editables = components["editables"];
  const querysets = components["querysets"];

  function getClassName(params, field) {
    let bool;

    for (let i = 0; i < querysets.length; i++) {
      if (querysets[i].id === params.id) {
        bool = editables[i][`${field}`];
      }
    }
    if (bool == null) {
      return "pointer-events-none hidden";
      // cursor-not-allowed
    }
    return bool
      ? "bg-green-400 hover:bg-green-500 cursor-pointer"
      : "bg-sky-400 hover:bg-sky-400 hover:pointer-events-none";
  }

  function createObject(
    field,
    headerName,
    width,
    editable,
    type,
    valueOptions
  ) {
    return {
      field: field,
      headerName: headerName,
      width: width,
      editable: editable,
      type: type && type,
      sortable: false,
      align: "center",
      headerAlign: "center",
      valueOptions: valueOptions && valueOptions,
      cellClassName: (params) => {
        return field !== "id"
          ? getClassName(params, field)
          : "bg-f0f0f0 font-bold";
      },
      ...(field !== "id" &&
        type != "boolean" && {
          renderCell: (params) => {
            return <MoreLess params={params} field={field} />;
          },
        }),
    };
  }

  const bom = [
    createObject("id", "id", 100, false, undefined),
    createObject("revision", "REVISION", 200, true),
    createObject("ID", "ID", 200, true),
    createObject("P_on_N_status_code", "P/N Status Code", 200, true),
    createObject("fig_no", "Fig. No.", 200, true),
    createObject("item_no", "Item No.", 200, true),
    createObject("module", "Module", 200, true),
    createObject("level", "Level", 200, true),
    createObject("code", "Code", 200, true),
    createObject("parent_code", "Parent Code", 200, true),
    createObject("part_number", "Part Number", 200, true),
    createObject("description", "Description", 200, true),
    createObject("comment", "Comment", 300, true),
    createObject("sap_name", "SAP NAME", 200, true),
    createObject("unit_per_assy", "Units Per Assy", 200, true),
    createObject("unit_per_end_item", "Units Per End Item", 200, true),
    createObject(
      "corrected_units_per_end_item",
      "Corrected Units Per End Item",
      220,
      true
    ),
    createObject("gg_qty", "GG QTY", 200, true),
    createObject("srp", "SRP", 200, true),
    createObject("store_comment", "Store Comment", 300, true),
    createObject("assembly", "Assembly", 200, true, "boolean"),
    createObject("standard_part", "Standard Part", 200, true, "boolean"),
    createObject("material", "Material", 200, true),
    createObject("mfg_complexity_level", "Mfg. Complexity Level", 220, true),
    createObject("disassembled", "Disassembled", 200, true),
    createObject(
      "supplying_or_manufacturing",
      "Supplying / Manufacturing ",
      220,
      true
    ),
    createObject(
      "internal_or_external_outsourcing",
      "Internal / External outsourcing",
      220,
      true
    ),
    createObject("vendor", "Vendor", 200, true),
    createObject("joining", "Joining", 200, true),
    createObject("manufacturing_process", "Manufacturing Process", 220, true),
    createObject("raw_material_form", "Raw Material Form", 150, true),
    createObject("function", "Function", 200, true),
    createObject("qc_criteria", "QC Criteria", 200, true),
    createObject(
      "manufacturing_priority",
      "Manufacturing Priority ",
      180,
      true
    ),
    createObject(
      "manufacturing_responsible_department",
      "Manufacturing Responsible Department",
      300,
      true
    ),
    createObject(
      "designing_responsible_department",
      "Designing Responsible Department",
      300,
      true
    ),
    createObject("usage_on_other_engines", "USAGE ON OTHER ENGINES", 220, true),
    createObject(
      "manufacturing_parts_category",
      "MANUFACTURING PARTS Category",
      280,
      true
    ),
    createObject("scope_matrix_category", "Scope Matrix Category", 220, true),
    createObject(
      "requires_manufacturing_or_supplying_for_reassembly",
      "Requires Manufacturing/Supplying For Re-Assembly",
      360,
      true
    ),
    createObject("system_D_requirements", "System D. Requirement", 200, true),
    createObject("percurment_state", "PERCURMENT STATE", 150, true),
    createObject("details", "DETAILS", 200, true),
    createObject("joint_type", "Joint Type", 200, true),
    createObject(
      "discarded_during_disassembly",
      "DISCARDED DURING DISSASSEMBLY",
      300,
      true
    ),
    createObject("expendables", "Expendables", 200, true, "boolean"),
    createObject(
      "discarded_or_unusable_according_to_docs",
      "Discarded/Unusable According To Docs",
      300,
      true
    ),
    createObject("destroyed_for_analysis", "Destroyed For Analysis", 220, true),
    createObject(
      "rejected_by_qc_or_inspection",
      "Rejected by QC/Inspection",
      220,
      true
    ),
    createObject(
      "class_size_or_weight_as_required",
      "Class Size/Weight As Required",
      220,
      true
    ),
    createObject("EBOM", "EBOM", 200, true),
  ];

  const provide = [
    createObject("id", "id", 100, false, undefined),
    createObject(
      "application_type",
      "نوع درخواست (گزارش خريد/قرارداد)",
      260,
      true,
      "singleSelect",
      ["قرارداد", "پیمانکار"]
    ),
    createObject("supply_stage", "مرحله تامين", 400, true, "singleSelect", [
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
    ]),
    createObject(
      "material_supplier",
      "تامين كننده متريال",
      150,
      true,
      "singleSelect",
      ["پیمانکار", "کارفرما"]
    ),
    createObject("pr", " PR شماره", 200, true),
    createObject("po", "PO شماره", 200, true),
    createObject("subject", "موضوع", 500, true),
    createObject("request_type", "جنس درخواست", 150, true, "singleSelect", [
      "ماده اولیه",
      "ماده نیمه آماده",
      "تامین قطعه",
      "ساخت",
      "ابزار و ماشین آلات",
      "خدمت",
    ]),
    createObject(
      "customer_management",
      "مديريت سفارش دهنده",
      220,
      true,
      "singleSelect",
      [
        "فن و کمپرسور",
        "جانبی",
        "توربین",
        "ماینور پارت",
        "محفظه احتراق",
        "طراحی سازه موتور",
        "استاندارد و كیفیت",
      ]
    ),
    createObject("contract_number", "شماره قرارداد", 150, true),
    createObject("supplier", "تامين كننده", 220, true),
    createObject("amount", "مبلغ", 200, true),
    createObject("adjustment_amount", "مبلغ تعديل", 200, true),
    createObject("currency", "نوع ارز", 200, true, "singleSelect", [
      "ریال",
      "یورو",
      "دلار",
      "یوان",
      "درهم",
    ]),
    createObject("expert", "كارشناس مسئول", 150, true, "singleSelect", [
      "غنی آبادی",
      "محمد زاده",
      "روشن دل",
    ]),
    createObject("prepayment_percentage", "درصد پيش‌پرداخت", 150, true),
    createObject(
      "prepayment_according_to_contract",
      "مبلغ پيش‌پرداخت طبق قرارداد",
      300,
      true
    ),
    createObject("prepaid_by_toga", "پيش پرداخت توسط توگا", 220, true),
    createObject(
      "prepaid_by_air_engine",
      "پيش پرداخت توسط موتور هوايي",
      220,
      true
    ),
    createObject(
      "prepayment_guarantee_check",
      "چك تضمين پيش پرداخت",
      220,
      true
    ),
    createObject("prepayment_guarantee", "ضمانتنامه پيش پرداخت", 220, true),
    createObject(
      "mortgage_document_guarantee",
      "ضمانت نامه سند رهني",
      220,
      true
    ),
    createObject(
      "financial_situation",
      "وضعيت در معاونت مالي",
      220,
      true,
      "singleSelect",
      [
        "دریافت تضامین",
        "درخواست پیش پرداخت",
        "تعیین نوع ارز",
        "توافق با تامین كننده",
        "دریافت مستندات ارزی",
        "درخواست ارز از مپنا بین الملل",
        "ارسال مدارك به مپنا بین الملل",
        "پیگیری درخواست ارز",
        "پرداخت شده",
      ]
    ),
    createObject(
      "prepayment_request_date",
      "تاريخ درخواست پيش پرداخت",
      220,
      true
    ),
    createObject("prepayment_amount", "مبلغ پيش پرداخت", 150, true),
    createObject("currency_type", "نوع ارز", 160, true),
    createObject("prepayment_date", "تاريخ پرداخت پيش پرداخت", 260, true),
  ];

  let columns;
  if (slug === "bom") {
    columns = bom;
  } else if (slug === "provide") {
    columns = provide;
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
