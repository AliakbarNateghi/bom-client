import Api from "../../../services/api";
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

  const scope = [
    createObject("original_report_id", "ID", 100, false, undefined),
    createObject("fig_no", "Fig. No.", 130, true),
    createObject("item_no", "Item No.", 130, true),
    createObject("module", "Module", 130, true),
    createObject(
      "TUGA_subtitute_part_number",
      "TUGA Substitute Part Number",
      260,

      true
    ),
    createObject(
      "old_system_part_no",
      "Old System Part No.",
      260,

      true
    ),
    createObject("description", "Description", 130, true),
    createObject(
      "unit_per_end_item",
      "Units Per End Item",
      200,

      true
    ),
    createObject("assembly", "Assembly", 130, true),
    createObject("standard_part", "Standard Part", 130, true),
    createObject(
      "new_manufacturing_responsible_department",
      "New Manufacturing Responsible Department",
      390,

      true
    ),
    createObject("level", "Level", 130, true),
    createObject("disassembled", "Disassembled", 130, true),
    createObject(
      "progress_certificate",
      "شناسنامه پیشرفت",
      260,

      true
    ),
    createObject(
      "ThreeD_scan_progress",
      "3D Scan پیشرفت",
      260,

      true
    ),
    createObject(
      "ThreeD_scan_certificate",
      "3D Scan مدرك",
      260,

      true
    ),
    createObject(
      "Fi_100_percent_l_modelling",
      "Fi100%l Modelling",
      260,

      true
    ),
    createObject(
      "Fi_100_percent_l_modelling_certificate",
      "Fi100%l Modelling مدرك",
      260,

      true
    ),
    createObject("level_2_drawing", "Level 2 Drawing", 130, true),
    createObject(
      "level_2_drawing_certificate",
      "Level 2 Drawing مدرك",
      260,

      true
    ),
    createObject("level_3_drawing", "Level 3 Drawing", 130, true),
    createObject(
      "level_3_drawing_certificate",
      "Level 3 Drawing مدرك",
      260,

      true
    ),
    createObject("assembly_drawing", "Assembly Drawing", 260, true),
    createObject(
      "construction_plan_with_assembly_view",
      "نقشه ساخت با نگرش مونتاژی",
      260,

      true
    ),
    createObject("certificate_code", "كد مدرك شناسنامه", 130, true),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه)",
      390,

      true
    ),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece_certi",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه) مدرك",
      390,

      true
    ),
    createObject("raw_material_spec", "اسپك ماده خام", 130, true),
    createObject(
      "raw_material_spec_certificate",
      "اسپك ماده خام مدرك",
      260,

      true
    ),
    createObject("part_spec", "اسپک قطعه", 130, true),
    createObject(
      "part_spec_certificate",
      "اسپک قطعه مدرك",
      260,

      true
    ),
    createObject("cover_spec", "اسپك پوشش", 130, true),
    createObject(
      "cover_spec_certificate",
      "اسپك پوشش مدرك",
      260,

      true
    ),
    createObject("connections_spec", "اسپك اتصالات", 130, true),
    createObject(
      "connections_spec_certificate",
      "اسپك اتصالات مدرك",
      260,

      true
    ),
    createObject(
      "other_specs_complementary_operations",
      "ساير اسپك‌ها (عمليات تكميلي)",
      260,

      true
    ),
    createObject(
      "other_specs_certificate",
      "ساير اسپك‌ها مدرك",
      260,

      true
    ),
    createObject(
      "interprocess_maps",
      "نقشه هاي ميان فرآيندي",
      260,

      true
    ),
    createObject(
      "interprocess_maps_certificate",
      "نقشه هاي ميان فرآيندي مدرك",
      260,

      true
    ),
    createObject(
      "OPC_or_MPP_rating",
      "OPC يا MPP (راتينگ)",
      260,

      true
    ),
    createObject("rating_certificate", "راتينگ مدرك", 130, true),
    createObject("TP", "TP", 130, true),
    createObject("TP_certificate", "TP مدرك", 130, true),
    createObject("MQCP", "MQCP", 130, true),
    createObject("MQCP_certificate", "MQCP مدرك", 130, true),
    createObject("ITP", "ITP", 130, true),
    createObject("ITP_certificate", "ITP مدرك", 130, true),
    createObject("_3885", "3885", 130, true),
    createObject("contract", "Contract", 130, true),
    createObject("adv_payment", "Adv. Payment", 130, true),
    createObject("material_supply", "Material Supply", 130, true),
    createObject(
      "mold_or_die_or_fixture",
      "Mold/Die/Fixture",
      260,

      true
    ),
    createObject("casting", "Casting", 130, true),
    createObject("forge", "Forge", 130, true),
    createObject("forming", "Forming", 130, true),
    createObject("machining", "Machining", 130, true),
    createObject("brazing_or_welding", "Brazing/Welding", 130, true),
    createObject("coating", "Coating", 130, true),
    createObject(
      "_2_manufacturing_total_progress",
      "میزان پیشرفت ساخت دو دستگاه",
      260,

      true
    ),
    createObject(
      "_28_manufacturing_total_progress",
      "میزان پیشرفت ساخت ۲۸ دستگاه",
      260,

      true
    ),
    createObject(
      "_2_side_total_progress",
      "میزان پیشرفت جانبی دو دستگاه",
      260,

      true
    ),
    createObject(
      "_28_side_total_progress",
      "میزان پیشرفت جانبی 28 دستگاه",
      260,

      true
    ),
    createObject("dummy_sample", "Dummy sample", 130, true),
    createObject("first_articles", "First Articles", 130, true),
    createObject(
      "first_articles_test",
      "First Articles Test",
      260,

      true
    ),
    createObject("mass_production", "Mass Production", 130, true),
    createObject(
      "review_and_ITP_approval_4_percent",
      "بررسی و تائید ITP (4%)",
      260,

      true
    ),
    createObject(
      "qualitative_evaluation_the_contractor_2_percent",
      "ارزيابي كيفي پيمانكار (2%)",
      260,

      true
    ),
    createObject(
      "kick_off_meeting_3_percent",
      "Kick Off Meeting (3%)",
      260,

      true
    ),
    createObject("CDR_5_percent", "CDR (5%)", 130, true),
    createObject(
      "compliant_quality_inspection_ITP_or_MQCP_65_percent",
      "بازرسي كيفي مطابق ITP/MQCP (65%)",
      390,
      true
    ),
    createObject(
      "submitting_an_inspection_report_accept_or_NCR_7_percent",
      "ارائه گزارش بازرسي Accept/NCR (7%)",
      390,

      true
    ),
    createObject(
      "check_the_answer_design_to_NCR_5_percent",
      "بررسي پاسخ طراحي به NCR (5%)",
      260,

      true
    ),
    createObject(
      "issuing_quality_tag_2_percent",
      "صدور تگ كيفي (2%)",
      260,

      true
    ),
    createObject(
      "compilation_and_approval_final_book_5_percent",
      " تدوين و تاييدFinal Book (5%)",
      260,

      true
    ),
    createObject(
      "issuance_of_test_certificate_or_Form1_or_CoC_2_percent",
      "صدور Test Certificate /Form1/CoC (2%)",
      450,

      true
    ),
    createObject(
      "_2_quality_total_progress",
      "میزان پیشرفت کیفیت دو دستگاه",
      260,

      true
    ),
    createObject(
      "compliant_quality_inspection_ITP_or_MQCP_75_percent",
      " بازرسي كيفي مطابق ITP/MQCP (75%)",
      260,

      true
    ),
    createObject(
      "submitting_an_inspection_report_accept_or_NCR_12_percent",
      "ارائه گزارش بازرسي Accept/NCR (12%)",
      260,

      true
    ),
    createObject(
      "check_the_answer_design_to_NCR_3_percent",
      "بررسي پاسخ طراحي به NCR (3%)",
      260,

      true
    ),
    createObject(
      "issuing_quality_tag_2_percent",
      "صدور تگ كيفي (2%)",
      260,

      true
    ),
    createObject(
      "compilation_and_approval_final_book_6_percent",
      " تدوين و تاييد Final Book (6%)",
      260,

      true
    ),
    createObject(
      "issuance_of_test_certificate_or_Form1_or_CoC_2_percent",
      "صدور Test Certificate /Form1/CoC (2%)",
      390,

      true
    ),
    createObject(
      "_28_quality_total_progress",
      "میزان پیشرفت کیفیت 28 دستگاه",
      260,

      true
    ),
  ];

  const baseArr = [
    createObject("id", "id", 100, false),
    createObject("original_report_id", "ID", 100, false, true),
    createObject("fig_no", "Fig. No.", 130, true),
    createObject("item_no", "Item No.", 130, true),
    createObject("module", "Module", 130, true),
    createObject(
      "TUGA_subtitute_part_number",
      "TUGA Substitute Part Number",
      260,
      true
    ),
    createObject("old_system_part_no", "Old System Part No.", 260, true),
    createObject("description", "Description", 130, true),
    createObject("unit_per_end_item", "Units Per End Item", 200, true),
    createObject("assembly", "Assembly", 130, true),
    createObject("standard_part", "Standard Part", 130, true),
    createObject(
      "new_manufacturing_responsible_department",
      "New Manufacturing Responsible Department",
      390,
      true
    ),
    createObject("level", "Level", 130, true),
  ];

  let core = [
    createObject("disassembled", "Disassembled", 130, true),
    createObject("progress_certificate", "شناسنامه پیشرفت", 260, true),
    createObject("ThreeD_scan_progress", "3D Scan پیشرفت", 260, true),
    createObject("ThreeD_scan_certificate", "3D Scan مدرك", 260, true),
    createObject("Fi_100_percent_l_modelling", "Fi100%l Modelling", 260, true),
    createObject(
      "Fi_100_percent_l_modelling_certificate",
      "Fi100%l Modelling مدرك",
      260,
      true
    ),
    createObject("level_2_drawing", "Level 2 Drawing", 130, true),
    createObject(
      "level_2_drawing_certificate",
      "Level 2 Drawing مدرك",
      260,
      true
    ),
    createObject("level_3_drawing", "Level 3 Drawing", 130, true),
    createObject(
      "level_3_drawing_certificate",
      "Level 3 Drawing مدرك",
      260,
      true
    ),
    createObject("assembly_drawing", "Assembly Drawing", 260, true),
    createObject(
      "construction_plan_with_assembly_view",
      "نقشه ساخت با نگرش مونتاژی",
      260,
      true
    ),
    createObject("certificate_code", "كد مدرك شناسنامه", 130, true),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه)",
      390,
      true
    ),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece_certi",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه) مدرك",
      390,
      true
    ),
    createObject("raw_material_spec", "اسپك ماده خام", 130, true),
    createObject(
      "raw_material_spec_certificate",
      "اسپك ماده خام مدرك",
      260,
      true
    ),
    createObject("part_spec", "اسپک قطعه", 130, true),
    createObject("part_spec_certificate", "اسپک قطعه مدرك", 260, true),
    createObject("cover_spec", "اسپك پوشش", 130, true),
    createObject("cover_spec_certificate", "اسپك پوشش مدرك", 260, true),
    createObject("connections_spec", "اسپك اتصالات", 130, true),
    createObject(
      "connections_spec_certificate",
      "اسپك اتصالات مدرك",
      260,
      true
    ),
    createObject(
      "other_specs_complementary_operations",
      "ساير اسپك‌ها (عمليات تكميلي)",
      260,
      true
    ),
    createObject("other_specs_certificate", "ساير اسپك‌ها مدرك", 260, true),
    createObject("interprocess_maps", "نقشه هاي ميان فرآيندي", 260, true),
    createObject(
      "interprocess_maps_certificate",
      "نقشه هاي ميان فرآيندي مدرك",
      260,
      true
    ),
    createObject("OPC_or_MPP_rating", "OPC يا MPP (راتينگ)", 260, true),
    createObject("rating_certificate", "راتينگ مدرك", 130, true),
    createObject("TP", "TP", 130, true),
    createObject("TP_certificate", "TP مدرك", 130, true),
    createObject("MQCP", "MQCP", 130, true),
    createObject("MQCP_certificate", "MQCP مدرك", 130, true),
    createObject("ITP", "ITP", 130, true),
    createObject("ITP_certificate", "ITP مدرك", 130, true),
    createObject("contract", "عقد قرارداد", 130, true),
    createObject(
      "_2_manufacturing_total_progress",
      "ساخت دو دستگاه",
      180,
      true
    ),
    createObject(
      "_28_manufacturing_total_progress",
      "ساخت ۲۸ دستگاه",
      180,
      true
    ),
    createObject("_2_quality_total_progress", "کیفیت دو دستگاه", 180, true),
    createObject("_28_quality_total_progress", "کیفیت 28 دستگاه", 180, true),
  ];
  core = baseArr.concat(core);

  let design = [
    createObject("disassembled", "Disassembled", 130, true),
    createObject("progress_certificate", "شناسنامه پیشرفت", 260, true),
    createObject("ThreeD_scan_progress", "3D Scan پیشرفت", 260, true),
    createObject("ThreeD_scan_certificate", "3D Scan مدرك", 260, true),
    createObject("Fi_100_percent_l_modelling", "Fi100%l Modelling", 260, true),
    createObject(
      "Fi_100_percent_l_modelling_certificate",
      "Fi100%l Modelling مدرك",
      260,
      true
    ),
    createObject("level_2_drawing", "Level 2 Drawing", 130, true),
    createObject(
      "level_2_drawing_certificate",
      "Level 2 Drawing مدرك",
      260,
      true
    ),
    createObject("level_3_drawing", "Level 3 Drawing", 130, true),
    createObject(
      "level_3_drawing_certificate",
      "Level 3 Drawing مدرك",
      260,
      true
    ),
    createObject("assembly_drawing", "Assembly Drawing", 260, true),
    createObject(
      "construction_plan_with_assembly_view",
      "نقشه ساخت با نگرش مونتاژی",
      260,
      true
    ),
    createObject("certificate_code", "كد مدرك شناسنامه", 130, true),
  ];
  design = baseArr.concat(design);

  let lateral = [
    createObject("disassembled", "Disassembled", 130, true),
    createObject("progress_certificate", "شناسنامه پیشرفت", 260, true),
    createObject("ThreeD_scan_progress", "3D Scan پیشرفت", 260, true),
    createObject("ThreeD_scan_certificate", "3D Scan مدرك", 260, true),
    createObject("Fi_100_percent_l_modelling", "Fi100%l Modelling", 260, true),
    createObject(
      "Fi_100_percent_l_modelling_certificate",
      "Fi100%l Modelling مدرك",
      260,
      true
    ),
    createObject("level_2_drawing", "Level 2 Drawing", 130, true),
    createObject(
      "level_2_drawing_certificate",
      "Level 2 Drawing مدرك",
      260,
      true
    ),
    createObject("level_3_drawing", "Level 3 Drawing", 130, true),
    createObject(
      "level_3_drawing_certificate",
      "Level 3 Drawing مدرك",
      260,
      true
    ),
    createObject("assembly_drawing", "Assembly Drawing", 260, true),
    createObject(
      "construction_plan_with_assembly_view",
      "نقشه ساخت با نگرش مونتاژی",
      260,
      true
    ),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه)",
      390,
      true
    ),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece_certi",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه) مدرك",
      390,
      true
    ),
    createObject("raw_material_spec", "اسپك ماده خام", 130, true),
    createObject(
      "raw_material_spec_certificate",
      "اسپك ماده خام مدرك",
      260,
      true
    ),
    createObject("part_spec", "اسپک قطعه", 130, true),
    createObject("part_spec_certificate", "اسپک قطعه مدرك", 260, true),
    createObject("cover_spec", "اسپك پوشش", 130, true),
    createObject("cover_spec_certificate", "اسپك پوشش مدرك", 260, true),
    createObject("connections_spec", "اسپك اتصالات", 130, true),
    createObject(
      "connections_spec_certificate",
      "اسپك اتصالات مدرك",
      260,
      true
    ),
    createObject(
      "other_specs_complementary_operations",
      "ساير اسپك‌ها (عمليات تكميلي)",
      260,
      true
    ),
    createObject("other_specs_certificate", "ساير اسپك‌ها مدرك", 260, true),
    createObject("interprocess_maps", "نقشه هاي ميان فرآيندي", 260, true),
    createObject(
      "interprocess_maps_certificate",
      "نقشه هاي ميان فرآيندي مدرك",
      260,
      true
    ),
    createObject("OPC_or_MPP_rating", "OPC يا MPP (راتينگ)", 260, true),
    createObject("rating_certificate", "راتينگ مدرك", 130, true),
    createObject("TP", "TP", 130, true),
    createObject("TP_certificate", "TP مدرك", 130, true),
    createObject("MQCP", "MQCP", 130, true),
    createObject("MQCP_certificate", "MQCP مدرك", 130, true),
    createObject("ITP", "ITP", 130, true),
    createObject("ITP_certificate", "ITP مدرك", 130, true),
  ];
  lateral = baseArr.concat(lateral);

  let manufacturing = [
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه)",
      390,
      true
    ),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece_certi",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه) مدرك",
      390,
      true
    ),
    createObject("raw_material_spec", "اسپك ماده خام", 130, true),
    createObject(
      "raw_material_spec_certificate",
      "اسپك ماده خام مدرك",
      260,
      true
    ),
    createObject("part_spec", "اسپک قطعه", 130, true),
    createObject("part_spec_certificate", "اسپک قطعه مدرك", 260, true),
    createObject("cover_spec", "اسپك پوشش", 130, true),
    createObject("cover_spec_certificate", "اسپك پوشش مدرك", 260, true),
    createObject("connections_spec", "اسپك اتصالات", 130, true),
    createObject(
      "connections_spec_certificate",
      "اسپك اتصالات مدرك",
      260,
      true
    ),
    createObject(
      "other_specs_complementary_operations",
      "ساير اسپك‌ها (عمليات تكميلي)",
      260,
      true
    ),
    createObject("other_specs_certificate", "ساير اسپك‌ها مدرك", 260, true),
    createObject("interprocess_maps", "نقشه هاي ميان فرآيندي", 260, true),
    createObject(
      "interprocess_maps_certificate",
      "نقشه هاي ميان فرآيندي مدرك",
      260,
      true
    ),
    createObject("OPC_or_MPP_rating", "OPC يا MPP (راتينگ)", 260, true),
    createObject("rating_certificate", "راتينگ مدرك", 130, true),
    createObject("TP", "TP", 130, true),
    createObject("TP_certificate", "TP مدرك", 130, true),
    createObject("MQCP", "MQCP", 130, true),
    createObject("MQCP_certificate", "MQCP مدرك", 130, true),
    createObject("ITP", "ITP", 130, true),
    createObject("ITP_certificate", "ITP مدرك", 130, true),
  ];
  manufacturing = baseArr.concat(manufacturing);

  let _2_devices_side = [
    createObject("_3885", "3885", 130, true),
    createObject("contract", "Contract", 130, true),
    createObject("adv_payment", "Adv. Payment", 130, true),
    createObject("material_supply", "Material Supply", 130, true),
    createObject("mold_or_die_or_fixture", "Mold/Die/Fixture", 260, true),
    createObject("casting", "Casting", 130, true),
    createObject("forge", "Forge", 130, true),
    createObject("forming", "Forming", 130, true),
    createObject("machining", "Machining", 130, true),
    createObject("brazing_or_welding", "Brazing/Welding", 130, true),
    createObject("coating", "Coating", 130, true),
    createObject("dummy_sample", "Dummy sample", 130, true),
    createObject("first_articles", "First Articles", 130, true),
    createObject("first_articles_test", "First Articles Test", 260, true),
    createObject(
      "_2_side_total_progress",
      "میزان پیشرفت جانبی دو دستگاه",
      260,
      true
    ),
  ];
  _2_devices_side = baseArr.concat(_2_devices_side);

  let _28_devices_side = [
    createObject("_3885", "3885", 130, true),
    createObject("contract", "Contract", 130, true),
    createObject("adv_payment", "Adv. Payment", 130, true),
    createObject("material_supply", "Material Supply", 130, true),
    createObject("mold_or_die_or_fixture", "Mold/Die/Fixture", 260, true),
    createObject("casting", "Casting", 130, true),
    createObject("forge", "Forge", 130, true),
    createObject("forming", "Forming", 130, true),
    createObject("machining", "Machining", 130, true),
    createObject("brazing_or_welding", "Brazing/Welding", 130, true),
    createObject("coating", "Coating", 130, true),
    createObject("mass_production", "Mass Production", 130, true),
    createObject(
      "_28_side_total_progress",
      "میزان پیشرفت جانبی 28 دستگاه",
      260,
      true
    ),
  ];
  _28_devices_side = baseArr.concat(_28_devices_side);

  let _2_devices_manufacturing = [
    createObject("_3885", "3885", 130, true),
    createObject("contract", "Contract", 130, true),
    createObject("adv_payment", "Adv. Payment", 130, true),
    createObject("material_supply", "Material Supply", 130, true),
    createObject("mold_or_die_or_fixture", "Mold/Die/Fixture", 260, true),
    createObject("casting", "Casting", 130, true),
    createObject("forge", "Forge", 130, true),
    createObject("forming", "Forming", 130, true),
    createObject("machining", "Machining", 130, true),
    createObject("brazing_or_welding", "Brazing/Welding", 130, true),
    createObject("coating", "Coating", 130, true),
    createObject("dummy_sample", "Dummy sample", 130, true),
    createObject("first_articles", "First Articles", 130, true),
    createObject("first_articles_test", "First Articles Test", 260, true),
    createObject(
      "_2_manufacturing_total_progress",
      "میزان پیشرفت ساخت دو دستگاه",
      260,
      true
    ),
  ];
  _2_devices_manufacturing = baseArr.concat(_2_devices_manufacturing);

  let _28_devices_manufacturing = [
    createObject("_3885", "3885", 130, true),
    createObject("contract", "Contract", 130, true),
    createObject("adv_payment", "Adv. Payment", 130, true),
    createObject("material_supply", "Material Supply", 130, true),
    createObject("mold_or_die_or_fixture", "Mold/Die/Fixture", 260, true),
    createObject("casting", "Casting", 130, true),
    createObject("forge", "Forge", 130, true),
    createObject("forming", "Forming", 130, true),
    createObject("machining", "Machining", 130, true),
    createObject("brazing_or_welding", "Brazing/Welding", 130, true),
    createObject("coating", "Coating", 130, true),
    createObject("mass_production", "Mass Production", 130, true),
    createObject(
      "_28_manufacturing_total_progress",
      "میزان پیشرفت ساخت ۲۸ دستگاه",
      260,
      true
    ),
  ];
  _28_devices_manufacturing = baseArr.concat(_28_devices_manufacturing);

  let _2_devices_quality = [
    createObject(
      "review_and_ITP_approval_4_percent",
      "بررسی و تائید ITP (4%)",
      260,
      true
    ),
    createObject(
      "qualitative_evaluation_the_contractor_2_percent",
      "ارزيابي كيفي پيمانكار (2%)",
      260,
      true
    ),
    createObject(
      "kick_off_meeting_3_percent",
      "Kick Off Meeting (3%)",
      260,
      true
    ),
    createObject("CDR_5_percent", "CDR (5%)", 130, true),
    createObject(
      "compliant_quality_inspection_ITP_or_MQCP_65_percent",
      "بازرسي كيفي مطابق ITP/MQCP (65%)",
      390,
      true
    ),
    createObject(
      "submitting_an_inspection_report_accept_or_NCR_7_percent",
      "ارائه گزارش بازرسي Accept/NCR (7%)",
      390,
      true
    ),
    createObject(
      "check_the_answer_design_to_NCR_5_percent",
      "بررسي پاسخ طراحي به NCR (5%)",
      260,
      true
    ),
    createObject(
      "issuing_quality_tag_2_percent",
      "صدور تگ كيفي (2%)",
      260,
      true
    ),
    createObject(
      "compilation_and_approval_final_book_5_percent",
      " تدوين و تاييدFinal Book (5%)",
      260,
      true
    ),
    createObject(
      "issuance_of_test_certificate_or_Form1_or_CoC_2_percent",
      "صدور Test Certificate /Form1/CoC (2%)",
      450,
      true
    ),
    createObject(
      "_2_quality_total_progress",
      "میزان پیشرفت کیفیت دو دستگاه",
      260,
      true
    ),
  ];
  _2_devices_quality = baseArr.concat(_2_devices_quality);

  let _28_devices_quality = [
    createObject(
      "compliant_quality_inspection_ITP_or_MQCP_75_percent",
      " بازرسي كيفي مطابق ITP/MQCP (75%)",
      260,
      true
    ),
    createObject(
      "submitting_an_inspection_report_accept_or_NCR_12_percent",
      "ارائه گزارش بازرسي Accept/NCR (12%)",
      260,
      true
    ),
    createObject(
      "check_the_answer_design_to_NCR_3_percent",
      "بررسي پاسخ طراحي به NCR (3%)",
      260,
      true
    ),
    createObject(
      "issuing_quality_tag_2_percent",
      "صدور تگ كيفي (2%)",
      260,
      true
    ),
    createObject(
      "compilation_and_approval_final_book_6_percent",
      " تدوين و تاييد Final Book (6%)",
      260,
      true
    ),
    createObject(
      "issuance_of_test_certificate_or_Form1_or_CoC_2_percent",
      "صدور Test Certificate /Form1/CoC (2%)",
      390,
      true
    ),
    createObject(
      "_28_quality_total_progress",
      "میزان پیشرفت کیفیت 28 دستگاه",
      260,
      true
    ),
  ];
  _28_devices_quality = baseArr.concat(_28_devices_quality);

  let columns;
  if (slug === "bom") {
    columns = bom;
  } else if (slug === "provide") {
    columns = provide;
  } else if (slug === "scope") {
    columns = scope;
  } else if (slug === "core") {
    columns = core;
  } else if (slug === "design") {
    columns = design;
  } else if (slug === "lateral") {
    columns = lateral;
  } else if (slug === "manufacturing") {
    columns = manufacturing;
  } else if (slug === "2-devices-side") {
    columns = _2_devices_side;
  } else if (slug === "28-devices-side") {
    columns = _28_devices_side;
  } else if (slug === "2-devices-manufacturing") {
    columns = _2_devices_manufacturing;
  } else if (slug === "28-devices-manufacturing") {
    columns = _28_devices_manufacturing;
  } else if (slug === "2-devices-quality") {
    columns = _2_devices_quality;
  } else if (slug === "28-devices-quality") {
    columns = _28_devices_quality;
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
